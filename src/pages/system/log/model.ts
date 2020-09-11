import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';

import {TableListItem} from '@/components/StandardTable';
import {TableListData} from '@/components/Page/TablePage';

import {
  addLog,
  deleteBatchLogs,
  deleteLog,
  editLog,
  pageLogs,
} from './service';

export interface LogListItem extends TableListItem {
          id: number;
          type: string;
          title: string;
          serviceId: string;
          createBy: string;
          remoteAddr: string;
          userAgent: string;
          requestUri: string;
          method: string;
          params: string;
          time: string;
          exception: string;
          createTime: string;
          updateTime: string;
          creator: string;
          updater: string;
}

export interface LogStateType {
  data: TableListData<LogListItem>;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: LogStateType) => T) => T },
) => void;

export interface LogModelType {
  namespace: string;
  state: LogStateType;
  effects: {
    page: Effect;
    add: Effect;
    delete: Effect;
    deleteBatch: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<LogStateType>;
  };
}


// @ts-ignore
const LogModel: LogModelType = {
  namespace: 'system_log',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    * page({payload}, {call, put}) {
      const response = yield call(pageLogs, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: response.data,
        });
      }
    },
    * add({payload}, {call}) {
      const response = yield call(addLog, payload);
      return response;
    },
    * update({payload}, {call}) {
      const response = yield call(editLog, payload);
      return response;
    },
    * delete({payload}, {call}) {
      const response = yield call(deleteLog, payload);
      return response;
    },
    * deleteBatch({payload}, {call}) {
      const response = yield call(deleteBatchLogs, payload);
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

export default LogModel;
