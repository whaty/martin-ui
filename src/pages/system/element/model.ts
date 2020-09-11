import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';

import {TableListItem} from '@/components/StandardTable';
import {TableListData} from '@/components/Page/TablePage';

import {
  addElement,
  deleteBatchElements,
  deleteElement,
  editElement,
  pageElements,
} from './service';

export interface ElementListItem extends TableListItem {
          id: number;
          name: string;
          authority: string;
          url: string;
          sort: string;
          createTime: string;
          updateTime: string;
          creator: string;
          updater: string;
}

export interface ElementStateType {
  data: TableListData<ElementListItem>;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ElementStateType) => T) => T },
) => void;

export interface ElementModelType {
  namespace: string;
  state: ElementStateType;
  effects: {
    page: Effect;
    add: Effect;
    delete: Effect;
    deleteBatch: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<ElementStateType>;
  };
}


// @ts-ignore
const ElementModel: ElementModelType = {
  namespace: 'system_element',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    * page({payload}, {call, put}) {
      const response = yield call(pageElements, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: response.data,
        });
      }
    },
    * add({payload}, {call}) {
      const response = yield call(addElement, payload);
      return response;
    },
    * update({payload}, {call}) {
      const response = yield call(editElement, payload);
      return response;
    },
    * delete({payload}, {call}) {
      const response = yield call(deleteElement, payload);
      return response;
    },
    * deleteBatch({payload}, {call}) {
      const response = yield call(deleteBatchElements, payload);
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

export default ElementModel;
