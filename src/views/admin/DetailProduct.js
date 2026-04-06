import React from "react";
import { useState, useEffect } from "react";
import {useSelector} from 'react-redux'

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import supabase from "configs/supabase";
import { toast } from "react-toastify";

import { Id } from "utils/auth/users";
import { useParams } from "react-router-dom";
import { StarIcon } from "flowbite-react";

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID

function getDefaultLocale(currencyCode) {
      const currencyLocaleMap = {
          USD: 'en-US',
          IDR: 'id-ID',
          EUR: 'de-DE',
          JPY: 'ja-JP',
          GBP: 'en-GB',
          CNY: 'zh-CN',
          AUD: 'en-AU'
      };

      return currencyLocaleMap[currencyCode] || 'en-US'; // fallback ke en-US
  }

  function formatCurrency(amount, currencyCode, locale = getDefaultLocale(currencyCode)) {
      return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currencyCode,
          maximumFractionDigits: 2
      }).format(amount);
  }
  
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export default function DetailProduct() {

  const {userInfo, orgzId} = useSelector(state => state.authReducer)
  const [users, setUsers] = useState({full_name: '', email: '', phone_number: '', job: '', avatar: ''})
  const [product, setProduct] = useState("")
  const { id } = useParams()
  const username = 'admin-rqa@gmail.com'

  useEffect(() => {
    if(userInfo){
      getUsers()
      console.log('users', users)
    }
    console.log('invoice_number', id)
    if(id){
      getDetailProduct()
      console.log('product', product)
    }
  }, [userInfo, id])

  const getDetailProduct = async () => {
    try {
      let { data: orgz_products, error } = await supabase
                                          .from('orgz_products')
                                          .select('type,title,slug,thumbnail,price,views,rating,subcategory_id,promote_text,description,orgz_programs(title),orgz_subcategory(name)')
                                          .single()
                                        // const order = orgz_orders.map(order => ({order_status: order.order_status, total_price: order.total_price, total_amount: order.total_amount, total_discount: order.total_discount, promo_code: order.promo_code, products: order.orgz_order_details, users: order.orgz_users, participants: order.orgz_order_participants, packet_name: order.orgz_packets.name}))
                                        // console.log('order>', order)
      if(orgz_products){
        setProduct(orgz_products)
      }else{
        toast('Error when get product detail.')
      }
      
    } catch (error) {
      toast('Error when get product detail.')
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
      setUsers(data.map(item => ({full_name: item.full_name, email: item.email, password: item.password, phone_number: item.phone_number, job: item.phone_number, avatar: item.avatar})))

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
        setUsers(data.map(item => ({full_name: item.full_name, email: item.email, password: item.password, phone_number: item.phone_number, job: item.phone_number, avatar: item.avatar})))
      }else{
        toast('Error update data to server: ' + error)
      }
    }
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-row gap-5 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="w-full lg:w-6/12 gap-2 bg-white rounded-md p-10">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Nama
                </label>
                <span className="text-base text-gray-700"> {product.title} </span>
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Slug
                </label>
                <a href={product.slug} className="text-base text-gray-700"> {product.slug} </a>
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Kategori
                </label>
                <span className="text-base text-gray-700"> {product.type} </span>
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Deskripsi
                </label>
                <span className="text-base text-gray-700"> {product.description} </span>
              </div>
            </div>
            <div className="w-full lg:w-6/12 bg-white rounded-md p-10">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Thumbnail
                </label>
                <img className="flex text-base text-gray-700 items-center" width="50%" src={product.thumbnail}/>
                {/* <input
                  type="email"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="admin@mail.com"
                  value={users.email || ''}
                  onChange={(e) => handleFormInput('email', e.target.value)}
                /> */}
              </div>
            </div>

          </div>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex">
              {/* <h6 className="text-blueGray-700 text-xl font-bold">{product.title} </h6> */}
              {/* <span className={`${product.order_status ==='successed'? 'bg-green-400' : product.order_status ==='failed'? 'bg-red-400': 'bg-yellow-400' }`}>{product.order_status} </span> */}
              {/* <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => updateUsers()}
              >
                Update
              </button> */}
              <hr className="mt-6 border-b-1 border-blueGray-300" /> Detail Produk
            </div>
          </div>
          <div className="flex-auto lg:px-10 py-10 pt-0">
              <div className="flex-auto w-full px-4 lg:px-10 py-10 pt-0">
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
                  <div className="flex flex-wrap mt-3">
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Views
                        </label>
                        <span className="text-base text-gray-700"> {product.views} </span>
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Rating
                        </label>
                        <div className="flex items-center">
                          <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                              key={rating}
                              aria-hidden="true"
                              className={classNames(
                                  product.rating > rating ? 'text-yellow-300' : 'text-gray-200',
                                  'size-5 shrink-0',
                              )}
                              />
                          ))}
                          </div>
                          {/* sr-only */}
                          <p className="">{product.rating} out of 5 stars</p>
                          {/* <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          {reviews.totalCount} reviews
                          </a> */}
                      </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Sub Kategori
                        </label>
                        <span className="text-base text-gray-700"> {product.orgz_subcategory && product.orgz_subcategory.name} </span>
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Harga
                        </label>
                        
                        <span className="text-base text-gray-700"> {`${formatCurrency(product.price, 'IDR')}`} </span>
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          
                        >
                          Program
                        </label>
                        {/* <span className="text-base text-gray-700"> {product.orgz_programs & product.orgz_programs.title} </span> */}
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Promote Text
                        </label>
                        {product.promote_text && product.promote_text.map(text => (
                          <span className="text-base text-gray-700 border-sm border-green-400 rounded-sm px-3 py-2 bg-green-400 mr-2 mb-2"> {text}, </span>
                        ))}
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
                        <span className="text-base text-gray-700"> {product.admin_fee} </span>
                      </div>
                    </div> */}
                    
                    {/* <div className="mt-10">
                        {
                            product.orgz_order_details && product.orgz_order_details.length > 0 && (
                              <>
                                <ul className='mb-8'>
                                    {product.orgz_order_details.orgz_products.map ((product, key) => (
                                        <div key={key+1} className='flex justify-between items-center bg-white text-xl mb-2 p-2 '>
                                          {key+1}. {product.orgz_products.title}
                                          <div className='flex justify-between items-center' >
                                            <span className="text-base text-gray-600"> Harga </span>
                                            <span className="text-base text-gray-600"> : </span>
                                            <span className="items-end text-base text-gray-500"> {product.price} </span>
                                          </div>
                                          <div className='flex justify-between items-center' >
                                            <span className="text-base text-gray-600"> Kode Promo </span>
                                            <span className="text-base text-gray-600"> : </span>
                                            <span className="items-end text-base text-gray-500"> {product.promo_code} </span>
                                          </div>
                                          <div className='flex justify-between items-center' >
                                            <span className="text-base text-gray-600"> Jumlah</span>
                                            <span className="text-base text-gray-600"> : </span>
                                            <span className="items-end text-base text-gray-500"> {product.amount} </span>
                                          </div>
                                          <div className='flex justify-between items-center' >
                                            <span className="text-base text-gray-600"> Diskon</span>
                                            <span className="text-base text-gray-600"> : </span>
                                            <span className="items-end text-base text-gray-500"> {product.discount} </span>
                                          </div>
                                          <div className='flex justify-between items-center' >
                                            <span className="text-base text-gray-600"> Diskon Nominal</span>
                                            <span className="text-base text-gray-600"> : </span>
                                            <span className="items-end text-base text-gray-500"> {product.discount_nominal} </span>
                                          </div>
                                        </div>
                                    ))}
                                </ul>
                              </>
                            )
                        }

                    </div> */}
                    {/* <hr className="mt-6 border-b-1 border-blueGray-300" /> Informasi Pendaftar */}
                    {/* <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Nomor Telepon
                        </label>
                        <span className="text-base text-gray-700"> {product.orgz_users.phone_number || 0} </span>
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
                        <span className="text-base text-gray-700"> {product.orgz_users.domicile || ''} </span>
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
                        <span className="text-base text-gray-700"> {product.orgz_users.job || ''} </span>
                      </div>
                    </div>
                    <div className="mt-10">
                        {
                            product.orgz_order_participants && product.orgz_order_participants.length > 0 && (
                              <>
                                <ul className='mb-8'>
                                    {product.orgz_order_participants.map ((user, key) => (
                                        <div key={key+1} className='flex justify-between items-center bg-white text-xl mb-2 p-2 '>
                                          {key+1}. {user.full_name}
                                        </div>
                                    ))}
                                </ul>
                              </>
                            )
                        }

                    </div> */}
                    {/* <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Paket
                        </label>
                        <span className="text-base text-gray-700"> {product.orgz_packets.name} </span>
                      </div>
                    </div> */}
                  </div>

                  <hr className="mt-6 border-b-1 border-blueGray-300" />

                </form>
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
