import React from 'react';
import { PaginationProps } from '../types';

type Props = {
  data: PaginationProps;
  onPage: (index: number) => void;
};

export default function Pagination({ data, onPage }: Props) {
  const renderItems = () => {
    let items: React.ReactNode[] = [];
    for (let index = 1; index <= data.total; index++) {
      items.push(
        <li
          key={index}
          className={`page-item ${data.page === index && 'active'}`}
        >
          <a
            className='page-link'
            href='/#'
            onClick={() => onPage(index)}
          >
            {index}
          </a>
        </li>
      );
    }
    return items;
  };

  return (
    <div>
      <nav aria-label='Page navigation example'>
        <ul className='pagination'>
          <li className={`page-item ${!data.prev && 'disabled'}`}>
            <a
              className='page-link'
              href='/#'
              onClick={() => onPage(data.prev ?? data.page)}
            >
              Previous
            </a>
          </li>
          {renderItems()}
          <li className={`page-item ${!data.next && 'disabled'}`}>
            <a
              className='page-link'
              href='/#'
              onClick={() => onPage(data.next ?? data.page)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
