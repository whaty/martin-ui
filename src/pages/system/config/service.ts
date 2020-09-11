import request from '@/utils/request';

import {TableListParams} from '@/components/Page/TablePage';
import {ConfigListItem} from '@/pages/system/config/model';

export async function pageConfigs(params: TableListParams) {
  return request('/syst/config/page', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteConfig(params: ConfigListItem) {
  return request('/syst/config/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteBatchConfigs(params: any) {
  return request('/syst/config/deleteBatch', {
    method: 'POST',
    data: params,
  });
}

export async function addConfig(params: ConfigListItem) {
  return request('/syst/config/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function editConfig(params: ConfigListItem) {
  return request('/syst/config/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
