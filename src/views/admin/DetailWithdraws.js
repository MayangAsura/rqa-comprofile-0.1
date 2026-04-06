import React from "react";
import { useState, useEffect } from "react";
import {useSelector} from 'react-redux'

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import supabase from "configs/supabase";
import { toast } from "react-toastify";

import { Id } from "utils/auth/users";
import { useParams } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID

export default function Detailwithdraws() {

  const {userInfo, orgzId} = useSelector(state => state.authReducer)
  const [users, setUsers] = useState({full_name: '', email: '', phone_number: '', job: '', avatar: ''})
  const [withdraws, setwithdraws] = useState({})
  const { id } = useParams()
  const username = 'admin-rqa@gmail.com'

  useEffect(() => {
    if(userInfo){
      getUsers()
      console.log('users', users)
    }
    console.log('invoice_number', id)
    if(id){
      getDetailwithdraws(id)
      console.log('withdraws', withdraws)
    }
  }, [userInfo, id])

  const getDetailwithdraws = async (id) => {
    try {
      let { data: orgz_orders, error } = await supabase
                                        .from('orgz_orders')
                                        .select(`
                                          orgz_id,
                                          order_status,
                                          invoice_number,
                                          total_price,
                                          total_amount,
                                          total_discount,
                                          promo_code,
                                          admin_fee,
                                          orgz_order_details (
                                            orgz_products (
                                              id,
                                              title
                                            ),
                                            price,
                                            promo_code,
                                            amount,
                                            seed_amount,
                                            discount,
                                            discount_nominal
                                          ),
                                          orgz_packets (
                                            name
                                          ),
                                          orgz_users (
                                            full_name,
                                            phone_number,
                                            domicile,
                                            job
                                          ),
                                          orgz_order_participants (
                                            orgz_user_id,
                                            full_name
                                          )
                                        `)
                                        .eq('invoice_number', id)
                                        .single()
                                        // const order = orgz_orders.map(order => ({order_status: order.order_status, total_price: order.total_price, total_amount: order.total_amount, total_discount: order.total_discount, promo_code: order.promo_code, products: order.orgz_order_details, users: order.orgz_users, participants: order.orgz_order_participants, packet_name: order.orgz_packets.name}))
                                        console.log('order>', orgz_orders)
      if(orgz_orders){
        setwithdraws(orgz_orders)

      }

    } catch (error) {

    }
  }

  const getUsers = async () => {
    const { data, error } = await supabase
                                  .from('orgz_users')
                                  .select('*, orgz_users ')
                                  .eq('email', 'admin-rqa@gmail.com')
                                  .eq('is_active', true)
                                  .is('deleted_at', null)
                                  .single()
    // userInfo.username
    if(data){
      // setUsers(data.map(item => ({full_name: item.full_name, email: item.email, password: item.password, phone_number: item.phone_number, job: item.phone_number, avatar: item.avatar})))

    }else{
      toast('Error get data from server: ' + error)
    }

  }

  const handleFormInput = async (attr, value) => {
    if(value){
      if(attr == 'avatar'){

        console.log(value)
        const path = `/profiles/${orgzId || ORGZ_ID}-`
        const file_name = value.file_name

        await supabase.storage.from('backpage').upload(path + file_name, value, {
          contentType: 'image/jpeg',
          upsert: true
        })

        const { data } = supabase.storage.from('backpage').getPublicUrl(path + file_name)
        console.log(data.publicUrl)

        setUsers({...users, [attr]: data})
      }else{
        setUsers({...users, [attr]: value})
      }

    }
  }

  const updateUsers = async () => {
    if(users){
        const { data, error } = await supabase
                                    .from('orgz_users')
                                    .update({...users, updated_at: new Date().toISOString(), updated_by: Id})
                                    .eq('email', username)
                                    .eq('is_active', true)
                                    .is('deleted_at', null)
                                    .single()
      if(data){
        // setUsers(data.map(item => ({full_name: item.full_name, email: item.email, password: item.password, phone_number: item.phone_number, job: item.phone_number, avatar: item.avatar})))
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
              <h6 className="text-blueGray-700 text-xl font-bold">Transaksi #{withdraws.invoice_number} </h6>
              <span className={`${withdraws.order_status ==='successed'? 'bg-green-400' : withdraws.order_status ==='failed'? 'bg-red-400': 'bg-yellow-400' } px-3 py-2 rounded-md`}>{withdraws.order_status} </span>
              {/* <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => updateUsers()}
              >
                Update
              </button> */}
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0 mt-3">
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
                      Total Bayar
                    </label>
                    <span className="text-base text-gray-700"> {withdraws.total_price} </span>
                    {/* <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="admin@mail.com"
                      value={users.email || ''}
                      onChange={(e) => handleFormInput('email', e.target.value)}
                    /> */}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Jumlah Produk
                    </label>
                    <span className="text-base text-gray-700"> {withdraws.total_amount} </span>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Kode Promo
                    </label>
                    <span className="text-base text-gray-700"> {withdraws.promo_code}
                    </span>
                    <span className={`${withdraws.order_status ==='successed'? 'bg-green-400' : withdraws.order_status ==='failed'? 'bg-red-400': 'bg-yellow-400' } ml-2 px-3 py-2 rounded-md`}>{`${withdraws.order_status ==='successed'? <CheckCircleIcon className="w-5 bg-inherit" /> : withdraws.order_status ==='failed'?<CheckCircleIcon className="w-5 bg-inherit" /> : ''}`} </span>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Diskon
                    </label>
                    <span className="text-base text-gray-700"> {withdraws.total_discount} </span>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Biaya Tambahan (Biaya Admin)
                    </label>
                    <span className="text-base text-gray-700"> {withdraws.admin_fee} </span>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Paket
                    </label>
                    <span className="text-base text-gray-700"> {withdraws.orgz_packets && withdraws.orgz_packets.name} </span>
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />

            </form>
          </div>
          </div>
          <div className="relative flex flex-col  min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="flex-auto bg-white px-4 lg:px-10 py-10 pt-0">
              <h2 className="my-10">
                Informasi Produk <hr className="mt-6 border-b-1 border-blueGray-300" />
              </h2>
              <div className="mt-10">
                  {
                      withdraws.orgz_order_details && withdraws.orgz_order_details.length > 0 && (
                        <>
                          {/* <ul className='mb-8'> */}
                              {withdraws.orgz_order_details.map ((product, key) => (
                                  <div key={key+1} className='flex flex-col text-xl mb-2 p-2 '>
                                    <p>{key+1}. {product.orgz_products.title}</p>
                                    <div className="px-3 py-2 m-2">
                                      <div className='flex justify-between text-center' >
                                        <span className="text-base text-gray-600"> Harga </span>
                                        {/* <span className="text-base text-gray-600"> : </span> */}
                                        <span className="items-end text-base text-gray-500"> {product.price} </span>
                                      </div>
                                      <div className='flex justify-between items-center' >
                                        <span className="text-base text-gray-600"> Kode Promo </span>
                                        {/* <span className="text-base text-gray-600"> : </span> */}
                                        <span className="items-end text-base text-gray-500"> {product.promo_code} </span>
                                      </div>
                                      <div className='flex justify-between items-center' >
                                        <span className="text-base text-gray-600"> Jumlah</span>
                                        {/* <span className="text-base text-gray-600"> : </span> */}
                                        <span className="items-end text-base text-gray-500"> {product.amount} </span>
                                      </div>
                                      <div className='flex justify-between items-center' >
                                        <span className="text-base text-gray-600"> Diskon</span>
                                        {/* <span className="text-base text-gray-600"> : </span> */}
                                        <span className="items-end text-base text-gray-500"> {product.discount} </span>
                                      </div>
                                      <div className='flex justify-between items-center' >
                                        <span className="text-base text-gray-600"> Diskon Nominal</span>
                                        {/* <span className="text-base text-gray-600"> : </span> */}
                                        <span className="items-end text-base text-gray-500"> {product.discount_nominal} </span>
                                      </div>

                                    </div>
                                  </div>
                              ))}
                          {/* </ul> */}
                        </>
                      )
                  }

              </div>
            </div>
          </div>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="flex-auto bg-white px-4 lg:px-10 py-10 pt-0">
               <h2 className="my-10">
                Informasi Pendaftar <hr className="mt-6 border-b-1 border-blueGray-300" />
              </h2>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nomor Telepon
                    </label>
                    <span className="text-base text-gray-700"> {withdraws.orgz_users && withdraws.orgz_users.phone_number} </span>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Domisili
                    </label>
                    <span className="text-base text-gray-700"> {withdraws.orgz_users && withdraws.orgz_users.domicile} </span>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Pekerjaan
                    </label>
                    <span className="text-base text-gray-700"> {withdraws.orgz_users && withdraws.orgz_users.job || ''} </span>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Daftar Peserta
                    </label>
                    {
                        withdraws.orgz_order_participants && withdraws.orgz_order_participants.length > 0 && (
                          <>
                            {/* <ul className='mb-8'> */}
                                {withdraws.orgz_order_participants.map ((user, key) => (
                                    <div key={key+1} className='flex justify-between items-center text-xl mb-2 p-2 '>
                                      {key+1}. {user.full_name}
                                    </div>
                                ))}
                            {/* </ul> */}
                          </>
                        )
                    }

                  </div>

                </div>
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
