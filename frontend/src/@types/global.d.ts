import { MessageApi } from 'antd/lib/message';
import { NotificationApi } from 'antd/lib/notification';
import { AxiosInstance } from 'axios';

declare global {
  export const $http: AxiosInstance;

  export const $msg: MessageApi;

  export const $notice: NotificationApi;

  interface IResponseData<T = any> {
    data: T;
    msg: string;
    status: number;
  }

  type AnyObject<T = any> = Record<string, T>;
}
