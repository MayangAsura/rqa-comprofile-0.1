import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts'
import supabase from '../../configs/supabase'
import { toast } from 'react-toastify'

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID

const DonutChart = ({ item, productId }) => {
    const { userInfo, orgzInfo, orgzId } = useSelector(state => state.authReducer)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    // Color palette for the chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#F06292', '#FFB74D']

    useEffect(() => {
        if (productId) {
            fetchChartData()
        }
    }, [item, productId, orgzId])

    const fetchChartData = async () => {
        setLoading(true)
        try {
            if (item === 'domicili') {
                await getDataDomicili()
            } else if (item === 'packet') {
                await getDataPacket()
            }
        } catch (error) {
            console.error('Error fetching chart data:', error)
            toast.error(`Failed to get ${item} data.`)
            setData([])
        } finally {
            setLoading(false)
        }
    }

    const getDataPacket = async () => {
        try {
            // Fetch order details with packet information
            const { data: orderDetails, error } = await supabase
                .from('orgz_order_details')
                .select(`
                    orgz_packet_id,
                    quantity,
                    orgz_packet!inner (
                        id,
                        name,
                        price
                    )
                `)
                .eq('orgz_id', orgzId || ORGZ_ID)
                .eq('orgz_product_id', productId)
                .is('deleted_at', null)

            if (error) throw error

            if (orderDetails && orderDetails.length > 0) {
                // Aggregate data by packet
                const packetMap = new Map()

                orderDetails.forEach(detail => {
                    const packetName = detail.orgz_packet?.name || 'Unknown Packet'
                    const quantity = detail.quantity || 1

                    if (packetMap.has(packetName)) {
                        packetMap.set(packetName, packetMap.get(packetName) + quantity)
                    } else {
                        packetMap.set(packetName, quantity)
                    }
                })

                // Transform to chart format
                const chartData = Array.from(packetMap, ([name, value]) => ({
                    name: name,
                    students: value
                }))

                setData(chartData)
                console.log('Packet chart data:', chartData)
            } else {
                setData([])
                toast.info('No packet data available for this product')
            }
        } catch (error) {
            console.error('Error fetching packet data:', error)
            toast.error('Failed to get packet data.')
            setData([])
        }
    }

    const getDataDomicili = async () => {
        try {
            // Fetch order details with user and city information
            const { data: orderDetails, error } = await supabase
                .from('orgz_order_details')
                .select(`
                    orgz_id,
                    orgz_orders(
                        orgz_users!inner (
                            orgz_cities (
                                city_id,
                                name
                            )
                        )
                    ),
                    orgz_product_id,
                    amount
                `)
                .eq('orgz_id', orgzId || ORGZ_ID)
                .eq('orgz_product_id', productId)
                .is('deleted_at', null)

            if (error) throw error

            if (orderDetails && orderDetails.length > 0) {
                // Aggregate data by city
                const cityMap = new Map()

                orderDetails.forEach(detail => {
                    const cityName = detail.orgz_orders.orgz_users?.orgz_cities?.name || 'Unknown City'
                    const amount = detail.amount || 1

                    if (cityMap.has(cityName)) {
                        cityMap.set(cityName, cityMap.get(cityName) + amount)
                    } else {
                        cityMap.set(cityName, amount)
                    }
                })

                // Transform to chart format
                const chartData = Array.from(cityMap, ([name, value]) => ({
                    name: name,
                    participants: value
                }))

                setData(chartData)
                console.log('Domicile chart data:', chartData)
            } else {
                setData([])
                toast.info('No domicile data available for this product')
            }
        } catch (error) {
            console.error('Error fetching domicile data:', error)
            toast.error('Failed to get domicile data.')
            setData([])
        }
    }

    // Custom label renderer for better display
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
        const RADIAN = Math.PI / 180
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
        const x = cx + radius * Math.cos(-midAngle * RADIAN)
        const y = cy + radius * Math.sin(-midAngle * RADIAN)

        return percent > 0.05 ? (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize={12}
                fontWeight="bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null
    }

    // Custom tooltip formatter
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
                    <p className="font-semibold text-gray-800">{payload[0].name}</p>
                    <p className="text-sm text-gray-600">
                        Total: {payload[0].value} peserta
                    </p>
                    <p className="text-xs text-gray-500">
                        Percentage: {((payload[0].value / data.reduce((sum, d) => sum + d.participants, 0)) * 100).toFixed(1)}%
                    </p>
                </div>
            )
        }
        return null
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-gray-500">Loading chart data...</p>
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-gray-500">No data available for {item === 'domicili' ? 'domicile' : 'packet'} chart</p>
            </div>
        )
    }

    return (
        <div className="w-full flex justify-center">
            <PieChart width={600} height={500}>
                <Pie
                    data={data}
                    dataKey="participants"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={180}
                    innerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    label={renderCustomizedLabel}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke="white"
                            strokeWidth={2}
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{
                        paddingLeft: '20px',
                        fontSize: '12px'
                    }}
                />
            </PieChart>
        </div>
    )
}

export default DonutChart