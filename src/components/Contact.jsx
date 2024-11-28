import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { MdDeleteSweep } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const Contact = ({title,description,id,handleRemove,handleDelete,handleEdit}) => {
  return (
    <div className="min-h-[60px] bg-white rounded-md flex items-center gap-3 p-4 justify-between">
      <div className="flex items-center gap-3">
      
        <div>
          <h2 className="text-[20px] font-semibold">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <FiEdit onClick={()=>handleEdit(id)} className="text-2xl cursor-pointer"/>
        <MdDeleteSweep onClick={()=>handleDelete(id)} className="text-3xl text-purple cursor-pointer" />
      </div>
    </div>
  );
};

export default Contact;
