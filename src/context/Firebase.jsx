import { createContext, useContext, useState, useEffect } from "react";
import {initializeApp} from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"; 
import { getFirestore,collection,addDoc,getDocs,doc, getDoc,deleteDoc,updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";


const FirebaseContext=createContext(null);
const firebaseConfig = {
    apiKey: "AIzaSyCBEjmPhmkq_eCfaJ4Ww2khy95BIbPvaUw",
    authDomain: "task-app-e0162.firebaseapp.com",
    projectId: "task-app-e0162",
    storageBucket: "task-app-e0162.firebasestorage.app",
    messagingSenderId: "712399205977",
    appId: "1:712399205977:web:0bfee1a14d3eeaf3382348"
};

const FirebaseApp=initializeApp(firebaseConfig)

export const useFirebase =()=>useContext(FirebaseContext)

const firebaseAuth=getAuth(FirebaseApp);

const firestore=getFirestore(FirebaseApp);


export const FirebaseProvider = (props) => {
  const [user,setUser]=useState(null);
  useEffect(()=>{
    onAuthStateChanged(firebaseAuth, user =>{
      if(user) setUser(user);
      else setUser(null)
    })
  },[])
  const signUpWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((value) => {
        toast.success("Account created successfully!");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
            toast.error("Email already in use.");
            break;
          case "auth/invalid-email":
            toast.error("Invalid Email");
            break;
          case "auth/weak-password":
            toast.warning("Weak Password");
            break;
          default:
            toast.error("An error occurred. Please try again.");
        }
      });
  };

  const signInUserWithEmailAndPass = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((value) => {
        toast.success("Logged in successfully!");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/user-not-found":
            toast.error("No user found with this email.");
            break;
          case "auth/wrong-password":
            toast.error("Incorrect password.");
            break;
          case "auth/invalid-email":
            toast.error("Invalid email format.");
            break;
          default:
            toast.error("An error occurred. Please try again.");
        }
      });
  };
  console.log(user)
  const handleCreateNewTask=async (title, description)=>{
    return await addDoc(collection(firestore,"tasks"),{
      title,
      description,
      userID: user.uid,
      userEmail:user.email,
    });
  }
  const listAllTask=()=>{
    return getDocs(collection(firestore,"tasks"))
  }
  const handleDeleteTask = async (id) => {
    try {
      await deleteDoc(doc(firestore, "tasks", id)); // Delete the document from Firestore
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task. Please try again.");
    }
  };
  const handleUpdateTask = async (id, title, description) => {
    try {
      // Validate title and description
      if (!title || !description) {
        toast.error("Title and description cannot be empty.");
        return;
      }
  
      // Retrieve the document from the collection
      const taskSnap = await getDoc(doc(firestore, "tasks", id));
  
      // Check if the document exists
      if (taskSnap.exists()) {
        const taskRef = taskSnap.ref; // Get the document reference
        await updateDoc(taskRef, {
          title,
          description,
        });
        toast.success("Task updated successfully!");
      } else {
        console.error("Task not found:", id);
        toast.error("Task not found. Please try again.");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task. Please try again.");
    }
  };
  const isLoggedIn=user? true: false;

  return (
    <FirebaseContext.Provider
      value={{
        signUpWithEmailAndPassword,
        signInUserWithEmailAndPass,
        handleCreateNewTask,
        listAllTask,
        handleDeleteTask,
        handleUpdateTask,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};


