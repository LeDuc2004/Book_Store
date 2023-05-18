
// function Confirm(text) {
//     return (  <>
// <div className="confirm">
//     <div className="confirm__text">{text}</div>
//     <div className="confirm__btn">
//         <div className="confirm__cancal">Cancel</div>
//         <div className="confirm__xacnhan">Xác nhận</div>
        
        
//     </div>
    
// </div>
//     </>);
// }
import React from 'react';
import './confirm.scss';

const Confirm = ({ onCancel, onConfirm , onName}) => {
  const handleCancel = () => {
    onCancel(false);
  };

  const handleConfirm = () => {
    onConfirm(true);
  };

  return (
    <div className="small-table">
      <div className="content">Bạn có muốn xóa?</div>
      <div style={{color:"red"}} className="content">{onName}</div>

      <div className="button-container">
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="confirm-button" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Confirm;


