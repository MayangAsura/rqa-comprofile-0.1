import {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import Navbar from '../components/Navbars/AuthNavbar'
import Modal from '../components/Modals/Modal'
import Footer from '../components/Footers/Footer'
import MultiTextInput from '../components/Texts/MultiText.js'
import { CheckCircleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { FaRegCircleXmark} from 'react-icons/fa6'
import axios from 'axios'

const product = {
  name: 'At Tibyan Jilid 1',
  price: '35000',
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
        price: '35000',
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
        price: '35000',
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
        price: '35000',
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
        price: '35000',
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
        id: '1', code: 'DESEMBERCERIA', rules: { packet: '5p', category: 'white'}, discount_amount: '10', discount_nominal: 25000
    },
    {
        id: '2', code: 'DESEMBERMEMANFAATKANWAKTULUANGDENGANBAIK', rules: { packet: '5p', category: 'gray'}, discount_amount: '10', discount_nominal: 25000
    }
  ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const PAYMENT_URL = process.env.REACT_APP_PAYMENT_URL || "http://localhost:5050"

export default function DetailClass() {
    const [class_data, setClassData] = useState(product)
    const [order_data, setOrderData] = useState({})
    const [modal_open, setModalOpen] = useState(false)
    const [form_order, setFormOrder] = useState({
        names: [],
        phone_number: '', 
        packet: class_data.packets[0].code,
        promo_code: '',
        discount: '',
        totalPrice: class_data.price,
        class_name: class_data.name,
        admin_fee: 0
    })
    const [name, setName] = useState("")
    const [isValidPromoCode, setIsValidPromoCode] = useState(false)
    const [checkPromoMessage, setCheckPromoMessage] = useState('')
    const [checkPromoColor, setCheckPromoColor] = useState('[#14873e]')
    const [checkPromoIcon, setCheckPromoIcon] = useState(CheckCircleIcon)
    const [errorMessage, setErrorMessage] = useState('')
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
        // const new_names = form_order.names.map([name,key] => )
        console.log(form_order.names.join(", "))
    }, [id, class_data, form_order.names, form_order.packet, name])

    const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
    }
    const checkPromoCode = async () => {
        // || form_order.category == ''
        setIsValidPromoCode(false)
        setCheckPromoMessage('')
        setCheckPromoColor('')
        // setCheckPromoIcon('')
        const code = form_order.promo_code
        const includes = promo_codes.filter(promo_code => promo_code.rules.packet.includes(form_order.packet))
        console.log(form_order.packet, code, includes)
        if(form_order.packet === '' ){
            setIsValidPromoCode(false)
            setCheckPromoColor('[#ef4a44]')
            setCheckPromoIcon(XMarkIcon)
            setCheckPromoMessage(` Mohon pilih kategori kelas dan paket terlebih dahulu.`)
            // <XMarkIcon></XMarkIcon>, 

        }
        // && promo_code.rules.includes(form_order.category)
        if(promo_codes.filter(promo_code => promo_code.code === code && promo_code.rules.packet.includes(form_order.packet)).length > 0){
            setIsValidPromoCode(true)
            setCheckPromoColor('[#14873e]')
            const promo_code = promo_codes.find(promo_code => promo_code.code == code)
            form_order.discount = promo_code.discount_amount
            form_order.totalPrice = class_data.price - promo_code.discount_nominal
            setCheckPromoMessage(` Kupon valid. Anda mendapat potongan sebesar ${form_order.discount}%.`)
            // setCheckPromoMessage(`Kupon valid. Anda mendapat potongan sebesar ${form_order.discount}%.`)
            
        }else{
            setIsValidPromoCode(false)
            setCheckPromoColor('[#ef4a44]')
            setCheckPromoIcon(XMarkIcon)
            setCheckPromoMessage(` Kupon tidak valid.`)
            // <XMarkIcon></XMarkIcon>, 
        }
        console.log(code, isValidPromoCode, checkPromoMessage)
        
    }

    const handleNewNames = (newName) => {
        setErrorMessage('')
        console.log('name from handlenewnames', newName, form_order.names.length)
        if(newName && form_order.names.length < parseInt(form_order.packet.slice(0,1))){
            if(!form_order.names.find(value => value.toLowerCase() === newName.toLowerCase())){
                setFormOrder({...form_order, names: [...form_order.names, newName]})
            }else{
                setErrorMessage('Anda tidak dapat menambahkan nama yang sama')
            }

            // form_order.names.push(name)
        }else{
            setErrorMessage('Nama melebihi jumlah kuota.')

        }
            // setFormOrder(form_order => form_order.names.push(name))
        console.log('form_order', form_order)
    }
    const handleFormData = (name, value) => {
        setErrorMessage('')
        console.log('name', name,value)
        if(name){
            if(Array.isArray(form_order[name])){
                if(!form_order.names.find(_name => _name.toLowerCase() === value.toLowerCase())){
                    form_order[name].push(value)
                }else{
                    setErrorMessage('Anda tidak dapat menambahkan nama yang sama')
                }
                // setFormOrder()
            }else{
                setFormOrder(form_order => ({...form_order, [name]: value}))
                console.log('form_order', form_order)
                // form_order[name] = value
            }
            
        }
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

    const handleRegist = () => {
        const new_names = form_order.names.map((name,key) => form_order.names.join(`${key+1}${name}%0A`))
        console.log(new_names)
        // setModalOpen(true)
        window.location.href= `https://api.whatsapp.com/send?phone=6285216527392&text=Assalamu%27alaikum%2C%20tim%20RQA%2C%20ana%20ingin%20mendaftar%20kelas%20-${form_order.class_name}-%20untuk%20paket%20-${form_order.packet}-%3A%0A${new_names}%0ANomor%20WA%3A%20-${form_order.phone_number}-%0AKode%20Promo%3A%20-${form_order.promo_code}-%20(-Rp-${form_order.discount}-)%20%0ATotal%20Bayar%3A%20-${form_order.totalPrice}-%0A%0AJazaakumullahu%20khayran.`
        // navigate(`https://api.whatsapp.com/send?phone=6285216527392&text=Assalamu%27alaikum%2C%20tim%20RQA%2C%20ana%20ingin%20mendaftar%20kelas%20-${class_name}-%20untuk%20paket%20-${packet}-%3A%0A${new_names}%0ANomor%20WA%3A%20-${phone_number}-%0ATotal%20Bayar%3A%20Rp-${totalPrice}-%0AJazaakumullahu%20khayran.`)
        // 1.%20Nama%201%0A2.%20Nama%202
    }

    const handlePay = async () => {
        const new_names = form_order.names.map((name,key) => form_order.names.join(`${key+1}${name}%0A`))
        // const new_names = form_order.names.map((name,key) => form_order.names.join(`${key+1}${name}%0A`))
        console.log(new_names)
        const data = {
            price: form_order.price, 
            full_name: form_order.names, 
            phone_number: form_order.phone_number,
            class_name: form_order.class_name, 
            packet: form_order.packet, 
            category: form_order.category,
            amount: 1,
            discount: form_order.discount,
            promo_code: form_order.promo_code,
            admin_fee: form_order.admin_fee
            // const { price, payment_method, va_number, full_name, class_name, packet, category } = req.body
        }
        try {
            const invoice = await axios.post(`${PAYMENT_URL}/api/payments/request-invoices`, data)
                            .then(result => {
                                console.log(result)
                                if(result.status == 'ok')
                                    navigate(result.data)

                            })
                            .catch(error => {
                                console.log(error)
                            })
            
        } catch (error) {
            console.log(error)
        }
        // https://api.whatsapp.com/send?phone=6285216527392&text=Assalamu%27alaikum%2C%20tim%20RQA%2C%20ana%20ingin%20mendaftar%20kelas%20-${form_order.class_name}-%20untuk%20paket%20-${form_order.packet}-%3A%0A${form_order.names}%0A%0ANomor%20WA%3A%20${form_order.phone_number}%0AKode%20Promo%3A%20${form_order.promo_code?form_order.promo_code`(${form_order.discount}%)`:'-'}%20%20%0ATotal%20Bayar%3A%20Rp${formatCurrency(form_order?.totalPrice, 'IDR')}%0A%0AJazaakumullahu%20khayran.
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

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{class_data.name}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">{`${formatCurrency(class_data?.price, 'IDR')}`}</p>

                {/* Reviews */}
                <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
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
                </div>
                </div>

                <form className="mt-10">
                {/* Colors */}
                <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                    <fieldset aria-label="Choose a color" className="mt-4">
                    <div className="flex items-center gap-x-3">
                        {class_data?.colors.map((color) => (
                        <div
                            key={color.id}
                            className="flex rounded-full outline outline-1 -outline-offset-1 outline-black/10"
                        >
                            <input
                            defaultValue={color.id}
                            defaultChecked={color === class_data?.colors[0]}
                            name="color"
                            type="radio"
                            aria-label={color.name}
                            onChange={(e) => handleFormData('category', e.target.value)}
                            className={classNames(
                                color.classes,
                                'size-8 appearance-none rounded-full forced-color-adjust-none checked:outline checked:outline-2 checked:outline-offset-2 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px]',
                            )}
                            />
                        </div>
                        ))}
                    </div>
                    </fieldset>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                    <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Paket</h3>
                    {/* <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Size guide
                    </a> */}
                    </div>

                    <fieldset aria-label="Choose a size" className="mt-4">
                    <div className="grid grid-cols-4 gap-3">
                        {class_data?.packets.map((packet) => (
                        <label
                            key={packet.code}
                            aria-label={packet.name}
                            className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-[:checked]:border-indigo-600 has-[:disabled]:border-gray-400 has-[:checked]:bg-indigo-600 has-[:disabled]:bg-gray-200 has-[:disabled]:opacity-25 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-indigo-600"
                        >
                            <input
                            defaultValue={packet.code}
                            defaultChecked={packet === class_data?.packets[0]}
                            name="packet"
                            type="radio"
                            disabled={!packet.inStock}
                            onClick={() => handleFormData('packet', packet.code)}
                            className="absolute inset-0 appearance-none focus:outline focus:outline-0 disabled:cursor-not-allowed"
                            />
                            <span className="text-sm font-medium uppercase text-gray-900 group-has-[:checked]:text-white">
                            {packet.name}
                            </span>
                        </label>
                        ))}
                    </div>
                    </fieldset>
                </div>

                {/* Coupon */}
                <div className="mt-10">
                    <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Kupon</h3>
                    {/* <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Size guide
                    </a> */}
                    </div>

                    <fieldset aria-label="Choose a size" className="mt-4">
                    <div className="flex justify-center">
                        {/* {class_data?.packets.map((packet) => ( */}
                        <label
                            className="group relative w-2/3 items-center justify-center rounded-md border border-gray-300 bg-white has-[:checked]:border-indigo-600 has-[:disabled]:border-gray-400 mr-3 has-[:checked]:bg-indigo-600 has-[:disabled]:bg-gray-200 has-[:disabled]:opacity-25 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-indigo-600"
                        >
                            <input
                            // defaultValue={packet.id}
                            // defaultChecked={packet === class_data?.packets[0]}
                                name="promo_code"
                                type="text"
                                // disabled={!packet.inStock}
                                onChange={(e) => handleFormData('promo_code', e.target.value)}
                                className="block w-full rounded-md px-2 border-gray-200 absolute inset-0 appearance-none focus:outline focus:outline-0 disabled:cursor-not-allowed focus:ring-blue-400"
                            />
                            {/* <span className="text-sm font-medium uppercase text-gray-900 group-has-[:checked]:text-white">
                            {packet.name}
                            </span> */}
                            
                        </label>

                            <button type='button' className='flex-grow w-1/3 text-white bg-blue-500 focus:bg-blue-500 rounded-md p-4 focus:ring-1 focus:ring-offset-2' onClick={() => checkPromoCode()} >Cek Kupon</button>
                        {/* <div className="mb-4"> */}
                            {/* <label htmlFor="promo_code" className="block mb-2.5 text-sm font-medium text-heading">No. Telepon (No WhatsApp Aktif)</label>
                            <input type="text" id="promo_code" onChange={(e) => handleFormData('category', e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="example@company.com" required /> */}
                            
                        </div>
                            <span className={`flex py-2 items-center text-sm text-${checkPromoColor}`}>
                                {checkPromoMessage? 
                                    isValidPromoCode ? 
                                    (<CheckCircleIcon className='w-5'></CheckCircleIcon> )
                                    : 
                                    (<FaRegCircleXmark className='w-5'></FaRegCircleXmark> )
                                : ''}
                                {checkPromoMessage}
                                 {/* {checkPromoMessage && }
                                 {checkPromoMessage} */}
                            </span>
                        {/* ))} */}
                    {/* </div> */}
                    </fieldset>
                </div>

                {/* Coupon */}
                <div className="mt-10">
                    <div className="flex items-center justify-between">
                        {form_order.promo_code && isValidPromoCode && (
                            <>
                            <p className='text-base'>
                                Harga
                            </p>
                            <p className='text-2xl'>
                                <p className='text-xl line-through'>
                                    {`${formatCurrency(class_data?.price, 'IDR')}`}
                                </p>
                                {`${formatCurrency(form_order?.totalPrice, 'IDR')}`}
                            </p>
                            </>
                        )}
                    </div>
                </div>


                <button
                    type="button"
                    data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 disabled:bg-gray-500 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setModalOpen(true)}
                    disabled={form_order.packet === ''}

                >
                    Daftar via Admin
                </button>
                </form>
            </div>
            {/* {modal_open && ( */}
            <Modal isOpen={modal_open} form_order={form_order} onClose={() => setModalOpen(false)} >
                {/* Coupon */}
                <div className="mt-2">
                    <div className="flex items-center justify-between">
                            <p className='text-sm font-medium'>
                                Paket
                            </p>
                            <p className='text-sm font-bold'>
                                {class_data.packets.find(packet => packet.code === form_order.packet)?.name}
                            </p>
                    </div>
                </div>
                <form action="#" className="pt-4 md:pt-6">
                    {form_order.packet === '1p' && (
                        <div className="mb-4">
                            <label htmlFor="names" className="block mb-2.5 text-sm font-medium text-heading">Nama</label>
                            <input type="text" id="names" onChange={(e) => handleFormData('names', e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Nama peserta" required />
                        </div>
                    )}
                    {/* // <div className="mb-4">
                        //     <label htmlFor="names" className="block mb-2.5 text-sm font-medium text-heading">Nama</label>
                        //     <input type="text" id="names" onChange={(e) => setFormOrder({names: [...form_order.names, e.target.value]})} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="Nama peserta" required />
                        // </div> */}
                    {(form_order.packet === '2p' || form_order.packet === '5p') && (
                        
                        // <div className='flex justify-center'>
                        <>
                            <MultiTextInput handleNewNames={handleNewNames} setName={setName} name={name} label='Nama' errorMessage={errorMessage}></MultiTextInput>
                        </>

                        // </div>
                        
                    )}
                    {/* <input key={i} type='text' value={values[i]} onChange={(e) => handleInput(e,i) } /> */}
                    {/* inputs.push(); */}
                    <div className="mt-10">
                    {
                        form_order.names && form_order.names.length > 0 && (
                            <ul className='mb-8'>
                                {form_order.names.map ((name, key) => (
                                    <ol key={key+1} className='flex justify-between items-center rounded-md bg-green-200 text-xl border-green-100 mb-2 p-2 '>{key+1}. {name} <TrashIcon className='w-5 cursor-pointer' onClick={() => setFormOrder({...form_order, names : form_order.names.filter(value => value !== name)})}></TrashIcon> </ol>

                                ))}
                            </ul>
                        )
                    }

                    </div>
                    {/* names, phone_number, packet, promo_code, discount, totalPrice, class_name */}
                    <div className="mb-4">
                        <label htmlFor="phone_number" className="block mb-2.5 text-sm font-medium text-heading">No. Telepon (No WhatsApp Aktif)</label>
                        <input type="text" id="phone_number" onChange={(e) => handleFormData('phone_number', e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="08123456789" required />
                    </div>
                    {/* Divider */}
                    <div className="border-b border-default">

                    </div>

                    <div className="mt-2">
                        <div className="flex items-center justify-between">
                            {form_order.promo_code && (
                                <>
                                <p className='text-sm font-medium'>
                                    Kode Promo
                                </p>
                                <p className='text-sm p-2 bg-green-400 rounded-md'>
                                    <CheckCircleIcon className='w-5 inline'></CheckCircleIcon> {form_order.promo_code}
                                </p>
                                </>
                            )}
                            {/* {form_order.promo_code && ( */}
                            {/* )}  */}
                        </div>
                    </div>
                    {/* Coupon */}
                    <div className="mt-2">
                        <div className="flex items-center justify-between">
                            <p className='text-sm'>
                                Diskon
                            </p>
                            <p className='text-base'>
                                {form_order.promo_code? `${form_order.discount}%(Rp${promo_codes.find(promo_code => promo_code.code === form_order.promo_code).discount_nominal?.toLocaleString("id-ID")})` : '0%'}
                            </p>
                        </div>
                    </div>
                    {/* Coupon */}
                    <div className="mt-2">
                        <div className="flex items-center justify-between">
                            <p className='text-sm'>
                                Total Harga
                            </p>
                            <p className='text-2xl'>
                                {`${formatCurrency(form_order?.totalPrice, 'IDR')}`}
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
                        href={`https://api.whatsapp.com/send?phone=6285216527392&text=Assalamu%27alaikum%2C%20tim%20RQA%2C%20ana%20ingin%20mendaftar%20kelas%20-${form_order.class_name}-%20untuk%20paket%20-${form_order.packet}-%3A%0A${form_order.names}%0A%0ANomor%20WA%3A%20${form_order.phone_number}%0AKode%20Promo%3A%20${form_order.promo_code?form_order.promo_code`(${form_order.discount}%)`:'-'}%20%20%0ATotal%20Bayar%3A%20Rp${formatCurrency(form_order?.totalPrice, 'IDR')}%0A%0AJazaakumullahu%20khayran.`} 
                        className="block text-white text-center text-base bg-amber-600 box-border border border-transparent rounded-md my-3 hover:bg-amber-700 focus:ring-4 focus:ring-brand-medium shadow-xs leading-5 rounded-base font-medium px-4 py-2.5 focus:outline-none w-full mb-3">Daftar</a> */}
                        <button onClick={() => handlePay()} className="block text-white text-center text-base bg-amber-600 box-border border border-transparent rounded-md my-3 hover:bg-amber-700 focus:ring-4 focus:ring-brand-medium shadow-xs leading-5 rounded-base font-medium px-4 py-2.5 focus:outline-none w-full mb-3">Bayar</button>
                    {/* <div className="text-sm font-medium text-bo dy">Not registered? <a href="#" className="text-fg-brand hover:underline">Create account</a></div> */}
                </form>
            </Modal>
                {/* // <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
                // Toggle modal
                // </button> */}
            {/* )} */}

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                    <p className="text-base text-gray-900">{class_data?.description}</p>
                </div>
                </div>

                <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                <div className="mt-4">
                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {class_data?.highlights.map((highlight) => (
                        <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                        </li>
                    ))}
                    </ul>
                </div>
                </div>

                <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{class_data?.details}</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        
        </main>
        <Footer />
    </>
  )
}
