import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';

import {TableListItem} from '@/components/StandardTable';
import {TableListData} from '@/components/Page/TablePage';

import {addRole, deleteBatchRoles, editRole, query as queryRoles, removeRoles} from './service';

export interface RoleListItem extends TableListItem {
    id: number;
    roleName: string;
    roleCode: string;
    roleDesc: string;
    dsType: string;
    dsScope: string;
    tenantId: string;
    delFlag: string;
    createTime: string;
    updateTime: string;
    creator: string;
    updater: string;
}

export interface RoleStateType {
  data: TableListData<RoleListItem>;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: RoleStateType) => T) => T },
) => void;

export interface RoleModelType {
  namespace: string;
  state: RoleStateType;
  effects: {
    fetch: Effect;
    create: Effect;
    remove: Effect;
    removeBatch: Effect;
    modify: Effect;
  };
  reducers: {
    save: Reducer<RoleStateType>;
  };
}


// @ts-ignore
const RoleModel: RoleModelType = {
  namespace: 'system_role',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryRoles, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: response.data,
        });
      }
    },
    * create({payload}, {call, put}) {
      const response = yield call(addRole, payload);
      return response;
    },
    * modify({payload}, {call, put}) {
      const response = yield call(editRole, payload);
      return response;
    },
    * remove({payload}, {call, put}) {
      const response = yield call(removeRoles, payload);
      return response;
    },
    * removeBatch({payload}, {call, put}) {
      const response = yield call(deleteBatchRoles, payload);
      return response;
    },


  },

  reducers: {

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

  },
};

export default RoleModel;
