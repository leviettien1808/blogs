import { BlogEntity, EditBlogProps } from '../types';
import { baseService, blogsUrl } from './baseService';

type Response = {
  data: BlogEntity;
};

export const updateBlog = ({ id, content, title, image }: EditBlogProps) => {
  return new Promise<Response>((resolve, reject) => {
    baseService
      .put(`${blogsUrl}/${id}`, null, {
        params: {
          'blog[content]': content,
          'blog[title]': title,
          'blog[image]': image,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
