import React from 'react';
import { Button, Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';

/** Edit Props */
interface IProps {
  title: string;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

/** Edit */
const Edit = (props: IProps) => {
  const { title, onClick } = props;

  return (
    <Tooltip title={title}>
      <Button shape='circle' onClick={onClick}>
        <EditFilled style={{ color: 'green' }} />
      </Button>
    </Tooltip>
  );
};

Edit.defaultProps = {
  title: 'Edit',
};

export default Edit;
