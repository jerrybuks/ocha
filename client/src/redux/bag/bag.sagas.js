import { takeLatest, put, all, call, take } from "redux-saga/effects";
import { notify } from "../../utils/notify";
import BagActionTypes from "./bag.types";
import { store } from "../store";

import {
  generateBagSuccess,
  generateBagFailure,
  getNumOfBagsSuccess,
  getNumOfBagsFailure,
  getNumOfBagsStart,
  linkBagToUserSuccess,
  linkBagToUserFailure,
} from "./bag.actions";

import {
  functions,
  firestore,
  createBagChannel,
} from "../../firebase/firebase.utils";

export function* generateBagId() {
  try {
    const func = yield functions.httpsCallable("createUUID");
    const { data } = yield func().then((res) => res);
    yield put(generateBagSuccess());
    yield notify(data.message, "success");
    yield put(getNumOfBagsStart());
    yield getNumOfBags();
  } catch (error) {
    yield put(generateBagFailure(error));
    yield notify(error.message, "error");
  }
}

export function* getNumOfBags() {
  try {
    const docRef = yield firestore.collection("Bags").doc("--stats--");
    const doc = yield docRef.get();
    const numDoc = doc.data().numOfBags || 0;
    yield put(getNumOfBagsSuccess(numDoc));
    if (!doc.exists) yield notify("No such document!", "error");
  } catch (error) {
    yield put(getNumOfBagsFailure(error));
    yield notify(error.message, "error");
  }
}

export function* linkUserToBag({ payload }) {
  const { bagId, isBilling} = payload;
  try {
    const docRef = yield firestore
      .collection("Bags")
      .where("BagId", "==", bagId);

    const channel = yield call(createBagChannel, docRef);
    let count = 1;
    while (true) {
      const bag = yield take(channel);
      if (!bag.exists) {
        yield notify("No such document!", "error");
      }
      if (bag.exists && count === 1) {
        if (isBilling) {
          yield billUser(bag);
        } else {
          yield assignBagToUser(bag);
        }
        count++;
      }
    }
  } catch (error) {
    yield put(linkBagToUserFailure(error));
    yield notify(error.message, "error");
  }
}
export function* billUser(bag) {
  const bagDetails = bag.data();
  console.log(bagDetails,555)
  if (bagDetails.userId) {
    bag.ref.update({
      Billed: true
    });
    yield notify(
      "The owner of this bag has successfully been billed",
      "success"
    );
    yield put(linkBagToUserSuccess());
  } else {
    yield notify(
      "failed to bill this user, please assign bag to user first",
      "error"
    );
  }
}
export function* assignBagToUser(bag) {
  const assStatus = bag.data().assStatus;
  if (assStatus === "assigned") {
    yield notify("Bag has already been assigned to you", "warning");
  } else {
    bag.ref.update({
      assStatus: "assigned",
      userId: store.getState().user.currentUser.id,
    });
    yield notify("Bag has successfully been assigned", "success");
    yield put(linkBagToUserSuccess());
  }
}

export function* onGenerateBag() {
  yield takeLatest(BagActionTypes.GENERATE_BAG_START, generateBagId);
}

export function* onGetNumOfBags() {
  yield takeLatest(BagActionTypes.GET_NUMOFBAGS_START, getNumOfBags);
}

export function* onLinkUserToBag() {
  yield takeLatest(BagActionTypes.LINK_BAG_START, linkUserToBag);
}

// export function* onGetBags() {
//   yield takeLatest(BagActionTypes.GET_BAGS_START, getBags);
// }

export function* bagSagas() {
  yield all([
    call(onGenerateBag),
    call(onGetNumOfBags),
    call(onLinkUserToBag),
    // call(onGetBags),
  ]);
}
