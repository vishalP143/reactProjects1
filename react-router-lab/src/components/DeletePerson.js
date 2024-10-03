import React from 'react';

const DeletePerson = ({ id, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      onDelete(id);
    }
  };

  return (
    <button className="btn btn-delete" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeletePerson;
