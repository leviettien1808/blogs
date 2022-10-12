import React from 'react';
import { getBlogs } from '../api/getBlogs';
import Blog from '../components/Blog';
import Loading from '../components/Loading';
import { BlogEntity } from '../types';

export default function Home() {
  const [data, setData] = React.useState<BlogEntity[]>([]);

  React.useEffect(() => {
    getBlogs.then((response) => {
      setData(response.data.items);
    });
  }, []);

  if (data.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <ul className='list-unstyled'>
        {data.map((item) => (
          <li className='media' key={item.id}>
            <Blog data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
