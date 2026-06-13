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

import { formatCurrency } from "utils/formatCurrency";

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
    console.log('withdraw_number', id)
    if(id){
      getDetailwithdraws(id)
      console.log('withdraws', withdraws)
    }

  }, [userInfo, id])

  const getDetailwithdraws = async (id) => {
    try {
      const { data: orgz_cash_flows, error } = await supabase
                        .from('orgz_cash_flows')
                        .select('id, withdraw_number,last_balance,last_debit,total_debit,request_withdraw,transfer_eviden,is_complete,admin_fee')
                        .eq('orgz_id', ORGZ_ID)
                        .eq('id', id)
                        .is('deleted_at', null)
                        .single()
                                        // const order = orgz_orders.map(order => ({order_status: order.order_status, total_price: order.total_price, total_amount: order.total_amount, total_discount: order.total_discount, promo_code: order.promo_code, products: order.orgz_order_details, users: order.orgz_users, participants: order.orgz_order_participants, packet_name: order.orgz_packets.name}))
                                        console.log('order>', orgz_cash_flows)
      if(orgz_cash_flows){
        setwithdraws(orgz_cash_flows)

      }

    } catch (error) {

    }
  }

  // const getCurrentBalance = async () => {
	// 	try {

	// 		let { data: orgz_orders, error } = await supabase
	// 																					.from('orgz_orders')
	// 																					.select(`
	// 																						total_price.sum(),
	// 																						orgz_identities (
	// 																							orgz_status
	// 																						)
	// 																					`)
	// 																					.eq('order_status', 'successed')
	// 																					.eq('orgz_identities.orgz_status', 'live')
	// 																					.eq('orgz_id', orgzId??ORGZ_ID)
	// 																					.is('deleted_at', null)
	// 																					.single()

	// 		if(orgz_orders){
  //       withdraws.last_balance = orgz_orders.sum
	// 			// setCurrentBalance(orgz_orders.sum)
	// 		}

	// 	} catch (error) {
	// 		toast.error('Failed, Failed when get current balance')
	// 	}
	// }

  const getUsers = async () => {
    const { data, error } = await supabase
                                  .from('orgz_users')
                                  .select('*')
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
              <h6 className="text-blueGray-700 text-xl font-bold">Penarikan #{withdraws.withdraw_number} </h6>
              <span className={`font-semibold ${withdraws.is_complete === true? 'bg-green-400' : withdraws.is_complete === false? 'bg-red-400': 'bg-yellow-400' } px-3 py-2 rounded-md`}>{withdraws.is_complete? 'COMPLETE' : 'PENDING'} </span>
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
                      Jumlah Penarikan
                    </label>
                    <span className="text-base text-gray-700"> {`${formatCurrency(withdraws.request_withdraw, 'IDR')}`} </span>
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
                      Saldo Terakhir
                    </label>
                    <span className="text-base text-gray-700"> {`${formatCurrency(withdraws.last_balance, 'IDR')}`} </span>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Biaya Platform
                    </label>
                    <span className="text-base text-gray-700"> {`${formatCurrency(withdraws.admin_fee, 'IDR')}`}
                    </span>
                    {/* <span className={`${withdraws.order_status ==='successed'? 'bg-green-400' : withdraws.order_status ==='failed'? 'bg-red-400': 'bg-yellow-400' } ml-2 px-3 py-2 rounded-md`}>{`${withdraws.order_status ==='successed'? <CheckCircleIcon className="w-5 bg-inherit" /> : withdraws.order_status ==='failed'?<CheckCircleIcon className="w-5 bg-inherit" /> : ''}`} </span> */}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Total Penarikan
                    </label>
                    <span className="text-base text-gray-700"> {`${formatCurrency(withdraws.total_debit, 'IDR')}`} </span>
                  </div>
                </div>
                {/* <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Biaya Tambahan (Biaya Admin)
                    </label>
                    <span className="text-base text-gray-700"> {withdraws.admin_fee} </span>
                  </div>
                </div> */}
                {/* <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Paket
                    </label>
                    <span className="text-base text-gray-700"> {withdraws.orgz_packets && withdraws.orgz_packets.name} </span>
                  </div>
                </div> */}
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
