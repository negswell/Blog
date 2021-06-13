import React from 'react';

import PostForm from './PostForm';

/** Props for CreatePost */
interface IProps {
  setData: (data: IPost[]) => void;
  setDataLoading: (loading: boolean) => void;
}

/** CreatePost Component */
const CreatePost: React.FC<IProps> = ({ setData, setDataLoading }) => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  return (
    <>
      <div className='create-post' onClick={() => setModalVisible(true)}>
        What's on your mind ? Click here to share !
      </div>
      <PostForm
        modalVisible={modalVisible}
        setModalVisile={setModalVisible}
        setData={setData}
        setDataLoading={setDataLoading}
        action='create'
      />
    </>
  );
};

export default CreatePost;
