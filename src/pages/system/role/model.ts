import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';

import {TableListItem} from '@/components/StandardTable';
import {TableListData} from '@/components/Page/TablePage';

import {
  addRole,
  deleteBatchRoles,
  editRole,
  pageRoles,
  deleteRole,
  getAllMenuByRole,
  saveCheckedMenus, getOperationByCheckedMenus, saveCheckedOperations
} from './service';

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
    page: Effect;
    add: Effect;
    delete: Effect;
    deleteBatch: Effect;
    update: Effect;
    getAllMenuByRole: Effect;
    saveCheckedMenus: Effect;
    getOperationByCheckedMenus: Effect;
    saveCheckedOperations: Effect;
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
    * page({payload}, {call, put}) {
      const response = yield call(pageRoles, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: response.data,
        });
      }
    },
    * add({payload}, {call}) {
      const response = yield call(addRole, payload);
      return response;
    },
    * update({payload}, {call}) {
      const response = yield call(editRole, payload);
      return response;
    },
    * delete({payload}, {call}) {
      const response = yield call(deleteRole, payload);
      return response;
    },
    * deleteBatch({payload}, {call}) {
      const response = yield call(deleteBatchRoles, payload);
      return response;
    },
    * getAllMenuByRole({payload}, {call}) {
      const response = yield call(getAllMenuByRole, payload);
      return response;
    },
    * saveCheckedMenus({payload}, {call}) {
      const response = yield call(saveCheckedMenus, payload);
      return response;
    },
    * getOperationByCheckedMenus({payload}, {call}) {
      const response = yield call(getOperationByCheckedMenus, payload);
      return response;
    },
    * saveCheckedOperations({payload}, {call}) {
      const response = yield call(saveCheckedOperations, payload);
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
