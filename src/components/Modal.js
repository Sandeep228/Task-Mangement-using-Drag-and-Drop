import React from 'react';

const Modal = ({ show, onClose, onUpdate, updatecourseTitle, setUpdateCourseTitle, id }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <input
          value={updatecourseTitle}
          onChange={(e) => setUpdateCourseTitle(e.target.value)}
          style={{
            padding: '8px',
            margin: '8px 0',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight:"5px"
          }}
        />
        <button  onClick={() => onUpdate(id)} 
         style={{
          backgroundColor: 'yellow',
          color: 'black',
          padding: '8px',
          borderRadius: '4px',
          marginRight: '8px',
          cursor: 'pointer',
        }}>
          Update
        </button>
        <button  onClick={onClose} 
        style={{
        backgroundColor: 'yellow',
        color: 'black',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
      }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
