import { takeLatest, put, all, call } from 'redux-saga/effects';
import { notify } from '../../utils/notify';
import BagActionTypes from './bag.types';

import {
  generateBagSuccess,
  generateBagFailure,
} from './bag.actions';

import {
  functions
} from '../../firebase/firebase.utils';



export function* generateBagId() {
  try {
    const func = yield functions.httpsCallable('createUUID')
    const { data } = yield func().then((res) => res);
    yield put(generateBagSuccess());
    yield notify(data.message,"success")
  } catch (error) {
    yield put(generateBagFailure(error));
    yield notify(error.message,'error')
  }
}


export function* onGenerateBag() {
  yield takeLatest(BagActionTypes.GENERATE_BAG_START, generateBagId);
}

export function* bagSagas() {
  yield all([
    call(onGenerateBag),
  ]);
}