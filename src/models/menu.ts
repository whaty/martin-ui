import {Effect} from 'dva';
import {Reducer} from 'redux';

import {query as queryMenus} from '@/services/menu';
import React from "react";

export interface MenuItem {
  authority?: string[] | string;
  children?: MenuItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: React.ReactNode;
  locale?: string;
  name?: string;
  key?: string;
  path?: string;
  [key: string]: any;
  parentKeys?: string[];
}

export interface MenuModelState {
  menus: MenuItem[];
}

export interface MenuModelType {
  namespace: 'menu';
  state: MenuModelState;
  effects: {
    fetchMenus: Effect;
  };
  reducers: {
    saveMenus: Reducer<MenuModelState>;
  };
}

const MenuModel: MenuModelType = {
  namespace: 'menu',

  state: {
    menus: [],
  },

  effects: {
    * fetchMenus(_, {call, put}) {



      const response = yield call(queryMenus);
      yield put({
        type: 'saveMenus',
        payload: response.data,
      });
    },
  },

  reducers: {
    saveMenus(state, action) {
      return {
        ...state,
        menus: action.payload || {},
      };
    },
  },
};

export default MenuModel;
