import React from "react";
import { useState, useEffect } from "react";
import {useSelector} from 'react-redux'

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import { Eye, EyeOff, EyeOutline } from "react-ionicons";
import md5 from "md5";
import supabase from "configs/supabase";
import { Bounce, toast, ToastContainer, Zoom } from "react-toastify";

export default function ChangePassword() {

  const {userInfo, userEmail} = useSelector(state => state.authReducer)
  const [isOldPasswordOpen, setOldPasswordOpen] = useState(false)
  const [isNewPasswordOpen, setNewPasswordOpen] = useState(false)
  const [isConfirmPasswordOpen, setConfirmPasswordOpen] = useState(false)
  const [message_error, setMessageError] = useState("")
  const [data, setData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  })

  useEffect(() => {
    if(data.confirm_password !== data.new_password){
      setMessageError('Password dan konfirmasi password tidak sama')
    }else{
      setMessageError("")
    }
  }, [data.confirm_password])

  // const handleVisibility = () => setOpen(value => !value)

  const handleFormData = (input, value) => {

    console.log(input, data.new_password,value)
    if(input && value){
      setData({...data, [input]: value})
    }
    // if(input === 'confirm_password' && value === data.new_password){
    //   setMessageError('')
    // }
  }

  const changePassword = async () => {
    if(data.old_password && data.new_password && data.confirm_password && !message_error){
      const hashed_password = md5(data.new_password)
      const hashed_old_password = md5(data.old_password)
      console.log(data, hashed_password)

      const { data: orgz_users, error } = await supabase
                              .from('orgz_users')
                              .select()
                              .eq('email', userEmail || 'admin-rqa@gmail.com')
                              .eq('password', hashed_old_password)
                              .eq('is_active', true)
                              .is('deleted_at', null)
      if(!orgz_users){
        toast.error(`Afwan, Password lama tidak sesuai.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom
        })
      }else{
        const { data: orgz_users_ou, error_ou } = await supabase
                                .from('orgz_users')
                                .update({ hashed_password: hashed_password, updated_at: new Date().toISOString() })
                                .eq('email', userEmail || 'admin-rqa@gmail.com')
                                // .eq('password', userEmail || 'admin-rqa@gmail.com')
                                .eq('is_active', true)
                                .is('deleted_at', null)
                                .select()
        if(orgz_users_ou){
          toast.success('Alhamdulillah, update password berhasil.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom
          })
        }else{
          toast.error(`Afwan, update password gagal: ${error}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom
          })
        }

      }



    }
  }
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          {/* lg:w-8/12 */}
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">Update Password</h6>
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => changePassword()}
                >
                  Update
                </button>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                {/* <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  User Information
                </h6> */}
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password Lama
                      </label>
                      <div className='relative items-center text-center'>
                        <input
                          type={isOldPasswordOpen?'text':'password'}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="******"
                          onChange={(e) => handleFormData('old_password', e.target.value)}
                        />
                          {isOldPasswordOpen? (
                            <Eye className='absolute w-5 inset-y-0 end-0 z-20 flex items-center text-center mr-2' onClick={() => setOldPasswordOpen(false)} />
                          ): (
                            <EyeOff className='absolute w-5 inset-y-0 end-0 z-20 flex items-center text-center mr-2' onClick={() => setOldPasswordOpen(true)} />
                          )}

                      </div>

                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password Baru
                      </label>
                      <div className='relative items-center text-center'>
                        <input
                          type={isNewPasswordOpen?'text':'password'}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="******"
                          onChange={(e) => handleFormData('new_password', e.target.value)}
                        />
                          {isNewPasswordOpen? (
                            <Eye className='absolute w-5 inset-y-0 end-0 z-20 flex items-center text-center mr-2' onClick={() => setNewPasswordOpen(false)} />
                          ): (
                            <EyeOff className='absolute w-5 inset-y-0 end-0 z-20 flex items-center text-center mr-2' onClick={() => setNewPasswordOpen(true)} />
                          )}

                      </div>

                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Konfirmasi Password
                      </label>
                      <div className='relative items-center text-center'>
                        <input
                          type={isConfirmPasswordOpen?'text':'password'}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="******"
                          onChange={(e) => handleFormData('confirm_password', e.target.value)}
                        />
                          {isConfirmPasswordOpen? (
                            <Eye className='absolute w-5 inset-y-0 end-0 z-20 flex items-center text-center mr-2' onClick={() => setConfirmPasswordOpen(false)} />
                          ): (
                            <EyeOff className='absolute w-5 inset-y-0 end-0 z-20 flex items-center text-center mr-2' onClick={() => setConfirmPasswordOpen(true)} />
                          )}

                      </div>
                      {data.confirm_password && message_error && (
                        <span className='text-red-400 text-sm'>{message_error} </span>
                      )}

                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
        {/* <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div> */}
      </div>
    </>
  );
}
