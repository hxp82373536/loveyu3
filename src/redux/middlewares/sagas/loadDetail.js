import {fetchApi} from './fetch'
import {take, call, put} from 'redux-saga/effects';

export function* loadDetail(action) {
  try {
    const data = yield call(fetchApi, action)
    console.info("detail111111111111")
    yield put({type: 'LOAD_DETAIL_SUCCESS', result: data})
  } catch (error) {
    yield put({type: 'LOAD_DETAIL_ERROR', error})
  }
}
