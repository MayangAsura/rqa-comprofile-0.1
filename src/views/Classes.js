
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import Navbar from '../components/Navbars/AuthNavbar'
import BlockInTextCard from '../components/Cards/BlockInTextCard'
import Footer from 'components/Footers/Footer'

const sortOptions = [
  { name: 'Terpopuler', href: '#', current: true, ordered: 'most-popular'},
  { name: 'Rating Terbaik', href: '#', current: false, ordered: 'best-rating' },
  { name: 'Terbaru', href: '#', current: false, ordered: 'newest'},
  { name: 'Harga Terendah', href: '#', current: false, ordered: 'lowest-price' },
  { name: 'Harga Tertinggi', href: '#', current: false, ordered: 'highest-price' },
  // { name: 'Newest', href: '#', current: false },
  // { name: 'Price: Low to High', href: '#', current: false },
  // { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: "Tashih dan Tilawah Al Qur'an", href: '#', id: 'abcde123' },
  { name: "Tahfidz Al Qur'an", href: '#', id: 'abcde124' },
  { name: "Kelas Bahasa Arab", href: '#', id: 'abcde125'},
  { name: "Dauroh/kajian rutin ilmu syar’i", href: '#', id: 'abcde126' }
  // { name: 'Totes', href: '#' },
  // { name: 'Backpacks', href: '#' },
  // { name: 'Travel Bags', href: '#' },
  // { name: 'Hip Bags', href: '#' },
  // { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
  {
    id: 'categories',
    name: 'Category',
    options: [
      { value: 'anak-anak', label: 'Anak-Anak', checked: false },
      { value: 'remaja', label: 'Remaja', checked: false },
      { value: 'dewasa', label: 'Dewasa', checked: false },
      { value: 'umum', label: 'Umum', checked: false },
      // { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      // { value: 'sale', label: 'Sale', checked: false },
      // { value: 'travel', label: 'Travel', checked: true },
      // { value: 'organization', label: 'Organization', checked: false },
      // { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'prices',
    name: 'Harga',
    options: [
      { value: 'free', label: 'Gratis', checked: false },
      { value: 'paid', label: 'Berbayar', checked: false },
      // { value: 'blue', label: 'Blue', checked: true },
      // { value: 'brown', label: 'Brown', checked: false },
      // { value: 'green', label: 'Green', checked: false },
      // { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  // {
  //   id: 'color',
  //   name: 'Color',
  //   options: [
  //     { value: 'white', label: 'White', checked: false },
  //     { value: 'beige', label: 'Beige', checked: false },
  //     { value: 'blue', label: 'Blue', checked: true },
  //     { value: 'brown', label: 'Brown', checked: false },
  //     { value: 'green', label: 'Green', checked: false },
  //     { value: 'purple', label: 'Purple', checked: false },
  //   ],
  // },
  // {
  //   id: 'size',
  //   name: 'Size',
  //   options: [
  //     { value: '2l', label: '2L', checked: false },
  //     { value: '6l', label: '6L', checked: false },
  //     { value: '12l', label: '12L', checked: false },
  //     { value: '18l', label: '18L', checked: false },
  //     { value: '20l', label: '20L', checked: false },
  //     { value: '40l', label: '40L', checked: true },
  //   ],
  // },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const availableClass = [
  {title: "Tilawah dan Tadabbur Al Qur'an", slug:'tilawah-dan-tadabbur-al-quran-1256', subcategory_id: 'abcde123', type: 'anak-anak', thumbnails: '', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", rating: 4, created_at: new Date().toISOString(), views: 12, price: 0, promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
  {title: "Tadrib & Ahkam Tajwid", slug:'tadrib-tadabbur-ahkam-tajwid-1257', subcategory_id: 'abcde124', type: 'dewasa', thumbnails: '', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", rating: 4, created_at: new Date().toISOString(), views: 20, price: 300000, promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
  {title: "Aisar", slug:'aisar', subcategory_id: 'abcde125', type: 'remaja', thumbnails: '', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", rating: 5, created_at: new Date().toISOString(), views: 25, price: 250000, promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
  {title: "Daurah/Kajian Ilmu Syar'i", slug: 'daurah-kajian-ilmu-syari', subcategory_id: 'abcde126',type: 'dewasa', thumbnails: '', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", rating: 4, created_at: new Date().toISOString(), views: 5, price: 300000, promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
  // {title: "T", type: 'Remaja dan Anak-Anak', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
]

export default function Classes() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [toggle, setToggle] = useState('grid')
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [classes, setClasses] = useState(availableClass)
  const [filters_data, setFiltersData] = useState({

  })
  const [sort_by, setSortBy] = useState('most-popular')
  const [sortOptions, setSortOptions] = useState(
    [
      { name: 'Terpopuler', href: '#', current: true, ordered: 'most-popular'},
      { name: 'Rating Terbaik', href: '#', current: false, ordered: 'best-rating' },
      { name: 'Terbaru', href: '#', current: false, ordered: 'newest'},
      { name: 'Harga Terendah', href: '#', current: false, ordered: 'lowest-price' },
      { name: 'Harga Tertinggi', href: '#', current: false, ordered: 'highest-price' },
      // { name: 'Newest', href: '#', current: false },
      // { name: 'Price: Low to High', href: '#', current: false },
      // { name: 'Price: High to Low', href: '#', current: false },
    ]
  )

  useEffect(() => {
    if(Object.keys(filters_data).length > 0){
      // for()
      // setClasses(classes.filter(i => filters_data.indexOf(i) =))
      // setClasses(availableClass)
      console.log(classes)
      console.log('filters_data', filters_data)
      setClasses(availableClass.filter(item => Object.entries(filters_data).every(([key, values]) => key=='categories'? values.includes(item.type): key=='prices'? values.includes('free')? item.price ==0 : item.price > 0 : item[key] === values)))
      console.log(classes)
  //     setClasses(classes.filter((node) =>
  //   filters_data.length > 0
  //     ? sfilters_data.every((filter_data) =>
  //         node.tags.map((tag) => tag.slug).includes(filter_data)
  //       )
  //     : classes
  // ))
      // Keep original classes in state

      // When applying new filters
      // setFilteredClasses(prev => {
      //   const sourceArray = prev.length === 0 ? classes : prev;
        
      //   return sourceArray.filter(item => {
      //     return Object.entries(filters_data).every(([key, values]) => {
      //       if (!values || values.length === 0) return true;
            
      //       if (key === 'categories') return values.includes(item.type);
      //       if (key === 'prices') {
      //         const hasFree = values.includes('free');
      //         const hasPaid = values.includes('paid');
      //         if (hasFree && hasPaid) return true;
      //         if (hasFree) return item.price === 0;
      //         if (hasPaid) return item.price > 0;
      //         return true;
      //       }
            
      //       return values.includes(item[key]);
      //     });
      //   });
      // });
      // classes.push()
      // setClasses([...classes, )
      // setClasses(classes.filter(i => {return (!Object.keys(filters_data).includes('price')? Object.keys(i).toLocaleString().toLowerCase().includes(Object.keys(filters_data)): i.price===0?i.price>0:"") }))
      // console.log('classes', classes, classes.filter(i => i.price ===0),classes.filter(([key, value]) => (!Object.keys(filters_data).includes('price')? Object.keys(filters_data).map((fkey) => key == fkey? Object.values(filters_data).includes(value):''):filters_data['price']==='free' && key=='price'?value===0:value>0) ))
      // console.log(classes.filter(item => {Object.entries(filters_data).map(([key, value]) => console.log(key, value)&& key=='category'? item.type == value : item[key] == value).join(' && ')}))
      
      //  i== Object.keys(classes).includes(Object.keys(filters_data))
      // setClasses(classes.filter((i, key) => Object.keys(filters).map((j, k) => Object.values(Object.keys(classes))[key] == Object.values(Object.keys(filters))[k] )))z
    }


    if(sort_by){
      sortClasses(sort_by)
      console.log('sort_by', sort_by, classes)
    }
    
    console.log(sortOptions)

    // Apply sorting
  // if (sort_by) {
    
  // }
  
  // setClasses(classes);
    
  }, [filters_data, sort_by])

  const handleSort = (arr, field, order) => {
  return arr.sort((a, b) => {
    if(order == 'asc'){
      if (a[field] < b[field]) { return 1; }
      if (b[field] < a[field]) { return -1; }
    }
    if(order == 'desc'){
      if (a[field] < b[field]) { return -1; }
      if (b[field] < a[field]) { return 1; }
    }
    return 0;
  })
}

const sortDesc = (arr, field) => {
  return arr.sort((a, b) => {
    if (a[field] < b[field]) { return -1; }
    if (b[field] < a[field]) { return 1; }
    return 0;
  })
}

  function dynamicSort(property, order = 'asc') {
    return (a, b) => {
      if(order=='asc') return a[property] - b[property] == 1
      else return b[property] - a[property] == -1
      // const comparison = 
      // return order === 'desc' ? -comparison : comparison
    }
  }

  const sortClasses = async (sort_by) => {
    
    // if(order === 'most_popular'){
    //   const list_classes = classes.sort(dynamicSort('views', 'desc'))
    //   setClasses(list_classes)
    // }
    // // if(order === 'added'){
    // //   const list_classes = availableClass.sort(dynamicSort('views', 'desc'))
    // //   setClasses(list_classes)
    // // }
    // if(order === 'best-rating'){
    //   // const list_classes = classes || availableClass.sort(sortDesc(classes || availableClass, 'rating'))
    //   const list_classes = classes.sort(handleSort(classes, 'rating', 'desc'))
    //   setClasses(list_classes)
    // }
    // if(order === 'lowest_price'){
    //   // const list_classes = classes || availableClass.sort(sortAsc(classes || availableClass, 'price'))
    //   const list_classes = handleSort(classes, 'price', 'asc')
    //   setClasses(list_classes)
    // }
    // if(order === 'highest_price'){
    //   // const list_classes = classes || availableClass.sort(sortDesc(classes || availableClass, 'price'))
    //   const list_classes = handleSort(classes, 'price', 'desc')
    //   console.log('sort', list_classes, classes.sort(handleSort(classes, 'price', 'desc')))
    //   setClasses(list_classes)
    // }
      // setClasses(availableClass.sort((a, b) => a.views - b.views))

      switch (sort_by) {
      case 'most-popular':
        setTimeout(() => {
          setClasses(classes.sort((a, b) => b.views - a.views))
        }, 200);
        break;
      case 'best-rating':
        setTimeout(() => {
          setClasses(classes.sort((a, b) => b.rating - a.rating))
          
        }, 200);
        break;
      case 'newest':
        setTimeout(() => {
          
        }, 200);
        setClasses(classes.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        ))
        break;
      case 'lowest-price':
        setTimeout(() => {
          setClasses(classes.sort((a, b) => a.price - b.price))
        }, 200);
        break;
      case 'highest-price':
        setTimeout(() => {
          setClasses(classes.sort((a, b) => b.price - a.price))
        }, 200);
        break;
    }

    setSortOptions(sortOptions.map(sort => sort.ordered == sort_by? {...sort, current: true} : {...sort, current: false}))

  }

  const handleSubCategory = (subCategory_id) => {
    // setClasses(availableClass)

    setClasses(availableClass.filter(item => item.subcategory_id == subCategory_id))
    // setTimeout(() => {
      
    // }, 500);
  }


  return (
    <>
    <Navbar transparent={false} />
    <main>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
            />

            <div className="fixed inset-0 z-40 flex">
              <DialogPanel
                transition
                className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
              >
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                    {/* {filters.map((category) => (
                      <li key={category.name}>
                        <a href={category.href} className="block px-2 py-3" onClick={() => setFiltersData({categ: category.id})} >
                          {category.name}
                        </a>
                      </li>
                    ))} */}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                            <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    defaultValue={option.value}
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-checked:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-indeterminate:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </DialogPanel>
            </div>
          </Dialog>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Kelas</h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions?.map((option) => (
                        <MenuItem key={option.name}>
                          <button
                            // href={option.href}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                            )}
                            type='button'
                            onClick={()=> setSortBy(option.ordered)}
                          >
                            {option.name}
                          </button>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                {toggle === 'grid' && (
                  <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                    onClick={() => setToggle('grid')}
                  >
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon aria-hidden="true" className="size-5" />
                  </button>
                )}
                { toggle === 'list' && (
                  <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                    onClick={() => setToggle('list')}
                  >
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon aria-hidden="true" className="size-5" />
                  </button>

                )}
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                    {subCategories?.map((subCategory) => (
                      <li key={subCategory.name}>
                        <p onClick={() => handleSubCategory(subCategory.id)} >{subCategory.name}</p>
                        {/* <p onClick={() => {
  const filtered = classes.filter(classItem => 
    classItem.subcategory_id === subCategory.id
  );
  setClasses(filtered);
}}>
  {subCategory.name}
</p> */}
                      </li>
                    ))}
                  </ul>

                  {filters?.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                            <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    defaultValue={option.value}
                                    defaultChecked={option.checked}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    onChange={(e) => e.target.checked?setFiltersData(prev => ({...prev, [section.id]:  prev[section.id]? [...prev[section.id], option.value]: [option.value]})): setFiltersData(prev => ({...prev, [section.id]:  prev[section.id]? prev[section.id].filter(value => value!=option.value): []}))}
                                    // onChange={(e) => e.target.checked?setFiltersData({[section.id]: Array(filters_data[section.id]).push(option.value)}):""}
                                    // section.id==='price'?:setFiltersData({type: option.value})
                                    // checked={(value) => value===true?setFiltersData({[section.id]: option.value}): ""}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-checked:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-indeterminate:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">{/* Your content */}
                  <div className="flex flex-wrap">
                      
                        {
                          classes.map( (className, index) => (
                            <div key={index} className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                            <div className="relative flex flex-col min-w-0 p-5 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                              <BlockInTextCard
                                tag={className.title}
                                text={
                                  <>
                                    <strong>Untuk {className.type?.toUpperCase()}.</strong> {className.description}
                                  </>
                                }
                                slug={className.slug}
                                runningText={className.promoteText}
                                type={className.type}
                                description={className.description}
                                created_at={className.created_at}
                                price={className.price}
                                views={className.views}
                                rating={className.rating}
                              />
                            </div>
                            </div>
                          )

                          )
                        }

                        {/* <SquishyCard name="Tilawah dan Tadabbur Al Qur'an" type="Remaja" paid='true' description="" /> */}
                    {/* <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">

                    </div> */}
                    {/* <ProductCard/> */}
                      {/* <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                        <img
                            alt="..."
                            src={"assets/img/1.png"}
                            className="w-full align-middle rounded-t-lg"
                          />
                        <h5 className="text-xl font-bold">
                          Tilawah dan Tadabbur Al Qur'an
                        </h5>
                        <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                          The extension comes with three pre-built pages to help
                          you get started faster. You can change the text and
                          images and you're good to go.
                        </p>
                        <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150">
                          Chat Admin
                        </button>
                      </div> */}
                    
                    
                  </div>
                </div>
              </div>
            </section>
          </main>
          
        </div>
      </div>

    </main>
    <Footer />

    </>
  )
}
