import request from '@/utils/request';
import {FormDataType} from './index';

export async function fakeAccountLogin(params: FormDataType) {
  return request('/auth/oauth/token?grant_type=password&username=' + params.userName + '&password=' + params.password + '&scope=select', {
    method: 'POST',
    headers:{'Authorization': 'Basic Y2xpZW50MjoxMjM0NTY='}
  });
}

export async function getAuthority() {
  return request('/system/user/authorities');
}



export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
