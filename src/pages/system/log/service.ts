import request from '@/utils/request';

import {TableListParams} from '@/components/Page/TablePage';
import {LogListItem} from '@/pages/system/log/model';

export async function pageLogs(params: TableListParams) {
  return request('/syst/log/page', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteLog(params: LogListItem) {
  return request('/syst/log/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteBatchLogs(params: any) {
  return request('/syst/log/deleteBatch', {
    method: 'POST',
    data: params,
  });
}

export async function addLog(params: LogListItem) {
  return request('/syst/log/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function editLog(params: LogListItem) {
  return request('/syst/log/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
