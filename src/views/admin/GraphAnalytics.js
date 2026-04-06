import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'

import supabase from "configs/supabase.js";

import { toast } from "react-toastify";

// components
import CardBarChart from "../../components/Cards/CardBarChart.js";
import LatestTransactions from "../../components/Cards/LatestTransactions.js";
import DonutChart from "../../components/Charts/DonutChart.js";

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID

export default function GraphAnalytics() {
  const { userInfo, orgzId } = useSelector(state => state.authReducer)
  const [options, setOptions] = useState([]) // Initialize as empty array
  const [selectedProduct, setSelectedProduct] = useState(null) // Renamed for clarity
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const type = 'classes'
    getClasses(type)
    toast('Hello from dashboard')
  }, []) // Removed product dependency to avoid infinite loop

  useEffect(() => {
    if (selectedProduct) {
      console.log('Selected product:', selectedProduct)
    }
  }, [selectedProduct])

  const getClasses = async (type) => {
    setLoading(true)
    try {
      const { data: products, error } = await supabase
        .from('orgz_products')
        .select('id,type,title,slug,thumbnail,price,views,rating,subcategory_id,promote_text,description, orgz_subcategory(name, code)')
        .eq('orgz_id', orgzId || ORGZ_ID)
        .eq('type', type)

      if (error) throw error

      if (products && products.length > 0) {
        console.log('products--', products)
        setOptions(products)
        // Optionally set default first product
        if (products.length > 0 && !selectedProduct) {
          setSelectedProduct(products[0].id)
        }
      } else {
        setOptions([])
        toast.info('No products found.')
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Error retrieving data from server.')
      setOptions([])
    } finally {
      setLoading(false)
    }
  }

  const handleProductChange = (event) => {
    const value = event.target.value
    console.log('Selected value:', value)
    setSelectedProduct(value)
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4 mb-4">
          <label htmlFor="product-select" className="block text-sm/6 font-medium text-gray-900 mb-2">
            Produk
          </label>
          <select
            id="product-select"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            onChange={handleProductChange}
            value={selectedProduct || ''}
            disabled={loading}
          >
            <option value="" disabled>Select a product</option>
            {options.map(option => (
              <option
                key={option.id}
                value={option.id}
              >
                {option.title}
              </option>
            ))}
          </select>
          {loading && <p className="text-sm text-gray-500 mt-1">Loading products...</p>}
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <DonutChart item="domicili" productId={selectedProduct} />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart productId={selectedProduct} />
        </div>
      </div>

      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <LatestTransactions />
        </div>
    </div>
    </>
  );
}
// import React from "react";
// import { useState, useEffect } from "react";
// import {useSelector} from 'react-redux'

// import supabase from "configs/supabase.js";

// import { toast } from "react-toastify";

// // components

// import CardLineChart from "../../components/Cards/CardLineChart.js";
// import CardBarChart from "../../components/Cards/CardBarChart.js";
// import CardPageVisits from "../../components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "../../components/Cards/CardSocialTraffic.js";
// import LatestTransactions from "../../components/Cards/LatestTransactions.js";
// import DonutChart from "../../components/Charts/DonutChart.js";
// import { Select } from "components/Selects/Select.js";

// const ORGZ_ID = process.env.REACT_APP_ORGZ_ID

// export default function GraphAnalytics() {

//   const {userInfo, orgzId} = useSelector(state => state.authReducer)
//   const [options, setOptions] = useState()
//   const [product, setProduct] = useState()

//   useEffect(() => {
//     const type = 'classes'
//     getClasses(type)
//     toast('Hello from dashboard')

//   }, [])

//   const getClasses = async (type) => {
//     const { data: products, error } = await supabase
//     .from('orgz_products')
//     .select('id,type,title,slug,thumbnail,price,views,rating,subcategory_id,promote_text,description, orgz_subcategory(name, code)')
//     .eq('orgz_id', orgzId || ORGZ_ID)
//     .eq('type', type)

//     if(products && products.length > 0){
//       console.log('products--', products)

//       setOptions(products)
//       // .map(product => ({id: product.id, name: product.title, thumbnail: product.thumbnail})
//       console.log('options from das', options)

//       console.log('products-', options)
//     }else{
//       // setError(true)
//       // setErrorMessage(error)
//       toast('Error retrive data from server.')
//     }
//   }

//   const setSelectedValue = async (value) => {
//     console.log('value', value)
//     if(value){
//       setProduct(value)
//     }
//   }
//   return (
//     <>
//       <div className="flex flex-wrap">
//       </div>
//       <div className="flex flex-wrap">
//         {/* <Select options={options} setSelectedValue={setSelectedValue} /> */}
//         <label for="select" className="block text-sm/6 font-medium text-gray-900 mb-2">Produk</label>
//         <select className="m-0 w-full overflow-auto rounded-md bg-white p-0 py-1 text-base shadow-lg outline outline-1 outline-black/5 [--anchor-gap:theme(spacing.1)] data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in data-[leave]:[transition-behavior:allow-discrete] sm:text-sm"
//                 onChange={(e) => setProduct(e.target.value)}
//                 // defaultValue={options && options[0].id}
//         >
//           {options && options.map(option => (
//             <option className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 focus:bg-indigo-600 focus:text-white focus:outline-none [&:not([hidden])]:block"
//                     value={option.id}
//             >
//               {option.title}
//             </option>
//           ))}


//         </select>
//         <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
//           <DonutChart item="domicili" product={product} />
//         </div>
//         {/* <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4"> */}
//           {/* <DonutChart item="domicile" /> */}
//           {/* <CardLineChart /> */}
//         {/* </div> */}
//         <div className="w-full xl:w-4/12 px-4">
//           <CardBarChart product={product} />
//         </div>
//       </div>
//       <div className="flex flex-wrap mt-4">
//         <div className="w-full mb-12 xl:mb-0 px-4">
//           {/* xl:w-8/12 */}
//           <LatestTransactions />
//         </div>
//         {/* <div className="w-full xl:w-4/12 px-4">
//           <CardSocialTraffic />
//         </div> */}
//       </div>
//     </>
//   );
// }
