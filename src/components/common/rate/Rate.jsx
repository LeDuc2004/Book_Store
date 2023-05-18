import { Rate } from 'antd';
const Star = ({ star, disabled }) => {
  return <Rate allowHalf value={star} disabled={disabled} />;
};

export default Star;
