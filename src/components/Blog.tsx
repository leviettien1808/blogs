import React from 'react';
import { BlogEntity } from '../types';

type BlogProps = {
  data: BlogEntity;
};

export default function Blog({ data }: BlogProps) {
  return (
    <React.Fragment>
      <img src={data.image.url} className='mr-3' alt='...' width='30%' />
      <div className='media-body'>
        <h5 className='mt-0 mb-1'>{data.title}</h5>
        {data.content}
      </div>
    </React.Fragment>
  );
}
