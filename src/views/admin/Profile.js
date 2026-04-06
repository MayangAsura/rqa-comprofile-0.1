import React from "react";
import { useState, useEffect } from "react";
import {useSelector} from 'react-redux'

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import supabase from "configs/supabase";
import { toast } from "react-toastify";

import { Id } from "utils/auth/users";

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID

export default function Profile() {

  const {userInfo, userEmail, orgzId} = useSelector(state => state.authReducer)
  const [users, setUsers] = useState({full_name: '', email: '', password: '', phone_number: '', job: '', avatar: '', is_active: false})

  const username = 'admin-rqa@gmail.com'

  useEffect(() => {
    getUsers()
    if(!userInfo){
      console.log('users', users)
    }
  }, [userInfo])

  const getUsers = async () => {
    const { data: orgz_users, error } = await supabase
                                  .from('orgz_users')
                                  .select('*')
                                  .eq('email', username || userEmail)
                                  .eq('is_active', true)
                                  .is('deleted_at', null)
                                  .single()
    // userInfo.username
    if(orgz_users){
      setUsers({full_name: orgz_users.full_name, email: orgz_users.email, password: orgz_users.password, phone_number: orgz_users.phone_number, job: orgz_users.phone_number, avatar: orgz_users.avatar, is_active: orgz_users.is_active})

    }else{
      toast('Error get data from server: ' + error)
    }

  }

  const handleFormInput = async (attr, value) => {
    if(value){
      console.log(value)
      toast('toast', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: 'Bounce',
        })
      if(attr == 'avatar'){

        console.log(value)
        const path = `/profiles/${orgzId || ORGZ_ID}/${orgzId || ORGZ_ID}-`
        const file_name = value.name

        await supabase.storage.from('backpage').upload(path + file_name, value, {
          contentType: 'image/jpeg',
          upsert: true
        })

        const { data } = supabase.storage.from('backpage').getPublicUrl(path + file_name)
        console.log(data.publicUrl)

        setUsers({...users, [attr]: data.publicUrl})
      }else{
        setUsers({...users, [attr]: value})
      }

    }
  }

  const updateUsers = async () => {
    if(users){
        const { data: orgz_users, error } = await supabase
                                    .from('orgz_users')
                                    .update({...users, updated_at: new Date().toISOString(), updated_by: Id})
                                    .eq('email', username)
                                    .eq('is_active', true)
                                    .is('deleted_at', null)
                                    .single()
      if(orgz_users){
        setUsers({full_name: orgz_users.full_name, email: orgz_users.email, password: orgz_users.password, phone_number: orgz_users.phone_number, job: orgz_users.phone_number, avatar: orgz_users.avatar, is_active: orgz_users.is_active})
        toast('Update data akun berhasil!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: 'Bounce',
        })
      }else{
        toast('Error update data to server: ' + error)
      }
    }
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">Update Profile</h6>
              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => updateUsers()}
              >
                Update
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            {/* <div className="w-full flex justify-between lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
              <div className="items-end py-6 px-3 mt-32 sm:mt-0">
                <button
                  className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => updateUsers()}
                >
                  Update
                </button>
              </div>
            </div> */}
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
                      Nama
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Hasan Al Bashri"
                      value={users.full_name || ''}
                      onChange={(e) => handleFormInput('full_name', e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="admin@mail.com"
                      value={users.email || ''}
                      onChange={(e) => handleFormInput('email', e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      No. WhatsApp
                    </label>
                    <input
                      type='text'
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="084321876509"
                      value={users.phone_number || ''}
                      onChange={(e) => handleFormInput('password', e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Pekerjaan/Kegiatan
                    </label>
                    <input
                      type='text'
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Swasta"
                      value={users.job || ''}
                      onChange={(e) => handleFormInput('job', e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                      >
                      Foto
                    </label>
                    {users.avatar?(
                      <img src={users.avatar} className="rounded-md shadow-sm mb-5" width="30%" alt="admin avatar" />
                    ):''}

                    <input
                      type='file'
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={(e) => handleFormInput('avatar',e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Non Aktifkan Akun?
                    </label>
                    <label for="toggle-example-checked" className="flex items-center cursor-pointer relative">
                      <input type="checkbox" id="toggle-example-checked" class="sr-only" checked={users.is_active} />
                      <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
                      {/* <span class="ml-3 text-gray-900 text-sm font-medium"> (checked)</span> */}
                    </label>
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />

            </form>
          </div>
          </div>
        </div>
      </div>
      {/* <Navbar transparent /> */}
      {/* <main className="profile-page">
        <section className="relative py-16 bg-blueGray-200"> */}

          {/* <div className="container mx-auto px-4"> */}
            {/* <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"> */}
            {/* <div className="w-full px-6">
            </div> */}
          {/* </div> */}
        {/* </section>
      </main> */}
      {/* <Footer /> */}
    </>
  );
}
