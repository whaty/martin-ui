import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';

import {TableListItem} from '@/components/StandardTable';
import {TableListData} from '@/components/Page/TablePage';

import {
  addUser,
  deleteBatchUsers,
  editUser,
  query as queryUsers,
  removeUsers,
  queryAllRoles,
  querySelectRoles
} from './service';
import {queryCurrent} from "@/services/user";

export interface UserListItem extends TableListItem {
  id: number;
  username: string
  pwd: string;
  salt: string;
  age: string;
  avatar: string;
  email: string;
}

export interface UserStateType {
  data: TableListData<UserListItem>;
  allRoles: string[];
  selectRoles: string[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: UserStateType) => T) => T },
) => void;

export interface UserModelType {
  namespace: string;
  state: UserStateType;
  effects: {
    fetch: Effect;
    create: Effect;
    remove: Effect;
    removeBatch: Effect;
    modify: Effect;
    fetchCurrent: Effect;
    fetchAllRoles: Effect;
    fetchSelectRoles: Effect;
  };
  reducers: {
    save: Reducer<UserStateType>;
    add: Reducer<UserStateType>;
    edit: Reducer<UserStateType>;
    del: Reducer<UserStateType>;
    saveCurrentUser: Reducer<UserStateType>;
    saveAllRoles: Reducer<UserStateType>;
    saveSelectRoles: Reducer<UserStateType>;


  };
}


// @ts-ignore
const UserModel: UserModelType = {
  namespace: 'system_user',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    allRoles: [],
    selectRoles: [],
  },

  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryUsers, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: response.data,
        });
      }
    },
    * create({payload}, {call, put}) {
      const response = yield call(addUser, payload);
      return response;
    },
    * modify({payload}, {call, put}) {
      const response = yield call(editUser, payload);
      return response;
    },
    * remove({payload}, {call, put}) {
      const response = yield call(removeUsers, payload);
      return response;
    },
    * removeBatch({payload}, {call, put}) {
      const response = yield call(deleteBatchUsers, payload);
      return response;
    },

    * fetchCurrent(_, {call, put}) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    * fetchAllRoles(_, {call, put}) {
      const response = yield call(queryAllRoles);
      if (response) {
        yield put({
          type: 'saveAllRoles',
          payload: response.data,
        });
      }
    },

    * fetchSelectRoles(_, {call, put}) {
      const response = yield call(querySelectRoles);
      yield put({
        type: 'saveSelectRoles',
        payload: response.data,
      });
    },
  },

  reducers: {
    // @ts-ignore
    save(state, action) {
      return {
        ...state,
        data: {
          list: action.payload.records,
          pagination: {
            total: action.payload.total,
            size: action.payload.size,
            current: action.payload.current,
          }
        },
      };
    },
    // @ts-ignore
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    // @ts-ignore
    saveAllRoles(state, action) {
      console.log(156, action)
      return {
        ...state,
        allRoles: action.payload || [],
      };
    },
    // @ts-ignore
    saveSelectRoles(state, action) {
      return {
        ...state,
        selectRoles: action.payload || [],
      };
    },

  },
};

export default UserModel;
