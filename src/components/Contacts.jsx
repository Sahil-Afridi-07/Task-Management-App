import React, { useEffect, useState } from 'react';
import Contact from './Contact';
import Empty from './Empty';
import { useFirebase } from '../context/Firebase';

const Contacts = ({tasks, handleRemove,setIsFromActive,setEditContactData,setToggleEdit, isFromActive }) => {
  const firebase = useFirebase(); // Access Firebase context

  const handleDelete = async (id) => {
    await firebase.handleDeleteTask(id); // Call the delete function
    handleRemove(id); // Call the handleRemove to update local state
  };
  const handleEdit = (task) => {
    setIsFromActive(true);
    setToggleEdit(true);
    // Pass the task data to the `setEditContactData` function to update the state in the parent component
    setEditContactData(task); // Update the edit contact data
  };


  return (
    <div>
      {tasks.length > 0 ? (
        <div className={`flex flex-col gap-5 mt-5 relative ${isFromActive && 'blur-sm'}`}>
          {tasks.map((task) => (
            <Contact
              key={task.id} // Use Firestore document ID as a unique key
              id={task.id}
              handleEdit={handleEdit}
              
              handleDelete={handleDelete} // Pass the delete function
              title={task.data().title}
              description={task.data().description}
            />
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Contacts;