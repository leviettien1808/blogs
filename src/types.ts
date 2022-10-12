export type BlogEntity = {
  comments_count: number;
  content: string;
  created_at: string;
  id: number;
  image: {
    url: string;
  };
  title: string;
  updated_at: string;
};

export type PaginationProps = {
  count: number;
  next: number;
  offset: number;
  page: number;
  prev: number;
  total: number;
};

export type SortByProps =
  | 'id'
  | 'title'
  | 'content'
  | 'created_at'
  | 'updated_at';

export type SortDirectionProps = 'asc' | 'desc';

export type GetBlogsProps = {
  page?: number;
  offset?: number;
  search?: string;
  sort_by?: SortByProps;
  sort_direction?: SortDirectionProps;
};

export type AddBlogsProps = {
  title: string;
  content: string;
  image?: string;
};
