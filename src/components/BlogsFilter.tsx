import React from 'react';
import { GetBlogsProps, SortByProps, SortDirectionProps } from '../types';

type BlogsFilterProps = {
  value: { offset?: number; search?: string; sort_by?: string };
  onChange: (props: GetBlogsProps) => void;
};

export default function BlogsFilter({ value, onChange }: BlogsFilterProps) {
  return (
    <div className='row m-0 mb-3'>
      {/* FILTER RECORDS */}
      <div className='col-lg-3 col-md-3 col-sm-12'>
        <label htmlFor='offset'>Number of items per page</label>
        <input
          id='offset'
          className='form-control mr-sm-2'
          type='number'
          min={1}
          defaultValue={value.offset}
          onChange={(e) => onChange({ offset: parseInt(e.target.value) })}
        />
      </div>
      {/* FILTER TITLE OR CONTENT */}
      <div className='col-lg-3 col-md-3 col-sm-12'>
        <label htmlFor='search'>
          Search title or content containing the query
        </label>
        <input
          id='search'
          className='form-control mr-sm-2'
          type='text'
          min={1}
          defaultValue={value.search}
          onChange={(e) => onChange({ search: e.target.value })}
        />
      </div>
      {/* FILTER id, title, content, created_at, updated_at */}
      <div className='col-lg-3 col-md-3 col-sm-12'>
        <label
          htmlFor='sort_by'
          className='d-block'
        >
          Sort by
        </label>
        <select
          id='sort_by'
          onChange={(e) => onChange({ sort_by: e.target.value as SortByProps })}
        >
          <option value='id'>Id</option>
          <option value='title'>Title</option>
          <option value='content'>Content</option>
          <option value='create_at'>Created At</option>
          <option value='updated_at'>Updated At</option>
        </select>
      </div>
      {/* FILTER DIRECTION */}
      <div className='col-lg-3 col-md-3 col-sm-12'>
        <label
          htmlFor='sort_direction'
          className='d-block'
        >
          Sort direction
        </label>
        <select
          id='sort_direction'
          onChange={(e) =>
            onChange({
              sort_direction: e.target.value as SortDirectionProps,
            })
          }
        >
          <option value='asc'>T??ng d???n</option>
          <option value='desc'>Gi???m d???n</option>
        </select>
      </div>
    </div>
  );
}
