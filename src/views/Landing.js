import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

import { FaAward, FaRetweet, FaHeadset } from "react-icons/fa";
import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import HoverDevCard from "../components/Cards/HoverDevCard";
import BlockInTextCard from "../components/Cards/BlockInTextCard";
import HoverTiltCard from "../components/Cards/HoverTiltCard";

import program1 from "../assets/img/1.png";
import program2 from "../assets/img/2.png";
import program3 from "../assets/img/3.png";
import program4 from "../assets/img/4.png";
import backgroundImage from "../assets/img/@rq_al_ayman.png";
// import backgroundImage from '../assets/img/jess.png'
// import backgroundImage2 from '../assets/img/indonesia-bertauhid.jpg'
import backgroundImage2 from "../assets/img/indonesia-bertauhid-Copy.jpg";
import Card from "../components/Cards/Card";
import HoverDevCards from "../components/Cards/HoverDevCard";
import SquishyCard from "../components/Cards/SquishyCard";
import SquareSlider from "../components/Sliders/SquareSliders";
import CardTestimonial from "../components/Cards/CardTestimonial";
import ProductCard from "../components/Cards/ProductCard";
import OrderHitory from "./customers/OrderHistory";

const programs = [
  {featured_image: program1, title: "Tashih Tilawah Al Qur'an", description: "Program perbaikan bacaan Al Qur'an khusus Muslimah dan Anak-Anak"},
  {featured_image: program2, title: "Tahfidz Al Qur'an", description: "Program menghafal Al Qur'an secara terstruktur sesuai kaidah tahfidz"},
  {featured_image: program3, title: "Kelas Bahasa Arab", description: "Program belajar bahasa Arab bersama asatidzah yang berkompeten"},
  {featured_image: program4, title: "Dauroh/kajian rutin ilmu syar’i", description: "Kajian dan Daurah ilmu syar'i bersama asatidzah dan pakar ilmu membahas dan menjawab persoalan dan problematika umat"},

]
const testimonials = [
  {message: "Masyaallah, Kelas yang padat ilmu dan interaktif, dan Ustadzah yang bersedia menjawab pertanyaan-pertanyaan kita.", photo: 'https://dqninibrhfyreiclhile.supabase.co/storage/v1/object/public/frontpage/orgzs/female-avatar.jpeg'},
  {message: "Masyaallah, Kelas yang padat ilmu dan interaktif, dan Ustadzah yang bersedia menjawab pertanyaan-pertanyaan kita.", photo: 'https://dqninibrhfyreiclhile.supabase.co/storage/v1/object/public/frontpage/orgzs/female-avatar.jpeg'},
  {message: "Masyaallah, Kelas yang padat ilmu dan interaktif, dan Ustadzah yang bersedia menjawab pertanyaan-pertanyaan kita.", photo: 'https://dqninibrhfyreiclhile.supabase.co/storage/v1/object/public/frontpage/orgzs/female-avatar.jpeg'},
  {message: "Masyaallah, Kelas yang padat ilmu dan interaktif, dan Ustadzah yang bersedia menjawab pertanyaan-pertanyaan kita.", photo: 'https://dqninibrhfyreiclhile.supabase.co/storage/v1/object/public/frontpage/orgzs/female-avatar.jpeg'},
]
const availableClass = [
  {title: "Tilawah dan Tadabbur Al Qur'an", slug:'tilawah-dan-tadabbur-al-quran-1256', subcategory_id: 'abcde123', type: 'anak-anak', thumbnails: '', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", rating: 4, created_at: new Date().toISOString(), views: 12, price: 0, promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
  {title: "Tadrib & Ahkam Tajwid", slug:'tadrib-tadabbur-ahkam-tajwid-1257', subcategory_id: 'abcde124', type: 'dewasa', thumbnails: '', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", rating: 4, created_at: new Date().toISOString(), views: 20, price: 300000, promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
  {title: "Aisar", slug:'aisar', subcategory_id: 'abcde125', type: 'remaja', thumbnails: '', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", rating: 5, created_at: new Date().toISOString(), views: 25, price: 250000, promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
  {title: "Daurah/Kajian Ilmu Syar'i", slug: 'daurah-kajian-ilmu-syari', subcategory_id: 'abcde126',type: 'dewasa', thumbnails: '', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", rating: 4, created_at: new Date().toISOString(), views: 5, price: 300000, promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
  // {title: "T", type: 'Remaja dan Anak-Anak', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
]

export default function Landing() {
  const navigate = useNavigate()
  const programRef = useRef(null)
  const testimonialRef = useRef(null)
  const classRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        handleNextSlide();
      }, 5000); // Change slide every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [currentSlide, testimonials.length]);

  const handleNavigation = menu => {
    if(menu === 'program')
      programRef.current.focus()
    if(menu === 'our-classes')
      classRef.current.focus()
    if(menu === 'testimonial')
      testimonialRef.current.focus()
  }  

  const handleMoreClasses = () => {
    navigate('/opened-classes')
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
};

  
  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover -hue-rotate-15"
            style={{
              backgroundImage: "url(" + backgroundImage2 + ")",
              // {backgroundImage},
              // "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl text-shadow-lg/20">
                    Rumah Qur’an Al Ayman
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    Media pembelajaran ilmu syar'i berlandaskan Al Qur'an dan As
                    Sunnah sesuai pemahaman para shahabat yang dikhususkan untuk
                    muslimah dan anak-anak.
                  </p>
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

        <section className="p-8 bg-blueGray-100" >
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {/* <div className="grid w-full place-content-center bg-gradient-to-br from-indigo-500 to-violet-500 px-4 py-12 text-slate-900">
              
              
              </div> */}
            </div>
            </div>
        </section>

        {/* <h3 className="text-3xl mb-2 font-semibold leading-normal items-center text-center">
          Keunggulan Kami 
          </h3> */}
        {/* <p className="text-2xl font-semibold mb-6 text-center text-blueGray-800 bg-blueGray-100">Keunggulan Kami</p> */}

        
        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-4 gap-2">
              {/* flex flex-wrap */}
              <HoverDevCard
                        title="Pengajar Kompeten"
                        subtitle="Para pengajar yang kompeten serta memiliki pengalaman mengajar di bidang pengajaran Al-Qur'an."
                        // tahsin dan tahfidz Al-Qur'an di Rumah Qur’an Al Ayman adalah para pengajar 
                        // subtitle="Para pengajar tahsin dan tahfidz Al-Qur'an yang kompeten serta berpengalaman"
                        href="#"
                        additionalClass="pt-12"
                        Icon={FiUser}
                      />
                      <HoverDevCard 
                        title="Sistem Interaktif" 
                        subtitle="Pembelajaran yang berbasis online dan interaktif langsung antara pengajar dan murid" 
                        href="#" 
                        additionalClass=""
                        Icon={FiMail} 
                      />
                      <HoverDevCard
                        title="Pembelajaran Sistematis dan Terstruktur" 
                        subtitle="Pembelajaran dengan materi dan evaluasi yang telah terjadwal" 
                        // subtitle="Jadwal belajar yang dapat disesuaikan dengan kesibukan Anda" 
                        href="#"
                        additionalClass="" 
                        Icon={FiCreditCard} 
                      />
                      <HoverDevCard 
                        title="Fawaid dan Daurah"
                        subtitle="Menyelenggarakan dauroh/kajian rutin ilmu syar’i dan ilmu yang bermanfaat untuk ummat." 
                        href="#"
                      additionalClass="pt-12" 
                        Icon={FiUsers} 
                      />
              {/* <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center"> */}
                {/* <HoverDevCards/> */}
                {/* <div className="grid w-full place-content-center bg-gradient-to-br from-indigo-500 to-violet-500 px-4 py-12 text-slate-900">
                  
                </div> */}
                {/* <HoverDevCards
                // title="Pengajar Kompeten"
                // subtitle="Para pengajar tahsin dan tahfidz Al-Qur'an serta Rumah Qur’an Al Ayman adalah para pengajar yang kompeten serta memiliki pengalaman mengajar di bidang pengajaran Al-Qur'an. "
                // href="#"
                // Icon={FaAward}
              /> */}
              {/* <HoverDevCards 
              // title="Interaktif" subtitle="Sistem pembelajaran yang berbasis online dan interaktif langsung antar pengajar dan murid." href="#" 
              // Icon={FaRetweet} 
              /> */}
              {/* <HoverDevCards 
              // title="Daurah/Kajian" subtitle="Menyelenggarakan dauroh/kajian rutin ilmu syar’i dan ilmu yang bermanfaat untuk ummat." href="#"
              //  Icon={FaHeadset}
                />         */}
              {/* </div> */}
              {/* <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Pengajar Kompeten</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Para pengajar tahsin dan tahfidz Al-Qur'an serta Rumah Qur’an Al Ayman adalah para pengajar yang kompeten serta memiliki pengalaman mengajar di bidang pengajaran Al-Qur'an. 
                    </p>
                  </div>
                </div>
              </div> */}

              {/* <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Interaktif</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Sistem pembelajaran yang berbasis online dan interaktif langsung antar pengajar dan murid.
                    </p>
                  </div>
                </div>
              </div> */}

              {/* <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-solid fa-headset"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Daurah/Kajian</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Menyelenggarakan dauroh/kajian rutin ilmu syar’i dan ilmu yang bermanfaat untuk ummat.
                    </p>
                  </div>
                </div>
              </div> */}
            </div>

            <div id='program' className="flex flex-wrap items-center mt-24" ref={programRef}>
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                {/* <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-user-friends text-xl"></i>
                </div> */}
                <h3 className="text-3xl mb-2 font-semibold leading-normal items-center text-center">
                  Pilihan Program 
                </h3>
              </div>
              <div className="flex flex-wrap items-center justify-center">
                {/* <div className="lg:pt-12 pt-6 w-full md:w-5/12 px-2 text-center"> */}
                {
                  programs && programs.map(program => (
                    <HoverTiltCard featured_image={program.featured_image} title={program.title} description={program.description} />
                
                  ))
                }
                
                  {/* <BlockInTextCard
                    tag="/ Support"
                    text={
                      <>
                        <strong>Have questions?</strong> We'd love to help!
                        Contact support for any issue you may face.
                      </>
                    }
                    examples={[
                      "Does your product work for SMBs?",
                      "Can I pause my membership without losing my data?",
                      "How does seat based pricing work?",
                      "What's the meaning of life?",
                    ]}
                  /> */}
                  {/* <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                          <img
                            alt="..."
                            src={program1}
                            className="w-full align-middle rounded-t-lg
                            shadow-lg rounded-full mx-auto max-w-200-px transform hover:-skew-y-12 "
                          />
                          <h5 className="text-xl font-bold">Tahsin Al Qur'an</h5>
                          <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                              The extension comes with three pre-built pages to help you
                              get started faster.
                          </p>
                        </div> */}
                {/* </div> */}
                {/* <div className="lg:pt-12 pt-6  md:w-5/12 px-2 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <img
                      alt="..."
                      src={program2}
                      className="w-full align-middle rounded-t-lg
                              shadow-lg rounded-full mx-auto max-w-200-px transform hover:skew-[3.142rad]"
                    />
                    <h5 className="text-xl font-bold">Tahfidz Al Qur'an</h5>
                    <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                      The extension comes with three pre-built pages to help you
                      get started faster.
                    </p>
                  </div>
                </div>
                <div className="lg:pt-12 pt-6 w-full md:w-5/12 px-2 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <img
                      alt="..."
                      src={program3}
                      className="w-full align-middle rounded-t-lg
                            shadow-lg rounded-full mx-auto max-w-200-px transform hover:skew-x-6 md:skew-12 "
                    />
                    <h5 className="text-xl font-bold">Kelas Bahasa Arab</h5>
                    <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                      The extension comes with three pre-built pages to help you
                      get started faster.
                    </p>
                  </div>
                </div>

                <div className="lg:pt-12 pt-6 w-full md:w-5/12 px-2 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <img
                      alt="..."
                      src={program4}
                      className="w-full align-middle rounded-t-lg
                            shadow-lg rounded-full mx-auto max-w-200-px transform hover:skew-y-12 md:skew-12 "
                    />
                    <h5 className="text-xl font-bold">
                      Dauroh/kajian rutin ilmu syar’i
                    </h5>
                    <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                      The extension comes with three pre-built pages to help you
                      gdbet started faster. You can change the text and images
                      and you're good to go.
                    </p>
                  </div>
                </div> */}
              </div>
              {/* <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Don't let your uses guess by attaching tooltips and popoves to
                  any element. Just make sure you enable them first via
                  JavaScript.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  The kit comes with three pre-built pages to help you get
                  started faster. You can change the text and images and you're
                  good to go. Just make sure you enable them first via
                  JavaScript.
                </p>
                <Link to="/" className="font-bold text-blueGray-700 mt-8">
                  Check Notus React!
                </Link> */}

              {/* <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-lightBlue-500 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                      Top Notch Services
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                      The Arctic Ocean freezes every winter and much of the
                      sea-ice then thaws every summer, and that process will
                      continue whatever happens.
                    </p>
                  </blockquote>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
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
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div id='classes' className="container mx-auto px-4" ref={classRef}>
            <div className="items-center flex flex-wrap">
              {/* <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                />
              </div> */}
              <div className="w-full md:w-12/12 ml-auto mr-auto px-4 items-center justify-center">
                <div className="md:pr-12 items-center">
                  {/* <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                    <i className="fas fa-rocket text-xl"></i>
                  </div> */}
                  <h3 className="text-3xl font-semibold items-center text-center">
                    Kelas yang Dibuka
                  </h3>
                </div>
                <div className="md:pr-12 items-center">
                  <h4 className="mt-4 text-lg  text-blueGray-500 text-center">
                    Remaja / Dewasa
                  </h4>
                  <div className="flex flex-wrap">
                      
                        {
                          availableClass.map( (className, index) => (
                            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                            <div key={index} className="relative flex flex-col min-w-0 p-5 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
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
                              {/* <BlockInTextCard
                                tag={className.title}
                                slug={className.slug}
                                text={
                                  <>
                                    <strong>Untuk {className.type}.</strong> {className.description}
                                  </>
                                }
                                runningText={className.promoteText}
                              /> */}
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
                  <div className="flex flex-wrap">
                    <button className="w-full rounded-full border border-neutral-950 py-2 text-sm font-medium transition-colors hover:bg-neutral-950 hover:text-neutral-100"
                      onClick={handleMoreClasses}
                    >
                      Ke halaman Kelas 
                    </button>

                  </div>
                </div>
                {/* <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fas fa-fingerprint"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Carefully crafted components
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="fab fa-html5"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Amazing page examples
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                            <i className="far fa-paper-plane"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Dynamic components
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul> */}
              </div>
            </div>
          </div>
        </section>

        <OrderHitory/>

        <section id='testimonial' className="pb-20 relative block bg-blueGray-800" ref={testimonialRef}>
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
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
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
          
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-12">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">Testimoni</h2>
                <p className="text-lg leading-relaxed m-4 text-blueGray-400">
                  Cerita mereka tentang RQA
                </p>
              </div>
            </div>
            
            {/* Testimonial Slider - 3 Cards Per Slide */}
            <div className="relative max-w-6xl mx-auto">
              {/* Slider Container */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array(Math.ceil(testimonials.length / 3)).fill().map((_, slideIndex) => (
                    <div 
                      key={slideIndex}
                      className="w-full flex-shrink-0"
                    >
                      <div className="flex flex-wrap -mx-4">
                        {testimonials.slice(slideIndex * 3, slideIndex * 3 + 3).map((testimonial, cardIndex) => (
                          <div 
                            key={cardIndex}
                            className="w-full md:w-1/3 px-4 mb-8"
                          >
                            <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
                              
                              <div className="mb-6 flex-grow">
                                <div className="flex items-center mb-4">
                                  <div className="flex space-x-1 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                </div>
                                <p className="text-gray-600 italic line-clamp-4 text-sm">
                                  "{testimonial.message}"
                                </p>
                              </div>
                              
                              <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                                <img 
                                  src={testimonial.photo} 
                                  alt="Testimonial" 
                                  className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-indigo-100"
                                />
                                <div>
                                  <h4 className="font-semibold text-gray-800 text-sm">{testimonial.full_name || "Anak Shalihah RQA"}</h4>
                                  <p className="text-gray-500 text-xs">{testimonial.class_name || "Thalibah RQA"}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-8 z-10 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
                disabled={currentSlide === 0}
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              
              <button
                onClick={handleNextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-8 z-10 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
                disabled={currentSlide === Math.ceil(testimonials.length / 3) - 1}
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
              
              {/* Dots Indicator */}
              <div className="flex justify-center mt-8 space-x-3">
                {Array(Math.ceil(testimonials.length / 3)).fill().map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'bg-indigo-600 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* <section className="pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">Testimoni</h2>
                <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                  According to the National Oceanic and Atmospheric
                  Administration, Ted, Scambos, NSIDClead scentist, puts the
                  potentially record maximum.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-1-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Ryan Tompson</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Web Developer
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                      <button
                        className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-2-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Romina Hadid</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Marketing Specialist
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-3-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Alexa Smith</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      UI/UX Designer
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-4-470x470.png").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Jenna Kardi</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Founder and CEO
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-dribbble"></i>
                      </button>
                      <button
                        className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button
                        className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-instagram"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        
        {/* <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">
                      Want to work with us?
                    </h4>
                    <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                      Complete this form and we will get back to you in 24
                      hours.
                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      <Footer handleNavigation={handleNavigation} programRef={programRef} classRef={classRef} testimonialRef={testimonialRef} />
    </>
  );
}
