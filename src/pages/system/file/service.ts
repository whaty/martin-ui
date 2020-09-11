import request from '@/utils/request';

import {TableListParams} from '@/components/Page/TablePage';
import {FileListItem} from '@/pages/system/file/model';

export async function pageFiles(params: TableListParams) {
  return request('/syst/file/page', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteFile(params: FileListItem) {
  return request('/syst/file/delete', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteBatchFiles(params: any) {
  return request('/syst/file/deleteBatch', {
    method: 'POST',
    data: params,
  });
}

export async function addFile(params: FileListItem) {
  return request('/syst/file/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function editFile(params: FileListItem) {
  return request('/syst/file/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
