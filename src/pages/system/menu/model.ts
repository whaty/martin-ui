import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';

import {TableListItem} from '@/components/StandardTable';
import {TableListData} from '@/components/Page/TablePage';

import {addMenu, deleteBatchMenus, deleteMenu, editMenu, pageMenus,} from './service';

export interface MenuListItem extends TableListItem {
  id: number;
  name: string;
  authority: string;
  path: string;
  parentId: string;
  icon: string;
  locale: string;
  parentKey: string;
  hideChildrenInMenu: string;
  hideInMenu: string;
  uiKey: string;
  component: string;
  sort: string;
  dev: string;
  createTime: string;
  updateTime: string;
  creator: string;
  updater: string;
}

export interface MenuStateType {
  data: TableListData<MenuListItem>;
  treeData: any[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: MenuStateType) => T) => T },
) => void;

export interface MenuModelType {
  namespace: string;
  state: MenuStateType;
  effects: {
    page: Effect;
    add: Effect;
    delete: Effect;
    deleteBatch: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<MenuStateType>;
  };
}


// @ts-ignore
const MenuModel: MenuModelType = {
  namespace: 'system_menu',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    treeData: [],
  },

  effects: {
    * page({payload}, {call, put}) {
      const response = yield call(pageMenus, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: response.data,
        });
      }
    },
    * add({payload}, {call}) {
      const response = yield call(addMenu, payload);
      return response;
    },
    * update({payload}, {call}) {
      const response = yield call(editMenu, payload);
      return response;
    },
    * delete({payload}, {call}) {
      const response = yield call(deleteMenu, payload);
      return response;
    },
    * deleteBatch({payload}, {call}) {
      const response = yield call(deleteBatchMenus, payload);
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

export default MenuModel;
