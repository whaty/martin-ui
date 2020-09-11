import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';

import {TableListItem} from '@/components/StandardTable';
import {TableListData} from '@/components/Page/TablePage';

import {
  addOperation,
  deleteBatchOperations,
  deleteOperation,
  editOperation,
  pageOperations,
} from './service';

export interface OperationListItem extends TableListItem {
  id: number;
  name: string;
  authority: string;
  parentId: string;
  menuId: string;
  icon: string;
  component: string;
  sort: string;
  createTime: string;
  updateTime: string;
  creator: string;
  updater: string;
}

export interface OperationStateType {
  data: TableListData<OperationListItem>;
  treeData: any[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: OperationStateType) => T) => T },
) => void;

export interface OperationModelType {
  namespace: string;
  state: OperationStateType;
  effects: {
    page: Effect;
    add: Effect;
    delete: Effect;
    deleteBatch: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<OperationStateType>;
  };
}


// @ts-ignore
const OperationModel: OperationModelType = {
  namespace: 'system_operation',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    treeData: [],
  },

  effects: {
    * page({payload}, {call, put}) {
      const response = yield call(pageOperations, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: response.data,
        });
      }
    },
    * add({payload}, {call}) {
      const response = yield call(addOperation, payload);
      return response;
    },
    * update({payload}, {call}) {
      const response = yield call(editOperation, payload);
      return response;
    },
    * delete({payload}, {call}) {
      const response = yield call(deleteOperation, payload);
      return response;
    },
    * deleteBatch({payload}, {call}) {
      const response = yield call(deleteBatchOperations, payload);
      return response;
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: {
          list: action.payload.page.records,
          pagination: {
            total: action.payload.page.total,
            size: action.payload.page.size,
            current: action.payload.page.current,
          }
        },
        treeData: action.payload.menuTree,
      };
    },

  },
};

export default OperationModel;
