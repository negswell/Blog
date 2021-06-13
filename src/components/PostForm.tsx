import React from 'react';
import { Modal, Form, Input, notification } from 'antd';

import createPost from '../utils/createPost';
import getPosts from '../utils/getPosts';
import updatePost from '../utils/updatePost';

/** Props for Post add/update Form */
interface IProps {
  modalVisible: boolean;
  post?: IPost;
  action: string;
  setModalVisile: (modalVisible: boolean) => void;
  setData: (data: IPost[]) => void;
  setDataLoading: (loading: boolean) => void;
}

/** PostForm Component */
const PostForm: React.FC<IProps> = ({
  post,
  modalVisible,
  action,
  setData,
  setDataLoading,
  setModalVisile,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [form] = Form.useForm();

  /** Set form values for editing when action is update */
  React.useEffect(() => {
    if (post) {
      form.setFieldsValue(post);
    }
  }, [post]);

  /** handle form submit */
  const handleFinish = (values: ICreatePostForm) => {
    setLoading(true);

    if (action === 'update' && post) {
      /** call update apiand then call get posts api again to get updated post list */
      updatePost(post.id, values.title, values.body)
        .then(async () => {
          setDataLoading(true);
          notification['success']({
            message: 'Successfully Updated Post.',
            duration: 2,
          });

          try {
            const posts: IPost[] = await getPosts();
            setData(posts);
          } catch (error) {
            notification['error']({
              message: 'Error',
              description: `${error}`,
            });
          }

          setDataLoading(false);
          setLoading(false);
          setModalVisile(false);
        })
        .catch((error) => {
          notification['error']({
            message: 'Error',
            description: `${error}`,
          });
          setLoading(false);
        });
    } else {
      /** call create api and then call get posts api again to get updated post list */
      createPost(values.title, values.body)
        .then(async () => {
          setDataLoading(true);
          notification['success']({
            message: 'Successfully Created Post.',
            duration: 2,
          });

          try {
            const posts: IPost[] = await getPosts();
            setData(posts);
          } catch (error) {
            notification['error']({
              message: 'Error',
              description: `${error}`,
            });
          }

          setDataLoading(false);
          setLoading(false);
          setModalVisile(false);
        })
        .catch((error) => {
          notification['error']({
            message: 'Error',
            description: `${error}`,
          });
          setLoading(false);
        });
    }
  };

  return (
    <Modal
      title={action === 'update' ? 'Update Post' : 'Create Post'}
      okText={action === 'update' ? 'Update' : 'Create'}
      destroyOnClose={true}
      visible={modalVisible}
      confirmLoading={loading}
      onOk={() => form.submit()}
      onCancel={() => setModalVisile(false)}
    >
      <Form
        wrapperCol={{ span: 24 }}
        form={form}
        onFinish={handleFinish}
        preserve={false}
      >
        <Form.Item
          name='title'
          rules={[{ required: true, message: 'Please enter a title ' }]}
        >
          <Input placeholder='Title' />
        </Form.Item>
        <Form.Item
          name='body'
          rules={[{ required: true, message: 'Please enter a message' }]}
        >
          <Input.TextArea
            placeholder='What is on your mind ?'
            rows={8}
            allowClear
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PostForm;
