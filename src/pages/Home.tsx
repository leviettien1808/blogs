import React from 'react';
import { getBlogs } from '../api/getBlogs';
import AddBlogModal from '../components/AddBlogModal';
import Blogs from '../components/Blogs';
import BlogsFilter from '../components/BlogsFilter';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import { BlogEntity, GetBlogsProps, PaginationProps } from '../types';

export default function Home() {
  const [blogs, setBlogs] = React.useState<BlogEntity[]>([]);
  const [pagination, setPagination] = React.useState<PaginationProps>();
  const [page, setPage] = React.useState<number>(1);
  const [filter, setFilter] = React.useState<GetBlogsProps>({
    offset: 20,
    search: '',
    sort_by: 'created_at',
    sort_direction: 'desc',
  });
  const [hasNewBlog, setHasNewBlog] = React.useState<boolean>(false);

  React.useEffect(() => {
    // RELOAD AFTER ADD NEW BLOG
    if (hasNewBlog) {
      getBlogs({}).then((response) => {
        setBlogs(response.data.items);
        setPagination(response.pagination);
      });
    } else {
      getBlogs({ page, ...filter }).then((response) => {
        setBlogs(response.data.items);
        setPagination(response.pagination);
      });
    }
    return () => {
      setHasNewBlog(false);
    };
  }, [filter, hasNewBlog, page]);

  if (blogs.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      {/* HEADER */}
      <BlogsFilter
        value={filter}
        onChange={(value) => setFilter((prev) => ({ ...prev, ...value }))}
      />
      {/* CREATE NEW BLOG */}
      <AddBlogModal hasNewBlog={(value) => setHasNewBlog(value)} />
      {/* BODY */}
      {blogs && <Blogs data={blogs} />}
      {/* FOOTER */}
      {pagination && (
        <Pagination
          data={pagination}
          onPage={(index) => setPage(index)}
        />
      )}
    </div>
  );
}
