import React, { useEffect, useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import '../css/signup.css'
import { toast } from "react-toastify";
const Signup = () => {
    const navigate=useNavigate();
    const [email, setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPassword, setShowPassword]=useState(false);
    const firebase=useFirebase();
    useEffect(()=>{
      if(firebase.isLoggedIn){
        navigate("/home");
      }
    },[firebase,navigate])
    
    // const createUser = () => {
    //     createUserWithEmailAndPassword(auth, email, password)
    //       .then((value) => {
    //         toast.success("Account created successfully!");
    //         navigate("/home")
    //       })
    //       .catch((err) => {
    //         // Handle specific Firebase errors
    //         switch (err.code) {
    //           case "auth/email-already-in-use":
    //             toast.error("Email already in use.");
    //             break;
    //           case "auth/invalid-email":
    //             toast.error("Invalid Email");
    //             break;
    //           case "auth/weak-password":
    //             toast.warning("Weak Password");
    //             break;
    //           default:
    //             toast.error("An error occurred. Please try again.");
    //         }
    //       });
    //   };
      
    const handleEyeButton=()=>{
        setShowPassword(!showPassword);
    }
    const handleSubmit =async (e) => {
        e.preventDefault();
        await firebase.signUpWithEmailAndPassword(email,password)
      };
      
    
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(login_bg.jpg)",
      }}
      className="w-full h-screen bg-center bg-no-repeat bg-cover flex justify-center items-center"
    >
      <div className="signup-container w-96 h-[25rem] bg-white rounded-lg">
        <div className="w-full h-1/4 rounded-t-lg bg-[#dada]">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <IoPersonCircleSharp className="text-5xl" />
            <h2 className="font-semibold text-2xl">Sign Up</h2>
          </div>
          <div className="px-10 pt-3">
            <form action="" onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex flex-col">
                <label className="mb-2 text-gray-800" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="px-4 py-2 rounded-md outline-blue-400 border-2 border-gray-400"
                  placeholder="Email"
                  required
                  onChange={(event=>setEmail(event.target.value))}
                  value={email}
                />
              </div>
              <div className="relative flex flex-col">
                <label className="mt-3 mb-2 text-gray-800" htmlFor="password">
                  Password
                </label>
                <input
                  type={showPassword ? "text":"password"}
                  id="password"
                  className="px-4 py-2 rounded-md relative outline-blue-400 border-2 border-gray-400"
                  placeholder="Password"
                  required
                  onChange={event=>setPassword(event.target.value)}
                  value={password}
                />
                <span onClick={handleEyeButton} className="absolute right-8 bottom-[30px]">
                  {showPassword ? <IoEyeOffOutline className="absolute cursor-pointer text-[18px]" /> : <IoEyeOutline className="absolute cursor-pointer text-[18px]" />}
                </span>
              </div>
              <input
                className="w-full py-2 rounded-md mt-5 bg-blue-600 cursor-pointer text-white"
                type="submit"
                value="Create Account"
              />
            </form>
            <p className="text-center pt-4 text-sm">Already have a account? <Link to={"/login"} className="text-green-500 font-medium cursor-pointer">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
