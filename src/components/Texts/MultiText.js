export default function MultiText ({handleNewNames, name, setName, label, errorMessage}) {
    return (
        <form className='flex flex-col justify-center mb-4'>
            <div className='flex'>
                <div className="flex-1 w-2/3 mr-2">
                    <label htmlFor="names" className="block mb-2.5 text-sm font-medium text-heading">{label} </label>
                    <input type="text" id="names" onChange={(e) => setName(e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm p-3 rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Ketik dan Enter untuk menginput nama peserta" required />
                </div>
                <button type='button' onClick={()=> handleNewNames(name)} className="flex-2 w-1/3 rounded-lg py-0 mt-7 text-white bg-blue-500 focus:bg-blue-600 focus:border-sm focus:border-blue-700">Tambah</button>
            </div>
            <p className='text-sm mt-2 text-[#ef4a44]'>
                {errorMessage}
            </p>

        </form>
    )
}