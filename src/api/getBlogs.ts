import { BlogEntity, PaginationProps } from '../types';

export type Response = {
  data: {
    items: BlogEntity[];
  };
  pagination: PaginationProps;
};

export const getBlogs = new Promise<Response>((resolve, reject) => {
  return fetch('https://api-placeholder.herokuapp.com/api/v2/blogs')
    .then<Response>((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});
