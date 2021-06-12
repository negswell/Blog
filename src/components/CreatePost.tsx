import { Modal, Input, Form } from 'antd';
import React from 'react';

const CreatePost: React.FC = () => {
  const [modalVisile, setModalVisile] = React.useState(false);
  const [form] = Form.useForm();

  const handleFinish = (values: ICreatePostForm) => {
    console.log(values);
  };

  return (
    <>
      <div className='create-post' onClick={() => setModalVisile(true)}>
        What's on your mind ?
      </div>
      <Modal
        title='Create Post'
        visible={modalVisile}
        onOk={() => form.submit()}
        onCancel={() => setModalVisile(false)}
        destroyOnClose={true}
      >
        <Form wrapperCol={{ span: 24 }} form={form} onFinish={handleFinish}>
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
            <Input.TextArea placeholder='What is on your mind ?' rows={8} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreatePost;
