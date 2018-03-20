//sagas
function* rootSaga() {
  yield[
    fork(load),
    //takeLatest('LOAD_DASHBOARD', loadDashboardSequenced)
  ];
}


function* load() {
  try {
    const signalling = yield call(getSignalling);
    yield put({type: 'LOAD_SIGNALLING_SUCCESS', result: signalling});
  } catch(error) {
    yield put({type: 'LOAD_SIGNALLING_ERROR', error});
  }
}

class  Saga {
 static getUser() {
   return new Promise((resolve) => {
     setTimeout(() => {
       resolve({
            // email : "somemockemail@email.com",
            repository: '/src/mock/SIGNALLING.json'
       });
     }, 3000);
   });
 }
}
