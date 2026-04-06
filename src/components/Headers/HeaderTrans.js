import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux'

// components

import CardStats from "components/Cards/CardStats.js";
import supabase from "configs/supabase";

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID

export default function HeaderTrans() {

  const {userInfo, orgzInfo, orgzId} = useSelector(state => state.authReducer)
  const [balance, setBalance] = useState(0)
  const [total_debit, setTotalDebit] = useState(0)
  const [total_credit, setTotalKredit] = useState(0)

  useEffect(() => {
    getBalance()
    getTotalDebit()
    getTotalCredit()
  }, [])

  const getBalance = async () => {
    let { data: orgz_orders, error } = await supabase
                                      .from('orgz_orders')
                                      .select(`
                                        total_price.sum(),
                                        orgz_identities (
                                          orgz_status
                                        )
                                      `)
                                      .eq('order_status', 'successed')
                                      .eq('orgz_identities.orgz_status', 'live')
                                      .eq('orgz_id', orgzId??ORGZ_ID)
                                      .is('deleted_at', null)
                                      .single()

    if(orgz_orders){
      setBalance(orgz_orders.sum)
    }

  }
  const getTotalDebit = async () => {
    let { data: orgz_orders, error } = await supabase
                                      .from('orgz_orders')
                                      .select(`
                                        total_price.sum(),
                                        orgz_identities (
                                          orgz_id
                                        )
                                      `)
                                      .eq('order_status', 'successed')
                                      .eq('orgz_identities.orgz_status', 'live')
                                      .eq('orgz_identities.orgz_id', orgzId??ORGZ_ID)
                                      .is('deleted_at', null)
                                      .single()
    // , { count: 'exact', head: true }
    
    if(orgz_orders){
      console.log('orgz_orders', orgz_orders)
      setBalance(orgz_orders.sum)
    }

  }
  const getTotalCredit = async () => {
    let { data: orgz_orders, error } = await supabase
                                      .from('orgz_orders')
                                      .select(`
                                        total_price.sum(),
                                        orgz_identities (
                                          orgz_id
                                        )
                                      `)
                                      .eq('order_status', 'successed')
                                      .eq('orgz_identities.orgz_status', 'live')
                                      .eq('orgz_identities.orgz_id', orgzId??ORGZ_ID)
                                      .is('deleted_at', null)
                                      .single()
                                      
    if(orgz_orders){
      console.log('orgz_orders', orgz_orders)
      setBalance(orgz_orders.sum)
    }

  }
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-24 pb-24 pt-12 -mt-10 -mx-10">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Saldo"
                  statTitle={balance}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescription="1 pekan terakhir"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Debit"
                  statTitle={total_debit}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescription="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Kredit"
                  statTitle={total_credit}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescription="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statTitle="49,65%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
