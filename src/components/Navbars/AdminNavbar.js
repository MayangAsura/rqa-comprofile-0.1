import React from "react";
import { useState, useEffect } from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation()
  const page = location.pathname.split('/')[2]

  const [page_title, setPageTitle] = useState(page || 'Dashboard')

  useEffect(() => {
    if(page==='clasess'){
      setPageTitle('Produk')
    }
    if(page==='transactions'){
      setPageTitle('Transaksi')
    }
  }, [page])
  return (
    <>
      {/* Navbar */}
      <nav className="relative bg-lightBlue-600 top-0 left-0 w-full z-10 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {page_title}
          </a>
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>

      {/* <!-- Breadcrumb --> */}
      <nav className="flex p-3 bg-neutral-secondary-medium border border-default-medium rounded-base" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a href="" className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand">
              <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/></svg>
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center space-x-1.5">
              <svg className="w-3.5 h-3.5 rtl:rotate-180 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/></svg>
              <a href="#" className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand">Projects</a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center space-x-1.5">
              <svg className="w-3.5 h-3.5 rtl:rotate-180 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/></svg>
              <span className="inline-flex items-center text-sm font-medium text-body-subtle">Flowbite</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* End Navbar */}
    </>
  );
}
