import React from "react";
import { useState } from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function Header({page_title}) {

  const [total_classes, setTotalClasses] = useState(0)
  const [total_new_users, setTotalNewUsers] = useState(0)
  const [total_transactions, setTotalTransactions] = useState(0)
  const [is_class_up, setIsClassUp] = useState(false)
  const [is_new_users_up, setIsNewUsersUp] = useState(false)
  const [is_transactions_up, setIsTransactionsUp] = useState(false)
  const [class_percentage, setClassesPercentage] = useState(0)
  const [new_users_percentage, setNewUsersPercentage] = useState(0)
  const [transactions_percentage, setTransactionsPercentage] = useState(0)

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12 -mt-10 -mx-10">
        <div className="px-4 md:px-10 mx-auto w-full">
          {/* px-4 md:px-10  */}
          <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="KELAS"
                  statTitle={total_classes}
                  statArrow={is_class_up? 'up': 'down'}
                  statPercent={class_percentage}
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PENGGUNA BARU"
                  statTitle={total_new_users}
                  statArrow={is_new_users_up? 'up': 'down'}
                  statPercent={new_users_percentage}
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TRANSAKSI BARU"
                  statTitle={total_transactions}
                  statArrow={is_transactions_up? 'up': 'down'}
                  statPercent={transactions_percentage}
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
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
    </>
  );
}
