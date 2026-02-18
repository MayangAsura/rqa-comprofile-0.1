import { useState, useEffect } from 'react'
import {PieChart, Pie, Tooltip} from 'recharts'
import supabase from '../../configs/supabase'
import axios from 'axios'
import { toast } from 'react-toastify'

const BASE_URL = process.env.SERVER_MODE === 'development'? process.env.REACT_APP_LOCAL_URL : process.env.REACT_APP_PROD_URL

const DonutChart = ({item}) => {

    const [data, setData] = useState([])

    useEffect(() => {
        getData()

    }, [data])

    const getData = async () => {
        try {
            // await axios.get(`${BASE_URL}/api/${item}s`, {'Content-Type': 'application/json'})
            //             .then(result => {
            //                 if(result.status === 200){
            //                     setData(result.data.data)
            //                 }
            //             })
            
            let { data: orgz_orders, error } = await supabase
                                                .from('orgz_products')
                                                .select(`
                                                    title,
                                                    orgz_order_details(
                                                        orgz_product_id.count()
                                                    )
                                                `)
                                                .eq('orgz_order_details.orgz_id', )
        } catch (error) {
            toast('Failed to get '+ item +' data.')
        }
    }

    // const data = [
    //     { name: "Geeksforgeeks", students: 400 },
    //     { name: "Technical scripter", students: 700 },
    //     { name: "Geek-i-knack", students: 200 },
    //     { name: "Geek-o-mania", students: 1000 },
    // ];

    return (
        <>
            <PieChart width={700} height={700}>
                <Tooltip />
                <Pie
                    data={data}
                    dataKey="students"
                    outerRadius={250}
                    innerRadius={150}
                    fill="green"
                    label={({ name, students }) =>
                        `${name}: ${students}`
                    }
                />
            </PieChart>
        </>
    )

}

export default DonutChart