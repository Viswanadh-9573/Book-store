
import React, { useContext, useState } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Link} from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
const Signup = () => {
  const { navigate,axios } = useContext(AppContext);
  const[formData, setFormdata]= useState({
    name:"",
     email:"",
     password:"",
  });
  const handleChange=(e)=>{
    setFormdata({...formData,[e.target.name]:e.target.value});
  }
  const handleSubmit = async (e)=>{
     e.preventDefault();
      try {
           const {data} = await axios.post('/user/signUp', formData);
            if(data.success){  
              toast.success(data.message);
              navigate('/login');
            }
            else{
              toast.error(data.message);
            }
      } catch (error) {
        toast.error("Something went wrong");
      }
  }
  return (
    <div className=' flex items-center justify-center h-screen' style={{ backgroundColor: '#111e5c' }}>
          <form  onSubmit={handleSubmit}  className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
          <h1 className="text-gray-900 text-3xl mt-10 font-medium">Sign up</h1>
          <p className="text-gray-500 text-sm mt-2">Please sign up to continue</p>

          <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <TbLockPassword className='w-5 h-5' />

              <input type="text" name='name' onChange={handleChange} value={formData.name} placeholder="Name" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
          </div>

          <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <MdOutlineEmail className='w-5 h-5'/>
              <input type="email"  name='email' onChange={handleChange} value={formData.email}  placeholder="Email " className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
          </div>
      
          <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <TbLockPassword className='w-5 h-5' />

              <input type="password" name='password' onChange={handleChange} value={formData.password} placeholder="Password" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
          </div>
          
          
      
          <button type="submit" className="mt-2 w-full h-11 rounded-full text-white transition-opacity" style={{ backgroundColor: '#111e5c' }} onMouseEnter={(e) => e.target.style.opacity = '0.9'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
            Sign up
          </button>
          <p className="text-gray-500 text-sm mt-3 mb-11">already have an account? <Link to={"/login"} className="text-indigo-500">login</Link></p>
      </form>
    </div>
  )
}

export default Signup
