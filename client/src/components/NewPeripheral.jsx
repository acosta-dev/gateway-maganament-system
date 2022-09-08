import { React, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import  Axios  from 'axios';

// Utils
import { notifyError } from "../utils/messages";
import { ToastContainer } from 'react-toastify';

// Icons
import {AiOutlineSave} from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";

const NewPeripheral = () => {
    let { gateway } = useParams()
    const [uid, setUid] = useState();
    const [vendor, setVendor] = useState();
    const [status, setStatus] = useState(true);
    const navigate = useNavigate();

    const handleSubmit= async (e) => {
        e.preventDefault();
        try {
            await Axios.post("http://localhost:5000/peripherals/",{uid:uid,vendor:vendor,status:status,gateway:gateway})
            navigate(-1);
        } catch (error) {
            notifyError(error.response.data.message)
        }
    }
  return (
    
         <div className="flex justify-center  text-white ">
             <ToastContainer />
        <ToastContainer />
         <div className="text-center py-4 bg-black w-[400px] pt-40 ">

            <div className='pb-4'>
                <h1 className=" text-2xl font-semibold text-gray-900 dark:text-white">
                New Peripheral
                </h1>
            </div>

            <div className="p-4 w-[400px] text-left bg-white rounded-lg border shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                <form onSubmit={handleSubmit}>
                    <p>UID</p>
                    <input type="text" className='w-full rounded text-black' onChange={(e)=>{setUid(e.target.value)}}/>
                    <p className='pt-2 '>Vendor</p>
                    <input type="text" className=' w-full rounded text-black' onChange={(e)=>{setVendor(e.target.value)}}/>
                    <p className='pt-2'>Status</p>
                    <div className='flex'>
                        <div className='flex'>
                        <input type="radio" id="html" name="actv" className='text-white ' defaultChecked onChange={(e)=>{setStatus(true)}}/>
                        <p className='ml-2'>Active</p>
                        </div>
                        <div className='flex ml-4'>
                        <input type="radio" id="html" name="actv" className='text-white' onChange={(e)=>{setStatus(false)}}/>
                        <p className='ml-2'>Inactive</p>
                        </div>
                    </div>
                        
                    <div className='flex justify-between my-2'>
                    <span onClick={()=>{navigate(-1)}} className="flex bg-blue-700 w-[90px] mt-2 justify-center rounded font-bold cursor-pointer "><MdArrowBack className="mr-2 mt-1"/> BACK</span>
                    <button type='submit' className="flex bg-green-700 w-[90px] mt-2 justify-center rounded font-bold cursor-pointer "><AiOutlineSave className="mr-2 mt-1"/> SAVE</button>
                        
                    </div>

                </form>
                
            </div>

         </div>
    </div>
    
  )
}

export default NewPeripheral