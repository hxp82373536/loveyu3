import {take, call, put} from 'redux-saga/effects';
import {takeEvery, takeLatest} from 'redux-saga';
import {fetchApi} from '../../utils/fetch'

function* load(action) {
  try {
    const data = yield call(fetchApi, action)
    console.info("loadl111111111111")
    yield put({type: 'LOAD_SIGNALLING_SUCCESS', result: data})
  } catch (error) {
    yield put({type: 'LOAD_SIGNALLING_ERROR', error})
  }
}

function* detail(action) {
  try {
    const data = yield call(fetchApi, action)
    console.info("detail111111111111")
    yield put({type: 'LOAD_DETAIL_SUCCESS', result: data})
  } catch (error) {
    yield put({type: 'LOAD_DETAIL_ERROR', error})
  }
}

export function* helloSaga() {
  console.log('Hello Saga!')
}


export function* watchIncrementAsync() {
  yield takeLatest('LOAD_SIGNALLING', load)
  yield takeEvery('LOAD_DETAIL', detail)
}

export default function* rootSaga() {
  console.info("11111");
  yield [
    helloSaga(),
    watchIncrementAsync()
  ]
}
