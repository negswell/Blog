import React from 'react';
import CreatePost from './CreatePost';

const Blog: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <CreatePost />
    </div>
  );
};

export default Blog;
