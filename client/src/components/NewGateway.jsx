import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CreateGateway } from "../utils/api.js";

//Utils
import { notifyError } from "../utils/messages";
import { ToastContainer } from 'react-toastify';


//Icons
import {AiOutlineSave} from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";

const NewGateway = () => {
    const [uid, setUid] = useState('');
    const [name, setName] = useState('');
    const [ipv4, setIpv4] = useState('');

    const navigate = useNavigate();

    const handleSubmit= async (e) => {
        e.preventDefault();
      
            //Create the new gateway and return home
            try {
                await CreateGateway(uid,name,ipv4)
                
                navigate('/')
            } catch (error) {
                console.log(error);
                notifyError(error.response.data.message)
            }
            }
            //Return Home
       
   
  return (
    <div className="flex justify-center  text-white ">
        <ToastContainer />
         <div className="text-center py-4 bg-black w-[400px] pt-40 ">

            <div className='pb-4'>
                <h1 className=" text-2xl font-semibold text-gray-900 dark:text-white">
                New Gateway
                </h1>
            </div>

            <div className="p-4 w-[400px] text-left bg-white rounded-lg border shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                <form onSubmit={handleSubmit}>
                    <p>UID</p>
                    <input type="text" className='w-full rounded text-black'onChange={(e)=>{setUid(e.target.value)}}/>
                    <p className='pt-2 '>Name</p>
                    <input type="text" className=' w-full rounded text-black' onChange={(e)=>{setName(e.target.value)}}/>
                    <p className='pt-2'>Ipv4 Address</p>
                    <input type="text" className=' w-full rounded text-black' onChange={(e)=>{setIpv4(e.target.value)}}/>
                    <div className='flex justify-between my-2'>
                    <span onClick={()=>{navigate('/')}} className="flex bg-blue-700 w-[90px] mt-2 justify-center rounded font-bold cursor-pointer "><MdArrowBack className="mr-2 mt-1"/> BACK</span>
                    <button type="submit" className="flex bg-green-700 w-[90px] mt-2 justify-center rounded font-bold cursor-pointer "><AiOutlineSave className="mr-2 mt-1"/> SAVE</button>
                        
                    </div>

                </form>
                
            </div>

         </div>
    </div>
  )
}

export default NewGateway