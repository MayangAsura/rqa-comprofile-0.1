import { useState, useEffect } from "react"

export const Select = ({label, options, setSelectedValue}) => {
    
    const [options_data, setOptions] = useState([])
    const [value, setValue] = useState()
    const [selectedOption, setSelectedOption] = useState({id: '', name:'', thumbnail: ''})

    useEffect(() => {
        if(options){
            console.log(options)
            setOptions(options)
        }
        if(value){
            setSelectedValue(value)
        }
        console.log('options from select', options_data, value, selectedOption)
    }, [options, value, selectedOption])

    const handleFormSelect = (value) =>{
        if(value){
            setValue(value)
            setSelectedOption(options_data.filter(option => option.id == value)[0])
        }
    }

    return (
        <>
        
            Code from select
            <label for="select" className="block text-sm/6 font-medium text-gray-900">{label}</label>
                <el-select id="select" name="selected" value={value} className="mt-2 block" onChange={(e) => handleFormSelect(e.target.value)}>
                <button type="button" className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                    <el-selectedcontent className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                    <img src={selectedOption.thumbnail} alt="" className="size-5 shrink-0 rounded-full bg-gray-100" />
                    <span className="block truncate">{selectedOption.name} </span>
                    </el-selectedcontent>
                    <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                    <path d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                    </svg>
                </button>

                <el-options anchor="bottom start" popover className="m-0 max-h-56 w-[50px] overflow-auto rounded-md bg-white p-0 py-1 text-base shadow-lg outline outline-1 outline-black/5 [--anchor-gap:theme(spacing.1)] data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in data-[leave]:[transition-behavior:allow-discrete] sm:text-sm">
                {options_data && options_data.map( (option, key) => (
                        <el-option key={key} value={option.id} className="group/option relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 focus:bg-indigo-600 focus:text-white focus:outline-none [&:not([hidden])]:block">
                        <div className="flex items-center">
                            <img src={option.thumbnail} alt="" className="size-5 shrink-0 rounded-full" />
                            <span className="ml-3 block truncate font-normal group-aria-selected/option:font-semibold">{option.name} </span>
                        </div>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-focus/option:text-white group-[:not([aria-selected='true'])]/option:hidden [el-selectedcontent_&]:hidden">
                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
                            <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                        </span>
                        </el-option>
                    )
                )}
                </el-options>
                </el-select>
        </>
    )

}