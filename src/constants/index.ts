import { BaseQueries } from './type';

export const DEFAULT_QUERIES: BaseQueries = {
  pageSize: 10,
  pageIndex: 1,
};

export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;
