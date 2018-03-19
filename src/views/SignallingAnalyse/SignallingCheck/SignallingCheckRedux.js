//定义初始状态
const initialState = {
  loading: true,
  error: false,
  signallingList: [],
};

//定义信令检索的三个查询状态   actiontypes
const LOAD_SIGNALLING = 'LOAD_SIGNALLING';
const LOAD_SIGNALLING_SUCCESS = 'LOAD_SIGNALLING_SUCCESS';
const LOAD_SIGNALLING_ERROR = 'LOAD_SIGNALLING_ERROR';

// let nextSeqId = 0;


//定义信令检索的action
export function loadSIGNALLING() {
  return {
    types: [LOAD_SIGNALLING, LOAD_SIGNALLING_SUCCESS, LOAD_SIGNALLING_ERROR],
    url: '/src/mock/SIGNALLING.json',
  };
}

// export const loadSignalling = () => ({
//   type: [LOAD_SIGNALLING,LOAD_SIGNALLING_SUCCESS,LOAD_SIGNALLING_ERROR]
//   url: '/src/mock/SIGNALLING.json',
// });

export const loadSignallingSuccess = (result) => ({
  type: LOAD_SIGNALLING_SUCCESS,
  result
});

export const loadSignallingError = (error) => ({
  type: LOAD_SIGNALLING_ERROR,
  error
});

// export const fetchSignalling = () => {
//   return (dispatch) => {
//     const apiUrl = '/src/mock/SIGNALLING.json';
//     const seqId = ++ nextSeqId;
//     const dispatchIfValid = (action) => {
//       if (seqId === nextSeqId) {
//         return dispatch(action);
//       }
//     }
//     dispatchIfValid(loadSignalling())
//     fetch(apiUrl).then((response) => {
//       response.json().then((responseJson) => {
//         dispatchIfValid(loadSignallingSuccess(responseJson));
//       }).catch((error) => {
//         dispatchIfValid(loadSignallingError(error));
//       });
//     }).catch((error) => {
//       dispatchIfValid(loadSignallingError(error));
//     })
//   };
// }


/* 定义reducer, 每个组件只有一个reducer */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SIGNALLING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case LOAD_SIGNALLING_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        signallingList: action.result,
      };
    }

    case LOAD_SIGNALLING_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    default:
      return state;
  }
};

/* 导出的字段名称固定, 方便后续的store去处理 */
export default {initialState, reducer};
