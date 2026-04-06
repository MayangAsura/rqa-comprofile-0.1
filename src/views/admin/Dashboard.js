import React from "react";
import { useState, useEffect } from "react";
import {useSelector} from 'react-redux'

import supabase from "configs/supabase.js";

import { toast } from "react-toastify";

// components

import CardLineChart from "../../components/Cards/CardLineChart.js";
import CardBarChart from "../../components/Cards/CardBarChart.js";
import CardPageVisits from "../../components/Cards/CardPageVisits.js";
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic.js";
import LatestTransactions from "../../components/Cards/LatestTransactions.js";
import DonutChart from "../../components/Charts/DonutChart.js";
import { Select } from "components/Selects/Select.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import Header from "components/Headers/Header.js";

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID

export default function Dashboard() {

  const {userInfo, orgzId} = useSelector(state => state.authReducer)
  const [options, setOptions] = useState()
  const [product, setProduct] = useState()

  useEffect(() => {
    const type = 'classes'
    getClasses(type)
  }, [])
  
  const getClasses = async (type) => {
    const { data: products, error } = await supabase
    .from('orgz_products')
    .select('id,type,title,slug,thumbnail,price,views,rating,subcategory_id,promote_text,description, orgz_subcategory(name, code)')
    .eq('orgz_id', orgzId || ORGZ_ID)
    .eq('type', type)
    
    if(products && products.length > 0){
      console.log('products--', products)
      
      setOptions(products.map(product => ({id: product.id, name: product.title, thumbnail: product.thumbnail})))
      console.log('options from das', options)
      
      console.log('products-', options)
    }else{
      // setError(true)
      // setErrorMessage(error)
      toast('Error retrive data from server.')
    }
  }

  const setSelectedValue = (value) => {
    console.log('value', value)
    setProduct(value)
  }
  return (
    <>
      <Header/>
      <div className="flex flex-wrap">
      </div>
      {/* <div className="flex flex-wrap">
        <Select options={options} setSelectedValue={setSelectedValue} />
        <label for="select" className="block text-sm/6 font-medium text-gray-900">Produk</label>
        <select className="m-0 w-full overflow-auto rounded-md bg-white p-0 py-1 text-base shadow-lg outline outline-1 outline-black/5 [--anchor-gap:theme(spacing.1)] data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in data-[leave]:[transition-behavior:allow-discrete] sm:text-sm"
                onChange={(e) => setSelectedValue(e.target.value)}
        >
          {options && options.map(option => (
            <option className="group/option relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 focus:bg-indigo-600 focus:text-white focus:outline-none [&:not([hidden])]:block"
                    value={option.id}
            >
              {option.name}
            </option>
          ))}


        </select>
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <DonutChart item="domicili" />
        </div>
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <DonutChart item="domicile" />
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart product={product} />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 xl:mb-0 px-4">
          xl:w-8/12
          <LatestTransactions />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div> */}
    </>
  );
}
