import { BlogEntity, GetBlogsProps, PaginationProps } from '../types';
import { baseService, blogsUrl } from './baseService';

export type Response = {
  data: {
    items: BlogEntity[];
  };
  pagination: PaginationProps;
};

export const getBlogs = ({
  page = 1,
  offset = 20,
  search = '',
  sort_by = 'created_at',
  sort_direction = 'desc',
}: GetBlogsProps) => {
  return new Promise<Response>((resolve, reject) => {
    baseService
      .get(blogsUrl, {
        params: { page, offset, search, sort_by, sort_direction },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
