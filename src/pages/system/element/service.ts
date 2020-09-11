import request from '@/utils/request';

import {TableListParams} from '@/components/Page/TablePage';
import {ElementListItem} from '@/pages/system/element/model';

export async function pageElements(params: TableListParams) {
  return request('/syst/element/page', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteElement(params: ElementListItem) {
  return request('/syst/element/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteBatchElements(params: any) {
  return request('/syst/element/deleteBatch', {
    method: 'POST',
    data: params,
  });
}

export async function addElement(params: ElementListItem) {
  return request('/syst/element/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function editElement(params: ElementListItem) {
  return request('/syst/element/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
