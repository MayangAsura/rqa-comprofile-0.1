import React from "react";
import { useState, useEffect } from "react";

// components

import CardTable from "../../components/Cards/CardTable.js";
import Datatable from "../../components/Tables/Datatables.js"
import NewDataTable from "../../components/Tables/NewDatatables";
import { data } from "utils/datas/products.js";
import { toast } from "react-toastify";
import supabase from "configs/supabase.js";

export default function Products() {
  const [datas, setDatas] = useState([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if(data){
      setDatas(data)
    }
    console.log('products', data, datas)

  },[data])
  return (
    <>
      <div className="flex flex-wrap">
        {/* <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
        {/* FROM PRO */}
        <div className="w-full mb-12 px-4">
          <NewDataTable 
            data={datas}
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
