import React from 'react';
import {connect} from 'dva';
import pathToRegexp from 'path-to-regexp';
import Authorized from '@/utils/Authorized';
import {getAuthority} from '@/utils/authority';
import {ConnectProps, ConnectState, Route, UserModelState} from '@/models/connect';

interface AuthComponentProps extends ConnectProps {
  user: UserModelState;
}

const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities = getAuthority();
  routeData.forEach(route => {
    // match prefix
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

const AuthComponent: React.FC<AuthComponentProps> = ({
  children,
  route = {
    routes: [],
  },
  location = {
    pathname: '',
  },
  user,
}) => {
  const { routes = [] } = route;
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routes) || ''}
    >
      {children}
    </Authorized>
  );
};

export default connect(({ user }: ConnectState) => ({
  user,
// @ts-ignore
}))(AuthComponent);
