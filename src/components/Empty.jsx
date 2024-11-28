import React from "react";

const Empty = () => {
  return (
    <div className="flex justify-center items-center w-full h-[40vh]">
      <div className="flex items-center gap-3">
        <img width={"50px"} src="tasks.png" alt="" />
        <h2 className="text-white text-2xl font-semibold">No Task Found</h2>
      </div>
    </div>
  );
};

export default Empty;
