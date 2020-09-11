import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';

import {TableListItem} from '@/components/StandardTable';
import {TableListData} from '@/components/Page/TablePage';

import {
  addConfig,
  deleteBatchConfigs,
  deleteConfig,
  editConfig,
  pageConfigs,
} from './service';

export interface ConfigListItem extends TableListItem {
          id: number;
          name: string;
          value: string;
          type: string;
          createTime: string;
          updateTime: string;
          creator: string;
          updater: string;
}

export interface ConfigStateType {
  data: TableListData<ConfigListItem>;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConfigStateType) => T) => T },
) => void;

export interface ConfigModelType {
  namespace: string;
  state: ConfigStateType;
  effects: {
    page: Effect;
    add: Effect;
    delete: Effect;
    deleteBatch: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<ConfigStateType>;
  };
}


// @ts-ignore
const ConfigModel: ConfigModelType = {
  namespace: 'system_config',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    * page({payload}, {call, put}) {
      const response = yield call(pageConfigs, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: response.data,
        });
      }
    },
    * add({payload}, {call}) {
      const response = yield call(addConfig, payload);
      return response;
    },
    * update({payload}, {call}) {
      const response = yield call(editConfig, payload);
      return response;
    },
    * delete({payload}, {call}) {
      const response = yield call(deleteConfig, payload);
      return response;
    },
    * deleteBatch({payload}, {call}) {
      const response = yield call(deleteBatchConfigs, payload);
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

export default ConfigModel;
