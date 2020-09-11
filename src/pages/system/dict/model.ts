import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';

import {TableListItem} from '@/components/StandardTable';
import {TableListData} from '@/components/Page/TablePage';

import {
  addDict,
  deleteBatchDicts,
  deleteDict,
  editDict,
  pageDicts,
} from './service';

export interface DictListItem extends TableListItem {
          id: number;
          value: string;
          label: string;
          type: string;
          description: string;
          sort: string;
          remarks: string;
          createTime: string;
          updateTime: string;
          creator: string;
          updater: string;
}

export interface DictStateType {
  data: TableListData<DictListItem>;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: DictStateType) => T) => T },
) => void;

export interface DictModelType {
  namespace: string;
  state: DictStateType;
  effects: {
    page: Effect;
    add: Effect;
    delete: Effect;
    deleteBatch: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<DictStateType>;
  };
}


// @ts-ignore
const DictModel: DictModelType = {
  namespace: 'system_dict',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    * page({payload}, {call, put}) {
      const response = yield call(pageDicts, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: response.data,
        });
      }
    },
    * add({payload}, {call}) {
      const response = yield call(addDict, payload);
      return response;
    },
    * update({payload}, {call}) {
      const response = yield call(editDict, payload);
      return response;
    },
    * delete({payload}, {call}) {
      const response = yield call(deleteDict, payload);
      return response;
    },
    * deleteBatch({payload}, {call}) {
      const response = yield call(deleteBatchDicts, payload);
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

export default DictModel;
