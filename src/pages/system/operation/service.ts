import request from '@/utils/request';

import {TableListParams} from '@/components/Page/TablePage';
import {OperationListItem} from '@/pages/system/operation/model';

export async function pageOperations(params: TableListParams) {
  return request('/syst/operation/page', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteOperation(params: OperationListItem) {
  return request('/syst/operation/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteBatchOperations(params: any) {
  return request('/syst/operation/deleteBatch', {
    method: 'POST',
    data: params,
  });
}

export async function addOperation(params: OperationListItem) {
  return request('/syst/operation/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function editOperation(params: OperationListItem) {
  return request('/syst/operation/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
