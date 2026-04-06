import { useState } from "react";
import { CheckmarkOutline, CloseOutline } from "react-ionicons";
import supabase from "configs/supabase";
// import { ColumnData } from "../types";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID

let datas = []


const { data: orgz_cash_flows, error } = await supabase
									.from('orgz_cash_flows')
									.select('withdraw_number,last_balance,last_withdraw,last_debit, transfer_eviden,is_complete')
									.eq('orgz_id', ORGZ_ID)
									.is('deleted_at', null)

if(orgz_cash_flows && orgz_cash_flows.length > 0){
	console.log('orgz_cash_flowss--', orgz_cash_flows)

	datas = orgz_cash_flows
	// datas = orders.map(order => {return {type: order.type, title: order.title, slug: order.slug, thumbnail: order.thumbnail, price: order.price, views: order.views, rating:order.rating, subcategory_id: order.subcategory_id, subcategory_code: order.orgz_subcategory.code, subcategory_name: order.orgz_subcategory.name}})


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
	'No. Penarikan': {
		values: datas.map(cash_flow => cash_flow.withdraw_number),
		classNames: (value) =>
			value === "Jane Smith" || value === "Emma Martinez"
				? "text-green-400 font-medium"
				: "text-gray-600",
		renderValue: (value) => {
			return (
				// <div className='font-medium'>
					<Link to={`/admin/withdraws/${value}`}>{value}</Link>
				// </div>
			)
		}
	},
	'Saldo Terakhir': {
		values: datas.map(cash_flow => cash_flow.last_balance),
		classNames: (value) =>
			value === "Jane Smith" || value === "Emma Martinez"
				? "text-green-400 font-medium"
				: "text-gray-600",
	},
	'Debit Terakhir': {
		values: `${formatCurrency(datas.map(cash_flow => cash_flow.last_debit), 'IDR')}`,
		classNames: (value) =>
			value === "Jane Smith" || value === "Emma Martinez"
				? "text-green-400 font-medium"
				: "text-gray-600",
	},
	'Jumlah Penarikan': {
		values: `${formatCurrency(datas.map(cash_flow => cash_flow.request_withdraw), 'IDR')}`,
		classNames: (value) =>
			value === "Jane Smith" || value === "Emma Martinez"
				? "text-green-400 font-medium"
				: "text-gray-600",
	},
	'Biaya Admin': {
		values: `${formatCurrency(datas.map(cash_flow => cash_flow.admin_fee || '-'), 'IDR')}`,
	},
	'Total Penarikan': {
		values: `${formatCurrency(datas.map(cash_flow => cash_flow.last_withdraw), 'IDR')}`,
		classNames: (value) =>
			value === "Jane Smith" || value === "Emma Martinez"
				? "text-green-400 font-medium"
				: "text-gray-600",
	},
	Status: {
		values: datas.map(cash_flow => cash_flow.is_complete),
		// classNames: (value) =>
		// 	value === "successed"
		// 		? "p-5 rounded rounded-lg bg-green-500"
		// 		: value === "pending"? "rounded rounded-sm bg-yellow-500": "rounded rounded-sm bg-red-500",
		renderValue: (value) => {
			if (value === true) {
				return (
					<div className={`font-medium px-3 py-2 m-3 rounded-sm bg-green-500`}>
						{'SELESAI'}
					</div>
				);
			}
			if (value === false) {
				return (
					<div className={`font-medium px-3 py-2 m-3 rounded-sm bg-yellow-500`}>
						{'PENDING'}
					</div>
				);
			}
			// if (value === "failed") {
			// 	return (
			// 		<div className={`font-medium px-3 py-2 m-3 rounded-sm bg-red-500`}>
			// 			{value}
			// 		</div>
			// 	);
			// }
			return value;
		},
	}
};
