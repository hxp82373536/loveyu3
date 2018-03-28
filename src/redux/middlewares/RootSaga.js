import {takeEvery, takeLatest} from 'redux-saga/effects';

import {loadSignalling} from './sagas/loadSignalling'
import {loadDetail} from './sagas/loadDetail'


export function* watchIncrementAsync() {
  yield takeLatest('LOAD_SIGNALLING', loadSignalling)
  yield takeEvery('LOAD_DETAIL', loadDetail)
}

export default function* RootSaga() {
   yield watchIncrementAsync()
}
