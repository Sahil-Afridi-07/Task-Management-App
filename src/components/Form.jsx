import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { useFirebase } from "../context/Firebase";

const Form = ({ handleFormData, isFromActive, setIsFromActive, toggleEdit, editContactData }) => {
  const firebase = useFirebase();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Populate form fields when in edit mode
  useEffect(() => {
    if (toggleEdit && editContactData) {
      setTitle(editContactData.title || "");
      setDescription(editContactData.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [toggleEdit, editContactData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (toggleEdit && editContactData) {
      setTitle(editContactData.title || "");
      setDescription(editContactData.description || "");
      // Update task
      await firebase.handleUpdateTask(editContactData.id, title, description);
    } else {
      // Create new task
      await firebase.handleCreateNewTask(title, description);
      setTitle("");
      setDescription("");
    }
    setIsFromActive(false);
  };
  return (
    <div>
      {isFromActive && (
        <form
          onSubmit={handleSubmit}
          className="mt-5 absolute top-[25%] left-[50%] -translate-x-[50%] bg-white w-[90%] h-[240px] flex flex-col px-5 py-2 gap-1"
        >
          <div className="flex justify-end text-2xl cursor-pointer">
            <TiDelete onClick={() => setIsFromActive(false)} />
          </div>
          <label htmlFor="title">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="bg-transparent border-2 border-gray py-1 px-2"
            type="text"
            id="title"
          />
          
          <label htmlFor="description">Description</label>
          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="bg-transparent border-2 border-gray py-1 px-2"
            type="text"
            id="description"
          />
          
          <div className="flex justify-end mt-3">
            <button className={`px-3 py-2 ${toggleEdit ? "bg-yellow-500 text-black" : "bg-blue-600 text-white"} w-52`}>
              {toggleEdit ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;