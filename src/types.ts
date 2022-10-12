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
  prev?: number;
  total: number;
};
