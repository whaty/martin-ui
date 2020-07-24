import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {routerRedux} from 'dva/router';
import {fakeAccountLogin, getAuthority, getFakeCaptcha} from './service';
import {getPageQuery, setAuthority} from './utils/utils';
import {reloadAuthorized} from "@/utils/Authorized";
import {stringify} from "qs";

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: string[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userAndlogin',

  state: {
    status: undefined,
  },

  effects: {
    * login({payload}, {call, put}) {
      const response = yield call(fakeAccountLogin, payload);
      let accessToken = response.access_token;
      console.log(accessToken);
      console.log(response);
      // Login successfully
      if (accessToken) {
        localStorage.setItem("Authorization", accessToken);
        let authority = yield call(getAuthority, payload);
        yield put({
          type: 'changeLoginStatus',
          payload: authority.data,
        });
        console.log(authority.data);
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    * getCaptcha({payload}, {call}) {
      yield call(getFakeCaptcha, payload);
    },

    * logout(_, {put}) {
      localStorage.setItem("Authorization", '');
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      const {redirect} = getPageQuery();
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, {payload}) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
