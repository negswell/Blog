import { Row, Col } from 'antd';
import React from 'react';
import Blog from './components/Blog';

const App: React.FC = () => {
  return (
    <Row className='App'>
      <Col className='background-left' span={6} />
      <Col span={12} className='background-body'>
        <Blog />
      </Col>
      <Col className='background-right' span={6} />
    </Row>
  );
};

export default App;
