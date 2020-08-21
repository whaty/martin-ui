import request from '@/utils/request';

import {TableListParams} from '@/components/Page/TablePage';
import {RoleListItem} from '@/pages/system/role/model';

export async function query(params: TableListParams) {
  return request('/syst/role/page', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeRoles(params: RoleListItem) {
  return request('/syst/role/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteBatchRoles(params: any) {
  return request('/syst/role/deleteBatch', {
    method: 'POST',
    data: params,
  });
}

export async function addRole(params: RoleListItem) {
  return request('/syst/role/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function editRole(params: RoleListItem) {
  return request('/syst/role/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
