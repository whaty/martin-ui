import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/system/menu/tree');
}
