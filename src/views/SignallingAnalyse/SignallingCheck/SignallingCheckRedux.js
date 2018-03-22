//定义初始状态
const initialState = {
  //状态参数
  status:{
    loading: true,
    error: false,
  },
  //查询结果
  result:[],
};

//定义信令检索的三个查询状态   actiontypes
const LOAD_SIGNALLING = 'LOAD_SIGNALLING';
const LOAD_SIGNALLING_SUCCESS = 'LOAD_SIGNALLING_SUCCESS';
const LOAD_SIGNALLING_ERROR = 'LOAD_SIGNALLING_ERROR';



//定义信令检索的action
export function loadSignalling(param) {
  console.info("actions");
  return {
    type: LOAD_SIGNALLING, //LOAD_SIGNALLING_SUCCESS, LOAD_SIGNALLING_ERROR],
    url: 'http://localhost:3001/src/mock/SIGNALLING.json',
    param:param
  };
}


/* 定义reducer, 每个组件只有一个reducer */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SIGNALLING: {
      return {
        ...state,
        status:{
          loading: true,
          error: false,
        },
      };
    }

    case LOAD_SIGNALLING_SUCCESS: {
      let result =action.result;
      let list= [];
      list.push(result);
      console.info("success");
      return {
        ...state,
        status:{
          loading: false,
          error: false,
        },
        result: list,
      };
    }

    case LOAD_SIGNALLING_ERROR: {
      return {
        ...state,
        status:{
          loading: false,
          error: true,
        },
      };
    }

    default:
      return state;
  }
};

/* 导出的字段名称固定, 方便后续的store去处理 */
export default {initialState, reducer};
