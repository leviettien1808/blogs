import React from 'react';
import { Alert, Modal } from 'reactstrap';
import { BlogEntity } from '../types';
import EditBlogModal from './EditBlogModal';

type BlogProps = {
  data: BlogEntity;
};

export default function Blog({ data }: BlogProps) {
  const [modal, setModal] = React.useState<boolean>(false);

  const toggle = () => setModal(!modal);
  const [statusEditBlog, setStatusEditBlog] = React.useState<{
    status: 'success' | 'danger';
    message: string;
  }>();
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timer = setInterval(() => setOpenAlert(false), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <React.Fragment>
      {/*  */}
      <Modal isOpen={openAlert}>
        <Alert color={statusEditBlog?.status}>{statusEditBlog?.message}</Alert>
      </Modal>
      {/*  */}
      <div onClick={() => setModal(true)}>
        <img
          src={data.image.url}
          className='mr-3 w-100'
          alt='...'
        />
        <div className='media-body'>
          <h5 className='mt-0 mb-1'>{data.title}</h5>
          {data.content}
        </div>
      </div>
      <EditBlogModal
        isOpen={modal}
        toggle={toggle}
        data={data}
        onStatusEditBlog={(value) => setStatusEditBlog({ ...value })}
        onOpenAlert={(value) => setOpenAlert(value)}
      />
    </React.Fragment>
  );
}
