//定义初始状态
const initialState = {
  //状态参数
  table_status:{
    loading: true,
    error: false,
  },
  detail_status:{
    modalVisible:false,
    loading: true,
    error: false,
  },
  //查询结果
  result:[],
  detail_result:[]
};

//定义信令检索的三个查询状态   actiontypes
const LOAD_SIGNALLING = 'LOAD_SIGNALLING';
const LOAD_SIGNALLING_SUCCESS = 'LOAD_SIGNALLING_SUCCESS';
const LOAD_SIGNALLING_ERROR = 'LOAD_SIGNALLING_ERROR';
const LOAD_DETAIL = 'LOAD_DETAIL';
const LOAD_DETAIL_SUCCESS = 'LOAD_DETAIL_SUCCESS';
const LOAD_DETAIL_ERROR = 'LOAD_DETAIL_ERROR';



//定义信令检索的action
export function loadSignalling(param) {
  console.info("actions");
  return {
    type: LOAD_SIGNALLING, //LOAD_SIGNALLING_SUCCESS, LOAD_SIGNALLING_ERROR],
    url: '/mock/mock-table.json',
    param:param
  };
}

export function loadDetail(param) {
  console.info("actions-detail");
  return {
    type: LOAD_DETAIL, //LOAD_SIGNALLING_SUCCESS, LOAD_SIGNALLING_ERROR],
    url: '/mock/mock-detail.json',
    param:param
  };
}


/* 定义reducer, 每个组件只有一个reducer */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SIGNALLING: {
      return {
        ...state,
        table_status:{
          loading: true,
          error: false,
        },
      };
    }

    case LOAD_SIGNALLING_SUCCESS: {
      let result =action.result;
      console.info("success");
      return {
        ...state,
        table_status:{
          loading: false,
          error: false,
        },
        result: result.data,
      };
    }

    case LOAD_SIGNALLING_ERROR: {
      return {
        ...state,
        table_status:{
          loading: false,
          error: true,
        },
      };
    }

    case LOAD_DETAIL: {
      return {
        ...state,
        table_status:{
          loading: true,
          error: false,
        },
      };
    }

    case LOAD_DETAIL_SUCCESS: {
      let result =action.result;
      console.info("success");
      return {
        ...state,
        detail_status:{
          loading: false,
          error: false,
          modalVisible:true
        },
        detail_result: result.data,
      };
    }

    case LOAD_DETAIL_ERROR: {
      return {
        ...state,
        detail_status:{
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
