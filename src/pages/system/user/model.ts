import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';

import { TableListItem } from '@/components/StandardTable';
import { TableListData } from '@/components/Page/TablePage';

import {
  addUser,
  addUserRole,
  deleteBatchUsers,
  deleteUser,
  deleteUserRole,
  editUser,
  getAllRoles,
  getSelectRoles,
  pageUsers,
} from './service';
import { queryCurrent } from '@/services/user';

export interface UserRoleItem {
  roleId: number;
}

export interface UserListItem extends TableListItem {
  id: number;
  username: string;
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
    page: Effect;
    add: Effect;
    delete: Effect;
    deleteBatch: Effect;
    update: Effect;
    getCurrent: Effect;
    getAllRoles: Effect;
    getSelectRoles: Effect;
    addUserRole: Effect;
    deleteUserRole: Effect;
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
    *page({ payload }, { call, put }) {
      const response = yield call(pageUsers, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: response.data,
        });
      }
    },
    *add({ payload }, { call }) {
      const response = yield call(addUser, payload);
      return response;
    },
    *update({ payload }, { call }) {
      const response = yield call(editUser, payload);
      return response;
    },
    *delete({ payload }, { call }) {
      const response = yield call(deleteUser, payload);
      return response;
    },
    *deleteBatch({ payload }, { call }) {
      const response = yield call(deleteBatchUsers, payload);
      return response;
    },

    *getCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *getAllRoles({ payload }, { call }) {
      const response = yield call(getAllRoles, payload);
      return response;
    },

    *getSelectRoles({ payload }, { call, put }) {
      const response = yield call(getSelectRoles, payload);
      yield put({
        type: 'saveSelectRoles',
        payload: response.data,
      });
    },

    *addUserRole({ payload }, { call }) {
      yield call(addUserRole, payload);
    },

    *deleteUserRole({ payload }, { call }) {
      yield call(deleteUserRole, payload);
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
          },
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
