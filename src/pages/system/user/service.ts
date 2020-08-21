import request from '@/utils/request';

import {TableListParams} from '@/components/Page/TablePage';
import {UserListItem} from '@/pages/system/user/model';

export async function query(params: TableListParams) {
  return request('/syst/user/page', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeUsers(params: UserListItem) {
  return request('/syst/user/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteBatchUsers(params: any) {
  console.log(25, params);
  return request('/syst/user/deleteBatch', {
    method: 'POST',
    data: params,
  });
}

export async function addUser(params: UserListItem) {
  return request('/syst/user/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function editUser(params: UserListItem) {
  return request('/syst/user/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryAllRoles(params: UserListItem) {
  return request('/syst/user/getAllRoles', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function querySelectRoles(params: UserListItem) {
  return request('/syst/user/getSelectRoles', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

