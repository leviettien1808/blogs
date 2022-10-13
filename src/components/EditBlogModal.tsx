import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { updateBlog } from '../api/updateBlog';
import { BlogEntity } from '../types';

type EditBlogModalProps = {
  isOpen: boolean;
  toggle: () => void;
  data: BlogEntity;
  onStatusEditBlog?: ({
    status,
    message,
  }: {
    status: 'success' | 'danger';
    message: string;
  }) => void;
  onOpenAlert?: (value: boolean) => void;
};

type Inputs = {
  title: string;
  content: string;
  image?: string;
};

export default function EditBlogModal({
  isOpen,
  toggle,
  data,
  onStatusEditBlog,
  onOpenAlert,
}: EditBlogModalProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (value) => {
    updateBlog({ id: data.id, ...value })
      .then((response) => {
        if (onStatusEditBlog && typeof onStatusEditBlog === 'function') {
          onStatusEditBlog({
            status: 'success',
            message: `Update [${data.title}] successly!`,
          });
        }
        if (onOpenAlert && typeof onOpenAlert === 'function') {
          onOpenAlert(true);
        }
        localStorage.setItem('StatusEdit', 'success');
      })
      .catch((error) => {
        if (onStatusEditBlog && typeof onStatusEditBlog === 'function') {
          onStatusEditBlog({
            status: 'danger',
            message: `Update [${data.title}] failed!`,
          });
        }
        if (onOpenAlert && typeof onOpenAlert === 'function') {
          onOpenAlert(true);
        }
      });
    toggle();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Edit Blog</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for='blog-title'>Title</Label>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                defaultValue={data?.title ?? ''}
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
                defaultValue={data?.content ?? ''}
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
                // defaultValue={data?.image?.url ?? ''}
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
            Edit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
