export interface BaseQueries {
  search?: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface PostQueries extends BaseQueries {
  category?: string;
  brand?: string;
}

export interface CommentQueries extends BaseQueries {
  postId: number;
}
