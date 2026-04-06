import { useState } from "react";
import { CheckmarkOutline, CloseOutline } from "react-ionicons";
import supabase from "configs/supabase";
// import { ColumnData } from "../types";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID

let datas = []


const { data: products, error } = await supabase
									.from('orgz_products')
									.select('id,type,title,slug,thumbnail,price,views,rating,subcategory_id,promote_text,description, orgz_subcategory(name, code)')
									.eq('orgz_id', ORGZ_ID)
									.eq('type', 'classes')

if(products && products.length > 0){
	console.log('products--', products)
	
	datas = products.map(product => {return {id: product.id, type: product.type, title: product.title, slug: product.slug, thumbnail: product.thumbnail, price: product.price, views: product.views, rating:product.rating, subcategory_id: product.subcategory_id, subcategory_code: product.orgz_subcategory.code, subcategory_name: product.orgz_subcategory.name}})
	
	console.log('products-', datas)
}else{
	// setError(true)
	// setErrorMessage(error)
	toast('Error retrive data from server.')
}
const types = datas['type']

console.log('types', types)

export const data= {
	Type: {
		values: datas.map(product => product.type),
		classNames: (value) =>
			value === "Jane Smith" || value === "Emma Martinez"
				? "text-green-400 font-medium"
				: "text-white",
	},
	Title: {
		values: datas.map(product => product.title),
		renderValue: (value) => {
					return (
						// <div className='font-medium'>
							<Link to={`/admin/classes/${datas.map(product => product.id)}`}>{value}</Link>
						// </div>
					)
				}
	},
	Slug: {
		values: datas.map(product => '/' +product.slug),
		classNames: (value) =>
			typeof value === "string" && value.includes("john")
				? "text-green-400 font-medium"
				: "text-white",
	},
	// ToggleEventhumbnail: {
	// 	values: datas.map(product => product.type),
	// },
	Price: {
		values: datas.map(product => product.price),
		renderValue: (value) => {
			if (typeof value === "number") {
				return (
					<div className={`font-medium ${value > 8000 ? "text-green-400" : "text-red-400"}`}>
						${value.toLocaleString()}
					</div>
				);
			}
			return value;
		},
	},
	Views: {
		values: datas.map(product => product.views),
		renderBoolean: (value) =>
			value ? (
				<CheckmarkOutline
					cssClasses={"!text-green-400"}
					width={"30px"}
					height={"30px"}
				/>
			) : (
				<CloseOutline
					cssClasses={"!text-red-400"}
					width={"30px"}
					height={"30px"}
				/>
			),
	},
	Thumbnail: {
		values: datas.map(product => product.thumbnail || ''),
		renderValue: (value) =>
			<img src={value} className='rounded rounded-sm' width='200px' ></img>
			// value ? (
			// 	<CheckmarkOutline
			// 		cssClasses={"!text-green-400"}
			// 		width={"30px"}
			// 		height={"30px"}
			// 	/>
			// ) 
			// : (
			// 	<CloseOutline
			// 		cssClasses={"!text-red-400"}
			// 		width={"30px"}
			// 		height={"30px"}
			// 	/>
			// ),
	},
	Subcategory: {
		values: datas.map(product => product.subcategory_name || '-'),
		renderBoolean: (value) =>
			value ? (
				<CheckmarkOutline
					cssClasses={"!text-green-400"}
					width={"30px"}
					height={"30px"}
				/>
			) : (
				<CloseOutline
					cssClasses={"!text-red-400"}
					width={"30px"}
					height={"30px"}
				/>
			),
	}
};
