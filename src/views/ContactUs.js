import {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import Navbar from '../components/Navbars/AuthNavbar'
import Modal from '../components/Modals/Modal'
import Footer from 'components/Footers/Footer'
import { FaWhatsappSquare } from 'react-icons/fa'

const product = {
  name: 'At Tibyan Jilid 1',
  price: 'Rp35.000',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { id: 'white', name: 'White', classes: 'bg-white checked:outline-gray-400' },
    { id: 'gray', name: 'Gray', classes: 'bg-gray-200 checked:outline-gray-400' },
    { id: 'black', name: 'Black', classes: 'bg-gray-900 checked:outline-gray-900' },
  ],
  packets: [
    { name: 'Satu Orang', code: '1p', inStock: true, additionalAmount: 0 },
    { name: 'Berdua', code: '2p', inStock: true, additionalAmount: -5000 },
    { name: 'Kelompok berLima', code: '5p', inStock: true, additionalAmount: -8000 },
    // { name: 'XS', inStock: true },
    // { name: 'S', inStock: true },
    // { name: 'M', inStock: true },
    // { name: 'L', inStock: true },
    // { name: 'XL', inStock: true },
    // { name: '2XL', inStock: true },
    // { name: '3XL', inStock: true },
  ],
  description:
    'Kelas At Tibyan Jilid 1 adalah kelas ',
    // The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.
  highlights: [
    'Kelas Materi Terstruktur',
    'Menggunakan Kitab At Tibyan',
    'Pertemuan tiga kali per pekan',
    'Online via zoom',
    // 'Ultra-soft 100% cotton',
  ],
  details:
    'Bersama Al Ustadzah Reza Hafidzhahullah',
    // The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.
}
const reviews = { href: '#', average: 4, totalCount: 117 }

