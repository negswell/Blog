import React from 'react';
import getPosts from '../utils/getPosts';
import CreatePost from './CreatePost';
import PostList from './PostList';

const Blog: React.FC = () => {
  const [data, setData] = React.useState<IPost[]>([]);
  const [dataLoading, setDataLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    getPosts()
      .then((post) => {
        setData(post);
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
