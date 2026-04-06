import React, { useState } from "react";
import Chart from "chart.js";

import supabase from "configs/supabase";

export default function CardBarChart({productId}) {

  const [items, setItems] = useState([])
  const [labels, setLabels] = useState([])

  React.useEffect(() => {

    getLatestData()
    getLabels()
    console.log('product from card barchart', productId)
    if(productId){
      getCurrentData(productId)
    }

    let config = {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: items,
            // data: [30, 78, 56, 34, 100, 45, 13],
            fill: false,
            barThickness: 8,
          },
          // {
          //   label: new Date().getFullYear() - 1,
          //   fill: false,
          //   backgroundColor: "#4c51bf",
          //   borderColor: "#4c51bf",
          //   data: [27, 68, 86, 74, 10, 4, 87],
          //   barThickness: 8,
          // },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, [productId]);

  const getLatestData = async () => {
    let { data: orgz_products, error_p } = await supabase
                                          .from('orgz_products')
                                          .select('id')
                                          .order('id', {ascending: false})
                                          .limit(1)
                                          .single()
    if(orgz_products){
      let { data: orgz_orders, error_o } = await supabase
                                        .from('orgz_orders')
                                        .select('total_price, orgz_order_details(orgz_product_id)')
                                        .eq('orgz_order_details.orgz_product_id', orgz_products.id)
                                        .single()
      if(orgz_orders){
        setItems([items, orgz_orders.total_price])
      }

    }

    console.log('items', items)
  }

  const getLabels = async (product=null) => {
    let { data: orgz_products, error } = await supabase
                                        .from('orgz_products')
                                        .select('created_at')
                                        .eq('id', productId)
                                        .single()

    if(orgz_products){
      const diff = new Date() - new Date(orgz_products['created_at'])
      const days = new Date(diff).getDay()
      console.log(diff, days)
      // setLabels()
      for (let index = 0; index < diff; index++) {
        // const element = array[index];
        setLabels([...labels, 'Day ' + index+1])
      }
    }
  }

  const getCurrentData = async (product) => {
    if(product){

      let { data: orgz_orders, error_o } = await supabase
                                        .from('orgz_orders')
                                        .select('total_price, orgz_order_details(orgz_product_id)')
                                        .eq('orgz_order_details.orgz_product_id', product)
                                        .single()
      if(orgz_orders){
        setItems([items, orgz_orders.total_price])
      }

    }

    console.log('items', items)
  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Total orders
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
