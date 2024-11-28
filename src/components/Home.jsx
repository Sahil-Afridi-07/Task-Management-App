import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Contacts from './Contacts';
import { IoMdSearch } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { useFirebase } from '../context/Firebase';
import Form from "./Form";

const Home = () => {
  const firebase=useFirebase();
  const [tasks, setTasks] = useState([]); // Initialize tasks with useState

  // Fetch tasks from Firebase on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskSnapshot = await firebase.listAllTask();
        setTasks(taskSnapshot.docs); // Save Firestore documents
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [firebase,tasks]); // Include firebase as a dependency
   
     const [isFromActive,setIsFromActive]=useState(false);
     const [searchQuery,setSearchQuery]=useState('');
     const [toggleEdit,setToggleEdit]=useState(false);
     const [editContactData, setEditContactData] = useState(null); // Store contact being edited
     const [editIndex, setEditIndex] = useState(null); // Store index of the contact being edited
   
   
     // console.log(searchQuery);
     const handleRemove=(id)=>{
       const filter=tasks.filter((elem,index)=>index!=id)
       console.log(filter)
       setTasks(filter)
       setToggleEdit(false);
       setEditContactData(null);
     }
     const handleEdit = (task) => {
      setIsFromActive(true);
      setToggleEdit(true);
      setEditContactData(task); // Assuming you have a state for this
    };
    
     const handlePlus=()=>{
       setIsFromActive(true);
       setToggleEdit(false);
       setEditContactData(null);
     }
     const filteredTasks=tasks.filter((item)=>{
       return item.data().title.toLowerCase().includes(searchQuery.toLowerCase())
       
     })
     
     return (
       <div className=" container max-w-[420px] h-screen overflow-scroll scrollbar-hide mx-auto relative">
         <Navbar />
         <div className="py-4 flex items-center gap-2 ">
           <div className="relative flex items-center flex-grow">
             <IoMdSearch className=" absolute text-2xl font-semibold text-white ml-2"/>
             <input
               type="text"
               value={searchQuery}
               onChange={(e)=>setSearchQuery(e.target.value)}
               placeholder="Search Contact"
               className="bg-transparent border-2 flex-grow border-white h-10 w-full rounded-md placeholder: pl-10 text-1xl outline-none text-white"
             />
           </div>
           <FaCirclePlus onClick={handlePlus} className="text-5xl cursor-pointer text-white"/>
         </div>
         <Contacts isFromActive={isFromActive} tasks={filteredTasks} setEditContactData={setEditContactData} setToggleEdit={setToggleEdit} setIsFromActive={setIsFromActive} handleEdit={handleEdit}  handleRemove={handleRemove}/>
         <Form isFromActive={isFromActive} setIsFromActive={setIsFromActive} toggleEdit={toggleEdit} editContactData={editContactData}/>
         
       </div>
     );
}

export default Home
