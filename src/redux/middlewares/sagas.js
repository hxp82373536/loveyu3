import {call, put} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import {fetchApi} from '../../utils/fetch'

// function fetchApi() {
//   console.info("fetch")
//   return fetch('/mock/mock.json')
//     .then(response => response.json())
//     .then(data => {
//       console.info(data);
//       return data;
//     })
// }

function* load() {
  try {
    const data = yield call(fetchApi)
    let list= [];
    list.push(data);
    yield put({ type: 'LOAD_SIGNALLING_SUCCESS', result: list})
  }
  catch(error) {
    yield put({ type: 'LOAD_SIGNALLING_ERROR', error })}
  }

export default function* rootSaga() {
  console.info("11111");
  yield* takeLatest('LOAD_SIGNALLING', load)
}
