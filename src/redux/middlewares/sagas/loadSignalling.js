import {fetchApi} from './fetch'
import {take, call, put} from 'redux-saga/effects';

export function* loadSignalling(action) {
  try {
    const data = yield call(fetchApi, action)
    console.info("loadl111111111111")
    yield put({type: 'LOAD_SIGNALLING_SUCCESS', result: data})
  } catch (error) {
    yield put({type: 'LOAD_SIGNALLING_ERROR', error})
  }
}
