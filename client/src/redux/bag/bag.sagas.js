import { takeLatest, put, all, call } from 'redux-saga/effects';
import { notify } from '../../utils/notify';
import BagActionTypes from './bag.types';

import {
  generateBagSuccess,
  generateBagFailure,
  getNumOfBagsSuccess,
  getNumOfBagsFailure,
  getNumOfBagsStart
} from './bag.actions';

import {
  functions, firestore
} from '../../firebase/firebase.utils';



export function* generateBagId() {
  try {
    const func = yield functions.httpsCallable('createUUID')
    const { data } = yield func().then((res) => res);
    yield put(generateBagSuccess());
    yield notify(data.message,"success")
    yield put(getNumOfBagsStart())
    yield getNumOfBags();
  } catch (error) {
    yield put(generateBagFailure(error));
    yield notify(error.message,'error')
  }
}

export function* getNumOfBags() {
  try {
    const docRef = yield firestore.collection('Bags').doc('--stats--')
    const doc = yield docRef.get()
    const numDoc = doc.data().numOfBags || 0;
    yield put(getNumOfBagsSuccess(numDoc));
    if (!doc.exists) yield notify('No such document!','error');
    
  } catch (error) {
    yield put(getNumOfBagsFailure(error));
    yield notify(error.message,'error')
  }
}


export function* onGenerateBag() {
  yield takeLatest(BagActionTypes.GENERATE_BAG_START, generateBagId);
}

export function* onGetNumOfBags() {
  yield takeLatest(BagActionTypes.GET_NUMOFBAGS_START, getNumOfBags);
}

// export function* onGetBags() {
//   yield takeLatest(BagActionTypes.GET_BAGS_START, getBags);
// }

export function* bagSagas() {
  yield all([
    call(onGenerateBag),
    call(onGetNumOfBags),
    // call(onGetBags),
  ]);
}