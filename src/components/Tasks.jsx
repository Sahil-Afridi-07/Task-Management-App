import React, { useEffect, useState } from 'react';
import Task from './Task';
import Empty from './Empty';
import { useFirebase } from '../context/Firebase';

const Tasks = ({tasks, handleRemove,setIsFromActive,setEditTaskData,setToggleEdit, isFromActive }) => {
  const firebase = useFirebase(); // Access Firebase context

  const handleDelete = async (id) => {
    await firebase.handleDeleteTask(id); // Call the delete function
    handleRemove(id); // Call the handleRemove to update local state
  };
  const handleEdit = (task) => {
    setIsFromActive(true);
    setToggleEdit(true);
    // Pass the task data to the `setEditTaskData` function to update the state in the parent component
    setEditTaskData(task); // Update the edit Task data
  };


  return (
    <div>
      {tasks.length > 0 ? (
        <div className={`flex flex-col gap-5 mt-5 relative ${isFromActive && 'blur-sm'}`}>
          {tasks.map((task) => (
            <Task
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

export default Tasks;