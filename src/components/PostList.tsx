import React from 'react';
import { List, Avatar, Skeleton, Modal, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import Delete from '../Widgets/Button/Delete';
import Edit from '../Widgets/Button/Edit';
import deletePost from '../utils/deletePost';
import getPosts from '../utils/getPosts';
import PostForm from './PostForm';

/** Props for Post List */
interface IProps {
  data: IPost[];
  dataLoading: boolean;
  setData: (data: IPost[]) => void;
  setDataLoading: (dataLoading: boolean) => void;
}

/**  PostList component */
const PostList: React.FC<IProps> = ({
  data,
  dataLoading,
  setData,
  setDataLoading,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [post, setPost] = React.useState<IPost>();

  /** handle edit/update post */
  const handleEdit = (post: IPost) => {
    setPost({
      id: post.id,
      title: decodeURIComponent(post.title),
      body: decodeURIComponent(post.body),
    });
    setModalVisible(true);
  };

  /** handle delete post */
  const handleDelete = (post: IPost) => {
    Modal.confirm({
      title: 'Do you Want to delete this post ?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deletePost(post.id).then(async () => {
          setDataLoading(true);

          try {
            const posts: IPost[] = await getPosts();
            setData(posts);
            notification['success']({
              message: 'Successfully Deleted.',
            });
          } catch (error) {
            notification['error']({
              message: 'Error',
              description: `${error}`,
            });
          }

          setDataLoading(false);
        });
      },
    });
  };

  return dataLoading ? (
    <div style={{ width: '100%', padding: '16px' }}>
      <Skeleton avatar loading={dataLoading} active paragraph={{ rows: 4 }} />
      <Skeleton avatar loading={dataLoading} active paragraph={{ rows: 4 }} />
      <Skeleton avatar loading={dataLoading} active paragraph={{ rows: 4 }} />
    </div>
  ) : (
    <>
      <List
        itemLayout='horizontal'
        dataSource={data}
        rowKey='id'
        style={{ padding: '16px' }}
        renderItem={(post: IPost) => (
          <div
            style={{
              borderTopRightRadius: '8px',
              borderTopLeftRadius: '16px',
              borderBottomRightRadius: '8px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'lightgrey',
              marginTop: '16px',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <List.Item.Meta
              avatar={
                <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
              }
              title={<div>{decodeURIComponent(post.title)}</div>}
              description={decodeURIComponent(post.body)}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <Edit onClick={() => handleEdit(post)} />
              <Delete onClick={() => handleDelete(post)} />
            </div>
          </div>
        )}
      />
      <PostForm
        modalVisible={modalVisible}
        setModalVisile={setModalVisible}
        setData={setData}
        setDataLoading={setDataLoading}
        post={post}
        action='update'
      />
    </>
  );
};

export default React.memo(PostList);
