import React from "react";
import { useState, useEffect } from "react";

// components

import CardTable from "../../components/Cards/CardTable.js";
import Datatable from "../../components/Tables/Datatables.js"
import NewDataTable from "../../components/Tables/NewDatatables";
import { toast } from "react-toastify";
import supabase from "configs/supabase.js";

export default function Products() {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    getDatas()
  }, [])

  const ORGZ_ID = process.env.REACT_APP_ORGZ_ID
  
  const getDatas = async () => {
    let { data: orgz_products, error } = await supabase
                                        .from('orgz_products')
                                        .select('type,title,slug,thumbnail,price,views,rating,subcategory_id,promote_text,description, orgz_subcategory(name, code)')
                                        .eq('orgz_id', ORGZ_ID)
                                        .eq('type', 'classes')

    if(orgz_products){
      const products = orgz_products.map(product => ({type: product.type, title: product.title, slug: product.slug, thumbnail: product.thumbnail, price: product.price, views: product.views, rating:product.rating, subcategory_id: product.subcategory_id, subcategory_code: product.subcategory_code, subcategory_name: product.subcategory_name}))
      // const {}
      console.log('products', products)
      setData(products)
    }else{
      setError(true)
      setErrorMessage(error)
      toast('Error retrive data from server.')
    }
  }
  return (
    <>
      <div className="flex flex-wrap mt-4">
        {/* <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
        <div className="w-full mb-12 px-4">
          <NewDataTable 
            data={data}
            searchBar
            excelExport
            pageSizeControl
            pagination
            removableRows
          />
        </div>
      </div>
    </>
  );
}
