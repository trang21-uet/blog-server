import { Request } from 'express';
import { Query } from 'express-serve-static-core';

export interface BaseQueries {
  search?: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface PostQueries extends BaseQueries {
  category?: string;
  brand?: string;
}
