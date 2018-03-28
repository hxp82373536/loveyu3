import {take, call, put} from 'redux-saga/effects';
import {takeEvery, takeLatest} from 'redux-saga';

import {loadSignalling} from './sagas/loadSignalling'
import {loadDetail} from './sagas/loadDetail'

export function* helloSaga() {
  console.log('Hello Saga!')
}

export function* watchIncrementAsync() {
  yield takeLatest('LOAD_SIGNALLING', loadSignalling)
  yield takeEvery('LOAD_DETAIL', loadDetail)
}

export default function* RootSaga() {
  yield [
    helloSaga(),
    watchIncrementAsync()
  ]
}
