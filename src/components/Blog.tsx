import React from 'react';

import getPosts from '../utils/getPosts';
import CreatePost from './CreatePost';
import PostList from './PostList';

/** Blog Component */
const Blog: React.FC = () => {
  const [data, setData] = React.useState<IPost[]>([]);
  const [dataLoading, setDataLoading] = React.useState<boolean>(true);

  /** Get Posts on mount */
  React.useEffect(() => {
    getPosts()
      .then((posts) => {
        setData(posts);
      })
      .finally(() => setDataLoading(false));
  }, []);

  return (
    <>
      <div
        style={{
          width: '100%',
          position: 'sticky',
          top: 0,
          height: '70px',
          zIndex: 1,
          background: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CreatePost setData={setData} setDataLoading={setDataLoading} />
      </div>
      <PostList
        data={data}
        dataLoading={dataLoading}
        setDataLoading={setDataLoading}
        setData={setData}
      />
    </>
  );
};

export default Blog;
