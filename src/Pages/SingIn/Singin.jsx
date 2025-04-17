import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import image from "../../../public/image.jpg"
import './singin.css'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { Link, useNavigate } from 'react-router';



function Singin() {
    const auth = getAuth();
    const db = getDatabase();
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo]= useState({
        email: "",
        password: ""      
    })

    
    const handleLoginInfo = (event)=>{
        const {name , value}= event.target;
        setLoginInfo({
            ...loginInfo,
             [name]:value,
        });
    };

    const halndlePrevent = (event)=>{
        event.preventDefault();
    }
    
    // handleBtn login
    const handleBtn = ()=>{
        const {email, password} = loginInfo;
        signInWithEmailAndPassword(auth, email,password).then((info)=>{
            navigate("/");
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }

    // handleGoogle
    const handleGoogle = ()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((userInfo)=>{
            const userdb = ref(db, "users/");
                      set(push(userdb), {
                        userid: userInfo?.user?.uid,
                        username: userInfo?.user?.displayName,
                        email: userInfo?.user?.email,
                        profile_picture : userInfo?.user?.photoURL || 'https://images.pexels.com/photos/9072343/pexels-photo-9072343.jpeg?auto=compress&cs=tinysrgb&w=600'
                      });
            
        }).then(()=>{
          navigate("/")
        })
        .catch((err)=>{
            console.error("fix it error")
        })
    }

      return (
    <div className="flex bg-image">
  {/* Left Side (Login Section) */}
  <div className="h-screen w-1/2 flex justify-center items-center">
    <div className="w-[%] max-w-md"> 
      <h1 className="text-2xl font-bold text-center text-white">Login to your account!</h1>
      <div className="flex items-center justify-center cursor-pointer text-white text-center mt-2 px-0 py-2 border rounded-2xl" onClick={handleGoogle}>
        <span className='text-2xl pr-2'> <FcGoogle /></span>
      <p >Login with Google
      </p>
      </div>

      {/* Form */}
      <form action="#" className="mt-6" onSubmit={halndlePrevent}>
        <div className="flex flex-col gap-y-4">
          {/* Email */}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="text-left text-white">Email Address</label>
            <input type="email" name="email" value={loginInfo.email} onChange={handleLoginInfo} placeholder="example@email.com" 
              className="py-2 px-3 border-b border-gray-600 focus:outline-none focus:bg-neutral-500 focus:text-white w-full text-blue-500" />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="password" className="text-left text-white">Password</label>
            <input type="password" name="password" value={loginInfo.password} onChange={handleLoginInfo} placeholder="Enter your password" 
              className="py-2 px-3 border-b border-gray-400 focus:outline-none focus:bg-neutral-500 focus:text-white w-full text-white" />
          </div>

          {/* Submit Button */}
          <button type="submit" className="mt-4 py-2 bg-blue-500 text-white w-full rounded-md cursor-pointer" onClick={handleBtn}>
          Login to Continue
          </button>
        </div>
        <p className='text-white py-5'>Don’t have an account ? <Link className='text-[#EA6C00] text-lg font-bold'to={'/singup'}>Sign up</Link></p>
      </form>
    </div>
  </div>

  {/* Right Side (Second Section) */}
  <div className=" w-1/2 flex justify-center items-center">
    <img className='w-full h-full object-cover' src={image} alt="Pexels Image" />
  </div>
</div>

  )
}

export default Singin