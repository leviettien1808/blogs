import { AddBlogsProps, BlogEntity } from '../types';
import { baseService, blogsUrl } from './baseService';

type Response = {
  data: BlogEntity;
};

export const addBlog = ({ content, title, image }: AddBlogsProps) => {
  return new Promise<Response>((resolve, reject) => {
    baseService
      .post(blogsUrl, null, {
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