const availableClass = [
    {
        title: "Tilawah dan Tadabbur Al Qur'an", 
        slug:'tilawah-dan-tadabbur-al-quran-1256', 
        type: 'Remaja dan Anak-Anak', 
        description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", 
        price: 'Rp35.000',
        href: '#',
        breadcrumbs: [
            { id: 1, name: 'Men', href: '#' },
            { id: 2, name: 'Men', href: '#' },
            { id: 3, name: 'Clothing', href: '#' },
        ],
        images: [
            {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
            },
            {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
            },
            {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
            },
            {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
            },
        ],
        colors: [
            { id: 'white', name: 'White', classes: 'bg-white checked:outline-gray-400' },
            { id: 'gray', name: 'Gray', classes: 'bg-gray-200 checked:outline-gray-400' },
            { id: 'black', name: 'Black', classes: 'bg-gray-900 checked:outline-gray-900' },
        ],
        packets: [
            { name: 'Satu Orang', code:'1p', inStock: true, additionalAmount: 0 },
            { name: 'Berdua', code:'2p', inStock: true, additionalAmount: -5000 },
            { name: 'Kelompok berLima', code:'5p', inStock: true, additionalAmount: -8000 },
            // { name: 'XS', inStock: true },
            // { name: 'S', inStock: true },
            // { name: 'M', inStock: true },
            // { name: 'L', inStock: true },
            // { name: 'XL', inStock: true },
            // { name: '2XL', inStock: true },
            // { name: '3XL', inStock: true },
        ],
        // description:
        //     'Kelas At Tibyan Jilid 1 adalah kelas ',
            // The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.
        highlights: [
            'Kelas Materi Terstruktur',
            'Menggunakan Kitab At Tibyan',
            'Pertemuan tiga kali per pekan',
            'Online via zoom',
            // 'Ultra-soft 100% cotton',
        ],
        details:
            'Bersama Al Ustadzah Reza Hafidzhahullah',
        promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
    {title: "Tadrib & Ahkam Tajwid", slug:'tadrib-tadabbur-ahkam-tajwid-1257', type: 'Dewasa', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"],
        price: 'Rp35.000',
        href: '#',
        breadcrumbs: [
            { id: 1, name: 'Men', href: '#' },
            { id: 2, name: 'Men', href: '#' },
            { id: 3, name: 'Clothing', href: '#' },
        ],
        images: [
            {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
            },
            {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
            },
            {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
            },
            {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
            },
        ],
        colors: [
            { id: 'white', name: 'White', classes: 'bg-white checked:outline-gray-400' },
            { id: 'gray', name: 'Gray', classes: 'bg-gray-200 checked:outline-gray-400' },
            { id: 'black', name: 'Black', classes: 'bg-gray-900 checked:outline-gray-900' },
        ],
        packets: [
            { name: 'Satu Orang', code:'1p', inStock: true, additionalAmount: 0 },
            { name: 'Berdua', code:'2p', inStock: true, additionalAmount: -5000 },
            { name: 'Kelompok berLima', code:'5p', inStock: true, additionalAmount: -8000 },
            // { name: 'XS', inStock: true },
            // { name: 'S', inStock: true },
            // { name: 'M', inStock: true },
            // { name: 'L', inStock: true },
            // { name: 'XL', inStock: true },
            // { name: '2XL', inStock: true },
            // { name: '3XL', inStock: true },
        ],
        // description:
        //     'Kelas At Tibyan Jilid 1 adalah kelas ',
            // The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.
        highlights: [
            'Kelas Materi Terstruktur',
            'Menggunakan Kitab At Tibyan',
            'Pertemuan tiga kali per pekan',
            'Online via zoom',
            // 'Ultra-soft 100% cotton',
        ],
        details:
            'Bersama Al Ustadzah Reza Hafidzhahullah'
    },
    {title: "Aisar", type: 'Dewasa', slug:'aisar', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"],
        price: 'Rp35.000',
        href: '#',
        breadcrumbs: [
            { id: 1, name: 'Men', href: '#' },
            { id: 2, name: 'Men', href: '#' },
            { id: 3, name: 'Clothing', href: '#' },
        ],
        images: [
            {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
            },
            {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
            },
            {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
            },
            {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
            },
        ],
        colors: [
            { id: 'white', name: 'White', classes: 'bg-white checked:outline-gray-400' },
            { id: 'gray', name: 'Gray', classes: 'bg-gray-200 checked:outline-gray-400' },
            { id: 'black', name: 'Black', classes: 'bg-gray-900 checked:outline-gray-900' },
        ],
        packets: [
            { name: 'Satu Orang', code:'1p', inStock: true, additionalAmount: 0 },
            { name: 'Berdua', code:'2p', inStock: true, additionalAmount: -5000 },
            { name: 'Kelompok berLima', code:'3p', inStock: true, additionalAmount: -8000 },
            // { name: 'XS', inStock: true },
            // { name: 'S', inStock: true },
            // { name: 'M', inStock: true },
            // { name: 'L', inStock: true },
            // { name: 'XL', inStock: true },
            // { name: '2XL', inStock: true },
            // { name: '3XL', inStock: true },
        ],
        // description:
        //     'Kelas At Tibyan Jilid 1 adalah kelas ',
            // The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.
        highlights: [
            'Kelas Materi Terstruktur',
            'Menggunakan Kitab At Tibyan',
            'Pertemuan tiga kali per pekan',
            'Online via zoom',
            // 'Ultra-soft 100% cotton',
        ],
        details:
            'Bersama Al Ustadzah Reza Hafidzhahullah',
    },
    {title: "Daurah/Kajian Ilmu Syar'i", slug: 'daurah-kajian-ilmu-syari', type: 'Dewasa', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"],
        price: 'Rp35.000',
        href: '#',
        breadcrumbs: [
            { id: 1, name: 'Men', href: '#' },
            { id: 2, name: 'Men', href: '#' },
            { id: 3, name: 'Clothing', href: '#' },
        ],
        images: [
            {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
            },
            {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
            },
            {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
            },
            {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
            },
        ],
        colors: [
            { id: 'white', name: 'White', classes: 'bg-white checked:outline-gray-400' },
            { id: 'gray', name: 'Gray', classes: 'bg-gray-200 checked:outline-gray-400' },
            { id: 'black', name: 'Black', classes: 'bg-gray-900 checked:outline-gray-900' },
        ],
        packets: [
            { name: 'Satu Orang', code:'1p', inStock: true, additionalAmount: 0 },
            { name: 'Berdua', code:'2p', inStock: true, additionalAmount: -5000 },
            { name: 'Kelompok berLima', code:'5p', inStock: true, additionalAmount: -8000 },
            // { name: 'XS', inStock: true },
            // { name: 'S', inStock: true },
            // { name: 'M', inStock: true },
            // { name: 'L', inStock: true },
            // { name: 'XL', inStock: true },
            // { name: '2XL', inStock: true },
            // { name: '3XL', inStock: true },
        ],
        // description:
        //     'Kelas At Tibyan Jilid 1 adalah kelas ',
            // The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.
        highlights: [
            'Kelas Materi Terstruktur',
            'Menggunakan Kitab At Tibyan',
            'Pertemuan tiga kali per pekan',
            'Online via zoom',
            // 'Ultra-soft 100% cotton',
        ],
        details:
            'Bersama Al Ustadzah Reza Hafidzhahullah'
    },
    // {title: "T", type: 'Remaja dan Anak-Anak', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
  ]
  const promo_codes = [
    {
        id: '1', code: 'DESEMBERCERIA', rules: { packet: '5', category: 'white'}, discount_amount: '10', discount_nominal: 25000
    },
    {
        id: '2', code: 'DESEMBERMEMANFAATKANWAKTULUANGDENGANBAIK', rules: { packet: '5', category: 'gray'}, discount_amount: '10', discount_nominal: 25000
    }
  ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const contacts = [
    {
        name: 'Nomor WhatsApp', type: 'phone', items: [{label: 'Admin 1', value: '(+62)843218765'}, {label: 'Admin 2', value: '(+62)843218766'}, {label: 'Admin 3', value: '(+62)843218767'}]
    },
    {
        name: 'Alamat', type: 'address', items: [{label: 'Sekretariat', value: 'Jl. Abu Maryam no. 15'}]
    },
    {
        name: 'Email', type: 'email', items: [{label: 'Email Pendaftaran', value: 'rqa.regist@gmail.com'}, {label: 'Email Support', value: 'rqa.support@gmail.com'}, {label: 'Email Umum', value: 'rqa.general@gmail.com'}, {label: 'Email Newsletter & Info', value: 'rqa.newsandinfo@gmail.com'}]
    }
]

export default function ContactUs() {
    const [class_data, setClassData] = useState(product)
    const [order_data, setOrderData] = useState({})
    const [modal_open, setModalOpen] = useState(false)
    const [form_order, setFormOrder] = useState({
        names: [],
        phone_number: '', 
        packet: class_data.packets[0].code,
        promo_code: '',
        discount: '',
        totalPrice: '',
        class_name: product.name
    })
    const [name, setName] = useState("")
    const [isValidPromoCode, setIsValidPromoCode] = useState(false)
    const [checkPromoMessage, setCheckPromoMessage] = useState('')
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    console.log(id)
    // const names, phone_number, packet, promo_code, discount, totalPrice, class_name
    const navigate = useNavigate()
    
    useEffect(() => {
        if(id){
            const data = availableClass.filter(i =>  i.slug == id)[0]
            console.log(data)
            setClassData(data)
        }
        // if(modal_open)
        // console.log(modal_open)
        console.log('class_data', class_data, id, form_order.packet)
        // if(form_order.names){
        //     console.log('form_order', form_order)
        //     const new_names = form_order.names.map((name,key) => form_order.names.join(`${key+1}${name}%0A`))
        //     form_order.names = new_names
        // // setModalOpen(true)
        //     // window.location.href= ``
        // }
    }, [id, class_data, form_order.names, form_order.packet, checkPromoMessage])

    const checkPromoCode = (code) => {
        // || form_order.category == ''
        
        if(form_order.packet === '' ){
            setIsValidPromoCode(true)
            setCheckPromoMessage('Mohon pilih kategori kelas dan paket terlebih dahulu')

        }
        // && promo_code.rules.includes(form_order.category)
        if(promo_codes.filter(promo_code => promo_code.code === code && promo_code.rules.includes(form_order.packet)).length > 0){
            setIsValidPromoCode(true)
            form_order.discount = promo_codes.find(promo_code => promo_code.code == code).discount_amount
            setCheckPromoMessage(`Kupon valid. Anda mendapat potongan sebesar ${form_order.discount}`)
        }
        
    }

    const handleNewNames = (name) => {
        console.log('name', name)
        if(name && form_order.packet < form_order.names.length)
            form_order.names.push(name)
            // setFormOrder(form_order => form_order.names.push(name))
        console.log(form_order)
    }
    const handleFormData = (name, value) => {
        console.log('name', name,value)
        if(name && !isValidPromoCode){
            if(Array.isArray(form_order[name])){
                form_order[name].push(value)
            }else{
                setFormOrder(form_order => ({...form_order, [name]: value}))
                // form_order[name] = value
            }
            
        }
        console.log('form_order', form_order)
    }

    const handleRegist = () => {
        const new_names = form_order.names.map((name,key) => form_order.names.join(`${key+1}${name}%0A`))
        console.log(new_names)
        // setModalOpen(true)
        window.location.href= `https://api.whatsapp.com/send?phone=6285216527392&text=Assalamu%27alaikum%2C%20tim%20RQA%2C%20ana%20ingin%20mendaftar%20kelas%20-${form_order.class_name}-%20untuk%20paket%20-${form_order.packet}-%3A%0A${new_names}%0ANomor%20WA%3A%20-${form_order.phone_number}-%0AKode%20Promo%3A%20-${form_order.promo_code}-%20(-Rp-${form_order.discount}-)%20%0ATotal%20Bayar%3A%20Rp-${form_order.totalPrice}-%0A%0AJazaakumullahu%20khayran.`
        // navigate(`https://api.whatsapp.com/send?phone=6285216527392&text=Assalamu%27alaikum%2C%20tim%20RQA%2C%20ana%20ingin%20mendaftar%20kelas%20-${class_name}-%20untuk%20paket%20-${packet}-%3A%0A${new_names}%0ANomor%20WA%3A%20-${phone_number}-%0ATotal%20Bayar%3A%20Rp-${totalPrice}-%0AJazaakumullahu%20khayran.`)
        // 1.%20Nama%201%0A2.%20Nama%202
    }
  return (
    <>
        <Navbar transparent={false} />
        <main>
        <div className="bg-white mt-12">
        <div className="pt-6">
            {/* <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                {product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                    <div className="flex items-center">
                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                        {breadcrumb.name}
                    </a>
                    <svg
                        fill="currentColor"
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                    >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                    </div>
                </li>
                ))}
                <li className="text-sm">
                <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                    {product.name}
                </a>
                </li>
            </ol>
            </nav> */}

            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-8 lg:px-8">
            {/* <img
                alt={product.images[0].alt}
                src={product.images[0].src}
                className="row-span-2 aspect-[3/4] size-full rounded-lg object-cover max-lg:hidden"
            /> */}
            {/* <img
                alt={class_data.images[1].alt}
                src={class_data.images[1].src}
                className="w-full size-full rounded-lg object-cover max-lg:hidden"
                // col-start-2 aspect-[3/2]
            /> */}
            {/* <img
                alt={product.images[2].alt}
                src={product.images[2].src}
                className="col-start-2 row-start-2 aspect-[3/2] size-full rounded-lg object-cover max-lg:hidden"
            /> */}
            {/* <img
                alt={product.images[3].alt}
                src={product.images[3].src}
                className="row-span-2 aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-[3/4]"
            /> */}
            </div>
            <div className=''>
                <div
                    className="absolute top-0 w-full h-64 bg-center bg-cover -hue-rotate-15"
                    // style={{
                    // backgroundImage: "url(" + backgroundImage2 + ")",
                    // // {backgroundImage},
                    // // "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
                    // }}
                >
                    <span
                    id="blackOverlay"
                    className="w-full h-full absolute opacity-75 bg-[#65abe444]"
                    ></span>
                    <div className="flex mt-32 justify-center mx-auto">
                        <div className="items-center flex ">
                        <div className="w-full px-4 ml-auto mr-auto text-center">
                            <div className="pr-12">
                            <h1 className="text-black font-semibold text-4xl text-shadow-lg/20">
                                Tentang Kami
                            </h1>
                            {/* <p className="mt-4 text-lg text-blueGray-200">
                                Media pembelajaran ilmu syar'i berlandaskan Al Qur'an dan As
                                Sunnah sesuai pemahaman para shahabat yang dikhususkan untuk
                                muslimah dan anak-anak.
                            </p> */}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            <div
                    className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                    style={{ transform: "translateZ(0)" }}
                >
                    <svg
                    className="absolute bottom-0 overflow-hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    version="1.1"
                    viewBox="0 0 2560 100"
                    x="0"
                    y="0"
                    >
                    <polygon
                        className="text-blueGray-200 fill-current"
                        points="2560 0 2560 100 0 100"
                    ></polygon>
                    </svg>
                </div>
            </div>

            {/* Product info */}
            <div className="flex-row justify-center mt-32 mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
                {/* lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 */}
            {/* <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{class_data.name}</h1>
            </div> */}

                {/* {contacts && contacts.map (

                )} */}

            {/* Options */}
            {contacts && contacts.map(contact =>
                <div className="relative block mt-4 mb-5 cols-span-8 lg:cols-span-12 lg:mt-0 p-5 rounded-2xl border border-gray-300 bg-white border-md shadow-sm">
                    <h2 className="sr-only">Informasi Kontak</h2>
                    <div className=''>
                        <p className="text-xl tracking-tight text-gray-900">{contact.name} </p>
                            {contact.items.map(item => (
                                <div className="flex justify-between max-w-4xl">
                                        <>
                                            <p className="text-base mt-3">{item.label} </p>
                                            <div className="flex justify-center items-center gap-2">
                                                <p className='text-center text-base mr-2'>{item.value} </p>
                                                {contact.type == 'phone' &&
                                                    <a target='_blank' rel='noopener noreferrer' href={`https://wa.me/62843218765`}>
                                                        <FaWhatsappSquare size='24px' fill='green'/>
                                                    </a>
                                                }
                                            </div>
                                        </>

                                </div>
                            )) }
                        {/* <div className="flex justify-between max-w-xl">
                            <p className="text-base mt-3">Admin 2</p>
                            <div className="flex justify-center items-center gap-2">
                                <p className='text-center text-base mr-2'>(+62)843218766</p>
                                <a target='_blank' rel='noopener noreferrer' href={`https://wa.me/62843218766`}>
                                    <FaWhatsappSquare size='24px' fill='green'/>
                                </a>
                            </div>
                        </div>
                        <div className="flex justify-between max-w-xl">
                            <p className="text-base mt-3">Admin 3</p>
                            <div className="flex justify-center items-center gap-2">
                                <p className='text-center text-base mr-2'>(+62)843218767</p>
                                <a target='_blank' rel='noopener noreferrer' href={`https://wa.me/62843218767`}>
                                    <FaWhatsappSquare size='24px' fill='green'/>
                                </a>
                            </div>
                        </div> */}
                    </div>


                    {/* Contact */}
                    <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    {/* <div className="flex items-center">
                        <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                            key={rating}
                            aria-hidden="true"
                            className={classNames(
                                reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                'size-5 shrink-0',
                            )}
                            />
                        ))}
                        </div>
                        <p className="sr-only">{reviews.average} out of 5 stars</p>
                        <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        {reviews.totalCount} reviews
                        </a>
                    </div> */}
                    </div>

                    <form className="mt-10">
                    {/* Colors */}

                    {/* Sizes */}

                    {/* Coupon */}

                    {/* Coupon */}


                    {/* <button
                        type="button"
                        data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 disabled:bg-gray-500 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setModalOpen(true)}
                        disabled={form_order.packet === ''}

                    >
                        Daftar via Admin
                    </button> */}
                    </form>
                </div>

            )}
            {/* {modal_open && ( */}
            
                {/* // <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
                // Toggle modal
                // </button> */}
            {/* )} */}

            </div>
        </div>
        </div>
        
        </main>
        <Footer />
    </>
  )
}
