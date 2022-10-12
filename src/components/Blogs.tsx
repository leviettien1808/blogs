import React from 'react';
import { BlogEntity } from '../types';
import Blog from './Blog';

type BlogsProps = {
  data: BlogEntity[];
};

export default function Blogs({ data }: BlogsProps) {
  return (
    <div>
      <ul className='list-unstyled'>
        {data.map((item) => (
          <li
            className='media'
            key={item.id}
          >
            <Blog data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
