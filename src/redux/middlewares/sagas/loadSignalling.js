import {fetchApi} from './fetch'
import {call, put} from 'redux-saga/effects';

export function* loadSignalling(action) {
  try {
    const data = yield call(fetchApi, action)
    yield put({type: 'LOAD_SIGNALLING_SUCCESS', result: data})
  } catch (error) {
    yield put({type: 'LOAD_SIGNALLING_ERROR', error})
  }
}
