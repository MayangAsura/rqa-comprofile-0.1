import React from "react";
import { useState, useEffect } from "react";

// components

import CardTable from "../../components/Cards/CardTable.js";
import Datatable from "../../components/Tables/Datatables.js"
import NewDataTable from "../../components/Tables/NewDatatables.jsx";

export default function Tables({items}) {
  const [data, setData] = useState([])

  useEffect(() => {
    // getDatas()
    if(items){
      setData(items)
    }
  }, [items])
  
  // const getDatas = as()
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
