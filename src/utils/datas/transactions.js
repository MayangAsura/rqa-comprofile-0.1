import { useState } from "react";
import { CheckmarkOutline, CloseOutline } from "react-ionicons";
import supabase from "configs/supabase";
// import { ColumnData } from "../types";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID

let datas = []


const { data: orders, error } = await supabase
									.from('orgz_orders')
									.select('invoice_number,total_price,total_amount,promo_code,admin_fee,created_at,order_status,orgz_packets(name, code),orgz_users(full_name)')
									.eq('orgz_id', ORGZ_ID)
									.is('deleted_at', null)

if(orders && orders.length > 0){
	console.log('orders--', orders)

	datas = orders
	// datas = orders.map(order => {return {type: order.type, title: order.title, slug: order.slug, thumbnail: order.thumbnail, price: order.price, views: order.views, rating:order.rating, subcategory_id: order.subcategory_id, subcategory_code: order.orgz_subcategory.code, subcategory_name: order.orgz_subcategory.name}})

	console.log('orders-', datas)
}else{
	// setError(true)
	// setErrorMessage(error)
	toast('Error retrive data from server.')
}

function getDefaultLocale(currencyCode) {
	const currencyLocaleMap = {
		USD: 'en-US',
		IDR: 'id-ID',
		EUR: 'de-DE',
		JPY: 'ja-JP',
		GBP: 'en-GB',
		CNY: 'zh-CN',
		AUD: 'en-AU'
	};

	return currencyLocaleMap[currencyCode] || 'en-US'; // fallback ke en-US
}

function formatCurrency(amount, currencyCode, locale = getDefaultLocale(currencyCode)) {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: currencyCode,
		maximumFractionDigits: 2
	}).format(amount);
}

export const data= {
	'Invoice': {
		values: datas.map(order => order.invoice_number),
		classNames: (value) =>
			value === "Jane Smith" || value === "Emma Martinez"
				? "text-green-400 font-medium"
				: "text-gray-600",
		renderValue: (value) => {
			return (
				// <div className='font-medium'>
					<Link to={`/admin/transactions/${value}`}>{value}</Link>
				// </div>
			)
		}
	},
	'Pelanggan': {
		values: datas.map(order => order.orgz_users.full_name),
		classNames: (value) =>
			value === "Jane Smith" || value === "Emma Martinez"
				? "text-green-400 font-medium"
				: "text-gray-600",
	},
	'Total Harga': {
		values: `${formatCurrency(datas.map(order => order.total_price), 'IDR')}`,
		classNames: (value) =>
			value === "Jane Smith" || value === "Emma Martinez"
				? "text-green-400 font-medium"
				: "text-gray-600",
	},
	Jumlah: {
		values: datas.map(order => order.total_amount),
	},
	Promo: {
		values: datas.map(order => order.promo_code || '-'),
	},
	'Biaya Admin': {
		values: datas.map(order => order.admin_fee || '-'),
	},
	Status: {
		values: datas.map(order => order.order_status),
		// classNames: (value) =>
		// 	value === "successed"
		// 		? "p-5 rounded rounded-lg bg-green-500"
		// 		: value === "pending"? "rounded rounded-sm bg-yellow-500": "rounded rounded-sm bg-red-500",
		renderValue: (value) => {
			if (value === "successed") {
				return (
					<div className={`font-medium px-3 py-2 m-3 rounded-sm bg-green-500`}>
						{value}
					</div>
				);
			}
			if (value === "pending") {
				return (
					<div className={`font-medium px-3 py-2 m-3 rounded-sm bg-yellow-500`}>
						{value}
					</div>
				);
			}
			if (value === "failed") {
				return (
					<div className={`font-medium px-3 py-2 m-3 rounded-sm bg-red-500`}>
						{value}
					</div>
				);
			}
			return value;
		},
	},
	Paket: {
		values: datas.map(order => order.orgz_packets.name),
		classNames: (value) =>
			datas['orgz_packets.code'] === "1p"
				? "px-3 py-2 rounded rounded-lg bg-green-500"
				: datas['orgz_packets.code'] === "2p"? "px-3 py-2 rounded rounded-sm bg-yellow-500": "px-3 py-2 rounded rounded-sm bg-blue-500",
	}
};
