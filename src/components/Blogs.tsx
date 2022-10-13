import React from 'react';
import { BlogEntity } from '../types';
import Blog from './Blog';

type BlogsProps = {
  data: BlogEntity[];
};

export default function Blogs({ data }: BlogsProps) {
  return (
    <div>
      <ul className='list-unstyled p-3'>
        <div className='row'>
          {data.map((item) => (
            <div
              className='col-sm-6 col-md- 6 col-lg-4'
              key={item.id}
            >
              <li className='media'>
                <Blog data={item} />
              </li>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}
