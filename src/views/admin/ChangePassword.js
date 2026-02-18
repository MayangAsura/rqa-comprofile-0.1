import React from "react";
import { useState } from "react";
import {useSelector} from 'react-redux'

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import { Eye } from "react-ionicons";
import md5 from "md5";
import supabase from "configs/supabase";
import { toast } from "react-toastify";

export default function ChangePassword() {

  const {userInfo} = useSelector(state => state.authReducer)
  const [isOpen, setOpen] = useState(false)
  const [data, setData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  })
  const handleFormData = (input, value) => {
    if(input && value){
      setData({...data, [input]: value})
    }
  }
  const changePassword = async () => {
    if(data.old_password && data.new_password && data.confirm_password){
      const hashed_password = md5(data.new_password)


      const { data, error } = await supabase
                              .from('orgz_users')
                              .update({ hashed_password: hashed_password })
                              .eq('email', userInfo.username)
                              .eq('is_active', true)
                              .eq('deleted_at', null)
                              .select()
      if(data){
        toast('Alhamdulillah, update password berhasil.')
      }else{
        toast(`Afwan, update password gagal: ${error}`)
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
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="lucky.jesse"
                        onClick={(e) => handleFormData('old_password', e.target.value)}
                      />
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
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="*****"
                        onClick={(e) => handleFormData('new_password', e.target.value)}
                      />
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
                      <input
                        type={isOpen?'text':'password'}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="******"
                        onClick={(e) => handleFormData('confirm_password', e.target.value)}
                      />
                      {/* <button type='button'> */}
                        <Eye className='w-5' onClick={() => setOpen(true)} />
                      {/* </button> */}
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

              </form>
            </div>
          </div>
        </div>
        {/* <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div> */}
      </div>
    </>
  );
}
 