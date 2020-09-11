import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';

import {TableListItem} from '@/components/StandardTable';
import {TableListData} from '@/components/Page/TablePage';

import {
  addFile,
  deleteBatchFiles,
  deleteFile,
  editFile,
  pageFiles,
} from './service';

export interface FileListItem extends TableListItem {
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

export interface FileStateType {
  data: TableListData<FileListItem>;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: FileStateType) => T) => T },
) => void;

export interface FileModelType {
  namespace: string;
  state: FileStateType;
  effects: {
    page: Effect;
    add: Effect;
    delete: Effect;
    deleteBatch: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<FileStateType>;
  };
}


// @ts-ignore
const FileModel: FileModelType = {
  namespace: 'system_file',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    * page({payload}, {call, put}) {
      const response = yield call(pageFiles, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: response.data,
        });
      }
    },
    * add({payload}, {call}) {
      const response = yield call(addFile, payload);
      return response;
    },
    * update({payload}, {call}) {
      const response = yield call(editFile, payload);
      return response;
    },
    * delete({payload}, {call}) {
      const response = yield call(deleteFile, payload);
      return response;
    },
    * deleteBatch({payload}, {call}) {
      const response = yield call(deleteBatchFiles, payload);
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

export default FileModel;
