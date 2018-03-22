import {call, put} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import {fetchApi} from '../../utils/fetch'

function* load() {
  try {
    const data = yield call(fetchApi)
    yield put({ type: 'LOAD_SIGNALLING_SUCCESS', result: data})
  }
  catch(error) {
    yield put({ type: 'LOAD_SIGNALLING_ERROR', error })}
  }

export default function* rootSaga() {
  console.info("11111");
  yield* takeLatest('LOAD_SIGNALLING', load)
}
