import request from '@/utils/request';

import {TableListParams} from '@/components/Page/TablePage';
import {DictListItem} from '@/pages/system/dict/model';

export async function pageDicts(params: TableListParams) {
  return request('/syst/dict/page', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteDict(params: DictListItem) {
  return request('/syst/dict/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteBatchDicts(params: any) {
  return request('/syst/dict/deleteBatch', {
    method: 'POST',
    data: params,
  });
}

export async function addDict(params: DictListItem) {
  return request('/syst/dict/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function editDict(params: DictListItem) {
  return request('/syst/dict/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
