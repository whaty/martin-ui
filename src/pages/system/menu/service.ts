import request from '@/utils/request';

import {TableListParams} from '@/components/Page/TablePage';
import {MenuListItem} from '@/pages/system/menu/model';

export async function pageMenus(params: TableListParams) {
  return request('/syst/menu/page', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteMenu(params: MenuListItem) {
  return request('/syst/menu/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteBatchMenus(params: any) {
  return request('/syst/menu/deleteBatch', {
    method: 'POST',
    data: params,
  });
}

export async function addMenu(params: MenuListItem) {
  return request('/syst/menu/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function editMenu(params: MenuListItem) {
  return request('/syst/menu/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
