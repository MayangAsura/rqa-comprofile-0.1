import React, { useState, useEffect, useMemo } from "react";
import * as XLSX from "xlsx";
import Modal from "components/Modals/Modal";
// import { ColumnData, sortType } from "../../types";
import {
	AddCircle,
	CaretDownOutline,
	CaretUpOutline,
	ChevronBackOutline,
	ChevronForwardOutline,
	DownloadOutline,
	SearchOutline,
	TrashOutline,
} from "react-ionicons";

import { formatCurrency } from "utils/formatCurrency";
import supabase from "configs/supabase";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

// import ChevronForwardOutline from "react-ionicons";

// interface DataTableProps {
// 	data: ColumnData;
// 	searchBar?: boolean;
// 	excelExport?: boolean;
// 	pagination?: boolean;
// 	removableRows?: boolean;
// 	pageSizeControl?: boolean;
// }

const ORGZ_ID = process.env.REACT_APP_ORGZ_ID
const BASE_URL = process.env.REACT_APP_SERVER_MODE === 'development'? process.env.REACT_APP_LOCAL_URL : process.env.REACT_APP_PROD_URL

const NewDataTable = ({
	data,
	type,
	searchBar = false,
	addNew = false,
	excelExport = false,
	pagination = false,
	removableRows = false,
	pageSizeControl = false,
}) => {
	const columns = Object.keys(data);
	const rowCount = Math.max(...columns.map((column) => data[column].values.length));

	const {orgzId} = useSelector(state => state.authReducer)

	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const [sortConfig, setSortConfig] = useState(null);
	const [pageSize, setPageSize] = useState(10);
	const [selectedRows, setSelectedRows] = useState([]);

	const [modal_open, setModalOpen] = useState(false)
	const [modal_detail_open, setModalDetailOpen] = useState(false)
	const [form_data, setFormData] = useState({
        request_withdraw: "",
        bank_name: "",
        account_number: "",
        account_name: "",
        total_debit: "",
				last_balance: 0,
        admin_fee: 0,
				orgz_id: orgzId || ORGZ_ID
    })

	const [current_balance, setCurrentBalance] = useState(0)

	const [errorRequestWithdraw, setErrorRequestWithdraws] = useState("")

	useEffect(() => {
		if(data)
			console.log('data', data)

		getCurrentAdminFee()

		getCurrentBalance()

		if(form_data['request_withdraw']){
			form_data['total_debit'] = !errorRequestWithdraw? form_data['request_withdraw'] - form_data['admin_fee'] : 0


			if(data.length == 0){

				const order_balance = current_balance - form_data['total_debit']
				// const cash_flow_balance = form_data['last_balance'] - form_data['total_debit']

				console.log('current_balance', current_balance)
				// if(order_balance == cash_flow_balance){

					form_data['last_balance'] = order_balance
					form_data['last_debit'] = form_data['last_balance']

				// }

			}else{
				const cash_flow_balance = form_data['last_balance'] - form_data['total_debit']

				form_data['last_balance'] = cash_flow_balance
				form_data['last_debit'] = form_data['last_balance']
			}
		}

	}, [data, form_data.admin_fee, form_data.request_withdraw])

	const getCurrentBalance = async () => {
		try {

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
				setCurrentBalance(orgz_orders.sum)
			}

		} catch (error) {
			toast.error('Failed, Failed when get current balance')
		}
	}

	const getCurrentAdminFee = () => {
		try {
			form_data.admin_fee = 4000
		} catch (error) {

		}
	}

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
		setCurrentPage(0);
	};

	const handleSort = (accessor) => {
		let direction= "asc";
		if (sortConfig && sortConfig.key === accessor) {
			if (sortConfig.direction === "asc") {
				direction = "desc";
			} else if (sortConfig.direction === "desc") {
				direction = null;
			}
		}
		setSortConfig({ key: accessor, direction });
	};

	const addNewItem = () => {
		try {

			setModalOpen(true)
		} catch (error) {

		}
	}

	const exportToExcel = () => {
		const exportData = rows.map((row) => {
			const exportRow = {};
			columns.forEach((column) => {
				if (row[column]) {
					exportRow[column] = row[column];
				} else {
					exportRow[column] = "FALSE";
				}
			});
			return exportRow;
		});

		const worksheet = XLSX.utils.json_to_sheet(exportData);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
		XLSX.writeFile(workbook, "data.xlsx");
	};

	const handleRowSelect = (rowIndex) => {
		const selectedRowIndex = selectedRows.indexOf(String	(rowIndex));
		console.log('rowIndex', rowIndex)
		if (selectedRowIndex === -1) {
			setSelectedRows([...selectedRows, String(rowIndex)]);
		} else {
			const updatedSelectedRows = [...selectedRows];
			updatedSelectedRows.splice(selectedRowIndex, 1);
			setSelectedRows(updatedSelectedRows);
		}
	};

	const handleDeleteSelectedRows = async () => {
		const updatedData = { ...data };
		selectedRows.forEach(async (rowIndexString) => {
			const rowIndex = parseInt(rowIndexString, 10);
			columns.forEach((column) => {
				updatedData[column].values.splice(rowIndex, 1);
			});
		});
		// try {

		// } catch (error) {
		// 	toast.error('Gagal menghapus penarikan: ' + error)
		// }
		setSelectedRows([]);
	};

	// const handleDetailWithdraw = async (id) => {
	// 	try {

	// 		let { data: orgz_cash_flows, error } = await supabase
	// 																						.from('orgz_cash_flows')
	// 																						.select("*")
	// 																						.eq('id', id)
	// 																						.is('deleted_at', null)

	// 		if(orgz_cash_flows){
	// 			setFormData(orgz_cash_flows.map(item => (
	// 					{
	// 						request_withdraw: item.request_withdraw,
	// 						bank_name: item.bank_name,
	// 						account_number: item.account_number,
	// 						account_name: item.account_name,
	// 						total_withdraw: item.total_withdraw,
	// 						admin_fee: item.admin_fee
	// 					}
	// 				)
	// 			))
	// 			setModalDetailOpen(true)
	// 		}else{
	// 			toast.error('Gagal, Gagal mendapatkan data withdraw')
	// 		}

	// 	} catch (error) {
	// 		toast.error('Gagal, Gagal mendapatkan data withdraw')
	// 	}
	// }

	const rows = useMemo(() => {
		return Array.from({ length: rowCount }, (_, index) => {
			return columns.reduce((acc, column) => {
				acc[column] = data[column].values[index] || "";
				return acc;
			}, {});
		});
	}, [data, columns, rowCount]);

	const sortedRows = useMemo(() => {
		if (!sortConfig || !sortConfig.direction) return rows;

		return [...rows].sort((a, b) => {
			const aValue = a[sortConfig.key];
			const bValue = b[sortConfig.key];

			if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
			if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
			return 0;
		});
	}, [rows, sortConfig]);

	const filteredRows = useMemo(() => {
		return sortedRows.filter((row) =>
			columns.some((column) =>
				String(row[column]).toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [sortedRows, searchTerm, columns]);

	const paginatedRows = useMemo(() => {
		const start = currentPage * pageSize;
		return filteredRows.slice(start, start + pageSize);
	}, [filteredRows, currentPage, pageSize]);

	const totalPages = Math.ceil(filteredRows.length / pageSize);

	const handleFormData = (name, value) => {
        console.log('name', name,value, current_balance)
        if(name){
            if(Array.isArray(form_data[name])){
                // if(!form_data.names.find(_name => _name.toLowerCase() === value.toLowerCase())){
                //     form_data[name].push(value)
                // }else{
                //     setErrorMessage('Anda tidak dapat menambahkan nama yang sama')
                // }
                // setFormData()
            }else{
							if(name == 'request_withdraw' && current_balance < value){
								console.log('in error')
								setErrorRequestWithdraws("Jumlah penarikan melebihi saldo saat ini.")
								return
							}
							setErrorRequestWithdraws("")
							setFormData(form_data => ({...form_data, [name]: value}))
							console.log('form_data', form_data)
                // form_data[name] = value
            }

        }
    }

	const handleRequestWithdraw = async () => {
		try {
			console.log('form_data', form_data)

			if(current_balance <= form_data['total_debit']){

				const { data: orgz_cash_flows, error } = await supabase
																.from('orgz_cash_flows')
																.insert([
																	form_data
																])
																.select()

				if(orgz_cash_flows){
					console.log('data withdraw', orgz_cash_flows)
					toast.success('Berhasil, Berhasil menambahkan penarikan. Mohon tunggu jawaban admin melalui WhatsApp')
					data.push(orgz_cash_flows)
					setModalOpen(false)
				}
			}else{
				toast.error('Gagal, Gagal menambahkan data penarikan')
				return
			}


		} catch (error) {
			toast.error('Gagal, Gagal menambahkan penarikan')
		}
	}

	return (
		<div className="max-w-full overflow-x-auto py-5">
			<div className="flex w-full items-center justify-between mb-5">
				{searchBar ? (
					< div className="flex md:w-[30%] w-[70%] items-center gap-5 rounded-lg px-3 py-2 bg-[#35a4e5]">
						<SearchOutline cssClasses={"!text-gray-300"} />
						<input
							type="text"
							placeholder="Search"
							value={searchTerm}
							onChange={handleSearch}
							className="w-full outline-none bg-transparent"
						/>
					</div>
				) : (
					<div></div>
				)}

				<div className="flex items-center gap-5">
					{addNew && (
						<button
							onClick={addNewItem}
							className="rounded-lg bg-[#35a4e5] p-2"
							// bg-[#303030]
						>
							<AddCircle
								width={"26px"}
								height={"26px"}
								cssClasses={"!text-[#99e5be] cursor-pointer"}
							/>
						</button>
					)}
					{excelExport && (
						<button
							onClick={exportToExcel}
							className="rounded-lg bg-[#35a4e5] p-2"
							// bg-[#303030]
						>
							<DownloadOutline
								width={"26px"}
								height={"26px"}
								cssClasses={"!text-[#99e5be] cursor-pointer"}
							/>
						</button>
					)}
					{removableRows && (
						<button
							onClick={handleDeleteSelectedRows}
							disabled={selectedRows.length === 0}
							className="rounded-lg bg-[#35a4e5] p-2"
						>
							{/* disabled:opacity-50 */}
							<TrashOutline
								width={"26px"}
								height={"26px"}
								cssClasses={`${
									selectedRows.length === 0
										? "cursor-default !text-blue-300"
										: "cursor-pointer !text-red-400"
								}`}
							/>
						</button>
					)}
				</div>
			</div>
			<div className="table-container">
				<table className="w-full overflow-x-auto max-w-[100vw]">
					<thead>
						<tr className="bg-[#35a4e5] h-[50px]">
							{/* bg-[#303030] */}
							<th className="hidden">Actions</th>
							<th className="font-medium text-gray-300 text-[16px] pl-5">#</th>
							{columns.map((column, index) => (
								<th
									key={index}
									onClick={() => handleSort(column)}
									className="font-medium text-gray-300 text-[16px] px-5 cursor-pointer"
								>
									<div className="flex items-center justify-center gap-[1px]">
										{column}
										{sortConfig?.key === column ? (
											sortConfig.direction === "asc" ? (
												<CaretUpOutline cssClasses={"!fill-blue-400"} />
											) : sortConfig.direction === "desc" ? (
												<CaretDownOutline cssClasses={"!fill-blue-400"} />
											) : (
												<CaretUpOutline cssClasses={"hidden"} />
											)
										) : (
											<CaretUpOutline cssClasses={"hidden"} />
										)}
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody className="text-center">
						{paginatedRows.map((row, rowIndex) => (
							<tr
								key={rowIndex}
								className={`h-[50px] cursor-pointer ${
									selectedRows.includes(row.id)
										? "bg-[#8cd5f3]"
										: rowIndex % 2
										? "bg-[#fefefe]"
										: "bg-[#dceffa]"
								}`}
								// String(rowIndex)
								// "bg-[#242424]"
								// "bg-[#1f1f1f]"
							>
								<td className="hidden">
									<input
										type="checkbox"
										checked={selectedRows.includes(String(rowIndex))}
										onChange={() => handleRowSelect(rowIndex)}
									/>
								</td>
								<td className="pl-5">{rowIndex + 1}</td>
								{columns.map((column, index) => {
									const value = row[column];
									const columnData = data[column];
									const classNames = columnData.classNames
										? columnData.classNames(value)
										: {};
									const content = columnData.renderValue
										? columnData.renderValue(value)
										: typeof value === "boolean" && columnData.renderBoolean
										? columnData.renderBoolean(value)
										: `${value}`;

									return (
										<td
											key={index}
											className={`${classNames}`}
											onClick={() => handleRowSelect(rowIndex)}
										>
											<div className="flex items-center justify-center whitespace-nowrap px-5">
												{content
													? content
													: columnData.renderBoolean
													? columnData.renderBoolean(value)
													: "false"}
											</div>
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="w-full mt-5 flex items-center justify-between">
				{pageSizeControl ? (
					<div className="rounded-lg py-[2px] pr-1 bg-[#99dcf8] w-fit text-gray-800">
						<select
							value={pageSize}
							onChange={(e) => setPageSize(Number(e.target.value))}
							className="bg-transparent w-[80px] px-1"
						>
							<option value={5}>5</option>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={50}>50</option>
						</select>
					</div>
				) : (
					<div></div>
				)}
				{pagination && (
					<div className="flex items-center gap-3">
						<button
							onClick={() => setCurrentPage(currentPage - 1)}
							disabled={currentPage === 0}
							className="rounded-lg bg-[#303030] p-2 disabled:opacity-50"
						>
							<ChevronBackOutline cssClasses={"!text-gray-500"} />
						</button>
						<span className="text-sm">
							Page {currentPage + 1} of {totalPages}
						</span>
						<button
							onClick={() => setCurrentPage(currentPage + 1)}
							disabled={currentPage + 1 === totalPages}
							className="rounded-lg bg-[#303030] p-2 disabled:opacity-50"
						>
							<ChevronForwardOutline cssClasses={"!text-gray-500"} />
						</button>
					</div>
				)}
			</div>

			<Modal isOpen={modal_open} form_field={form_data} onClose={() => setModalOpen(false)} >
							{/* Coupon */}
							{/* <div className="mt-2">
									<div className="flex items-center justify-between">
													<p className='text-sm font-medium'>
															Paket
													</p>
													<p className='text-sm font-bold'>
															{class_data.packets.find(packet => packet.code === form_data.packet)?.name}
													</p>
									</div>
							</div> */}
							<form action="#" className="pt-4 md:pt-6">
									{/* {form_data.packet === '1p' && (
											<div className="mb-4">
													<label htmlFor="names" className="block mb-2.5 text-sm font-medium text-heading">Nama</label>
													<input type="text" id="names" onChange={(e) => handleFormData('names', e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Nama peserta" required />
											</div>
									)} */}
									{/* // <div className="mb-4">
											//     <label htmlFor="names" className="block mb-2.5 text-sm font-medium text-heading">Nama</label>
											//     <input type="text" id="names" onChange={(e) => setFormData({names: [...form_data.names, e.target.value]})} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Nama peserta" required />
											// </div> */}
									{/* {(form_data.packet === '2p' || form_data.packet === '5p') && (

											// <div className='flex justify-center'>
											<>
													<MultiTextInput handleNewNames={handleNewNames} setName={setName} name={name} label='Nama' errorMessage={errorMessage}></MultiTextInput>
											</>

											// </div>

									)} */}
									{/* <input key={i} type='text' value={values[i]} onChange={(e) => handleInput(e,i) } /> */}
									{/* inputs.push(); */}
									{/* names, phone_number, packet, promo_code, discount, totalPrice, class_name */}
									<div className="mb-4">
											<label htmlFor="phone_number" className="block mb-2.5 text-sm font-medium text-heading">Jumlah Penarikan</label>
											<input type="text" id="request_withdraw" onChange={(e) => handleFormData('request_withdraw', e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Rp.0,-" required />
											{errorRequestWithdraw && (
												<span className="text-sm text-red-400">{errorRequestWithdraw}</span>
											)}
									</div>
									<div className="mb-4">
											<label htmlFor="phone_number" className="block mb-2.5 text-sm font-medium text-heading">Nama Bank</label>
											<input type="text" id="bank_name" onChange={(e) => handleFormData('bank_name', e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" required />
									</div>
									<div className="mb-4">
											<label htmlFor="phone_number" className="block mb-2.5 text-sm font-medium text-heading">No. Rekening</label>
											<input type="text" id="account_number" onChange={(e) => handleFormData('account_number', e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" required />
									</div>
									<div className="mb-4">
											<label htmlFor="phone_number" className="block mb-2.5 text-sm font-medium text-heading">Pemilik Rekening</label>
											<input type="text" id="account_name" onChange={(e) => handleFormData('account_name', e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" required />
									</div>
									<div className="mt-2">
                        <div className="flex items-center justify-between">
                                <>
                                <p className='text-sm font-medium'>
                                    Biaya Admin
                                </p>
                                <p className='text-sm p-2 bg-green-400 rounded-md'>
                                    {formatCurrency(form_data.admin_fee, 'IDR')}
                                </p>
                                </>
                            {/* {form_order.promo_code && ( */}
                            {/* )}  */}
                        </div>
                    </div>
									{/* <div className="mb-4">
											<label htmlFor="domicile" className="block mb-2.5 text-sm font-medium text-heading">No. Rekening</label>
											<select type="text" id="domicile" onChange={(e) => handleFormData('domicile', e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="08123456789">

											</select>
									</div>
									<div className="mb-4">
											<label htmlFor="job" className="block mb-2.5 text-sm font-medium text-heading">Pekerjaan/Kegiatan</label>
											<input type="text" id="job" onChange={(e) => handleFormData('job', e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="08123456789" required />
									</div> */}
									{/* Divider */}
									<div className="border-b border-default">

									</div>
									{/* Coupon */}
									<div className="mt-2">
											<div className="flex items-center justify-between">
													<p className='text-sm'>
															Total Request
													</p>
													<p className='text-2xl'>
															{`${formatCurrency(form_data['request_withdraw'] && !errorRequestWithdraw?form_data.request_withdraw - form_data.admin_fee : 0, 'IDR')}`}
													</p>
											</div>
									</div>
									{/* <div className="mb-4">
											<label htmlFor="discount" className="block mb-2.5 text-sm font-medium text-heading">No. Telepon (No WhatsApp Aktif)</label>
											<input type="text" id="discount" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="example@company.com" required />
									</div> */}
									{/* <div>
											<label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
											<input type="password" id="password" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="•••••••••" required />
									</div> */}
									{/* <div className="flex items-start my-6">
											<div className="flex items-center">
													<input id="checkbox-remember" type="checkbox" value="" className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"/>
													<label for="checkbox-remember" className="ms-2 text-sm font-medium text-heading">Remember me</label>
											</div>
											<a href="#" className="ms-auto text-sm font-medium text-fg-brand hover:underline">Lost Password?</a>
									</div> */}

									{/* <a
											href={`https://api.whatsapp.com/send?phone=6285216527392&text=Assalamu%27alaikum%2C%20tim%20RQA%2C%20ana%20ingin%20mendaftar%20kelas%20-${form_data.class_name}-%20untuk%20paket%20-${form_data.packet}-%3A%0A${form_data.names}%0A%0ANomor%20WA%3A%20${form_data.phone_number}%0AKode%20Promo%3A%20${form_data.promo_code?form_data.promo_code`(${form_data.discount}%)`:'-'}%20%20%0ATotal%20Bayar%3A%20Rp${formatCurrency(form_data?.totalPrice, 'IDR')}%0A%0AJazaakumullahu%20khayran.`}
											className="block text-white text-center text-base bg-amber-600 box-border border border-transparent rounded-md my-3 hover:bg-amber-700 focus:ring-4 focus:ring-brand-medium shadow-xs leading-5 rounded-base font-medium px-4 py-2.5 focus:outline-none w-full mb-3">Daftar</a> */}
											<button onClick={handleRequestWithdraw} type="button" className="block text-white text-center text-base bg-amber-600 box-border border border-transparent rounded-md my-3 hover:bg-amber-700 focus:ring-4 focus:ring-brand-medium shadow-xs leading-5 rounded-base font-medium px-4 py-2.5 focus:outline-none w-full mb-3"
												disabled={errorRequestWithdraw}
											>Bayar</button>
									{/* <div className="text-sm font-medium text-bo dy">Not registered? <a href="#" className="text-fg-brand hover:underline">Create account</a></div> */}
							</form>
			</Modal>

			{/* <Modal isMdetailOpen={modal_detail_open} form_field={form_data} onClose={() => setModalDetailOpen(false)} >
				<div className="mb-4">
					<label htmlFor="phone_number" className="block mb-2.5 text-sm font-medium text-heading">Jumlah Penarikan</label>
					<p className="text-xl font-medium">{formatCurrency(form_data.request_withdraw)} </p>
				</div>
				<div className="mb-4">
					<label htmlFor="phone_number" className="block mb-2.5 text-sm font-medium text-heading">Nama Bank</label>
					<p className="text-xl font-medium">{form_data.bank_name} </p>
				</div>
				<div className="mb-4">
					<label htmlFor="phone_number" className="block mb-2.5 text-sm font-medium text-heading">Nomor Rekening</label>
					<p className="text-xl font-medium">{form_data.account_number} </p>
				</div>
				<div className="mb-4">
					<label htmlFor="phone_number" className="block mb-2.5 text-sm font-medium text-heading">Pemilik Rekening</label>
					<p className="text-xl font-medium">{form_data.account_name} </p>
				</div>
				<div className="mb-4">
					<label htmlFor="phone_number" className="block mb-2.5 text-sm font-medium text-heading">Biaya Admin</label>
					<p className="text-xl font-medium">{formatCurrency(form_data.admin_fee)} </p>
				</div>
			</Modal> */}
		</div>
	);
};

export default NewDataTable;
