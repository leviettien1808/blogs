import React from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from 'reactstrap';
import { addBlog } from '../api/addBlog';

type AddBlogModalProps = {
  hasNewBlog?: (value: boolean) => void;
  open?: boolean;
};

type Inputs = {
  title: string;
  content: string;
  image?: string;
};

export default function AddBlogModal({ hasNewBlog, open }: AddBlogModalProps) {
  const [modal, setModal] = React.useState<boolean>(open ?? false);

  const toggle = () => setModal(!modal);
  const [statusNewBlog, setStatusNewBlog] = React.useState<{
    status: 'success' | 'danger';
    message: string;
  }>();
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      content: '',
      image: '',
      title: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addBlog({
      ...data,
      image:
        'https://res.cloudinary.com/sontd-nal-vn/image/upload/v1665591059/ibvffubq59w07vopsc5i.png',
    })
      .then((response) => {
        setStatusNewBlog({
          status: 'success',
          message: `Add [${data.title}] successly!`,
        });
        setOpenAlert(true);
        if (hasNewBlog && typeof hasNewBlog === 'function') {
          hasNewBlog(true);
        }
      })
      .catch((error) => {
        setStatusNewBlog({
          status: 'danger',
          message: `Add [${data.title}] failed!`,
        });
        setOpenAlert(true);
      });
    toggle();
  };

  React.useEffect(() => {
    const timer = setInterval(() => setOpenAlert(false), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='text-center'>
      {/*  */}
      <Alert
        color={statusNewBlog?.status}
        isOpen={openAlert}
      >
        {statusNewBlog?.message}
      </Alert>
      {/*  */}
      <Button
        color='primary'
        onClick={toggle}
      >
        Add New Blog
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>New Blog</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for='blog-title'>Title</Label>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    id='blog-title'
                    {...field}
                  />
                )}
              />
              {errors.title && (
                <span className='text-danger'>This field is required</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label for='blog-content'>Content</Label>
              <Controller
                name='content'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    id='blog-content'
                    type='textarea'
                    {...field}
                  />
                )}
              />
              {errors.content && (
                <span className='text-danger'>This field is required</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label for='blog-image'>Image</Label>
              <Controller
                name='image'
                control={control}
                render={({ field }) => (
                  <Input
                    id='blog-image'
                    type='file'
                    {...field}
                  />
                )}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color='secondary'
            onClick={toggle}
          >
            Cancel
          </Button>
          <Button
            color='primary'
            onClick={handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

AddBlogModal.defaultProps = {
  open: false,
};
