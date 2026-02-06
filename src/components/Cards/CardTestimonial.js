import * as React from 'react'

const CardTestimonial = ({message, full_name, class_name, photo}) => {

    return (

        // <section id="testimonials" aria-label="What our customers are saying" className="bg-slate-50 py-20 sm:py-32">
        // <div className="w-full md:w-4/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
        //   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            // {/* <div className="mx-auto max-w-2xl md:text-center">
            //   <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">What Our Customers Are Saying</h2>
            // </div> */}
            // {/* <ul role="list"
            //   className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"> */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                                </div>
              // <li>
              //   <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
              //     <li>
              //       <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10"><svg aria-hidden="true"
              //           width="105" height="78" className="absolute left-6 top-6 fill-slate-100">
              //           <path
              //             d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z">
              //           </path>
              //         </svg>
              //         <blockquote className="relative">
              //           <p className="text-lg tracking-tight text-slate-900">{message} </p>
              //         </blockquote>
              //         <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
              //           <div>
              //             <div className="font-display text-base text-slate-900">{full_name} </div>
              //           </div>
              //           <div className="overflow-hidden rounded-full bg-slate-50">
              //             <img alt="" className="h-14 w-14 object-cover" style={{color:"transparent"}} src={photo || "https://randomuser.me/api/portraits/men/15.jpg"}/>
              //           </div>
              //         </figcaption>
              //       </figure>
              //     </li>
              //   </ul>
              // </li>
              // {/* </ul> */}
        //     </div>
        // </div>
    //   </section>
        
        //     // {/* <div className="mx-auto max-w-2xl md:text-center">
        //     // <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">What Our Customers Are Saying</h2>
        //     // </div> */}
        //     // <div>
        //     <ul role="list" className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">

        //     <li>
        //         <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
        //         <li>
        //             <figure className="relative bg-white p-6 shadow-xl shadow-slate-900/10 rounded-3xl "><svg aria-hidden="true"
        //                 width="105" height="78" className="absolute left-6 top-6 fill-slate-100">
        //                 <path
        //                 d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z">
        //                 </path>
        //             </svg>
        //             <blockquote className="relative">
        //                 <p className="text-lg tracking-tight text-slate-900">{message} </p>
        //             </blockquote>
        //             <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
        //                 <div>
        //                 <div className="font-display text-base text-slate-900">{full_name} </div>
        //                 </div>
        //                 <div className="overflow-hidden rounded-full bg-slate-50">
        //                 <div>
        //                     <div className="font-display text-x text-slate-700">{class_name} </div>
        //                 </div>
        //                 <img alt="" className="h-14 w-14 object-cover" style={{color:"transparent"}} src="https://randomuser.me/api/portraits/men/15.jpg"/>
        //                 </div>
        //             </figcaption>
        //             </figure>
        //         </li>
        //         </ul>
        //     </li>
        //     {/* <li>
        //         <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
        //         <li>
        //             <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10"><svg aria-hidden="true"
        //                 width="105" height="78" className="absolute left-6 top-6 fill-slate-100">
        //                 <path
        //                 d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z">
        //                 </path>
        //             </svg>
        //             <blockquote className="relative">
        //                 <p className="text-lg tracking-tight text-slate-900">As a professional athlete, I rely on high-performance
        //                 gear for my training. This site offers a great selection of top-notch products.</p>
        //             </blockquote>
        //             <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
        //                 <div>
        //                 <div className="font-display text-base text-slate-900">Leland Kiehn</div>
        //                 </div>
        //                 <div className="overflow-hidden rounded-full bg-slate-50">
        //                 <img alt="" className="h-14 w-14 object-cover" style="color:transparent" src="https://randomuser.me/api/portraits/women/15.jpg"/>
        //                 </div>
        //             </figcaption>
        //             </figure>
        //         </li>
        //         </ul>
        //     </li>
        //     <li>
        //         <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
        //         <li>
        //             <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10"><svg aria-hidden="true"
        //                 width="105" height="78" className="absolute left-6 top-6 fill-slate-100">
        //                 <path
        //                 d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z">
        //                 </path>
        //             </svg>
        //             <blockquote className="relative">
        //                 <p className="text-lg tracking-tight text-slate-900">The fitness apparel I bought here fits perfectly and
        //                 feels amazing. I highly recommend this store to anyone looking for quality gear.</p>
        //             </blockquote>
        //             <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
        //                 <div>
        //                 <div className="font-display text-base text-slate-900">Peter Renolds</div>
        //                 </div>
        //                 <div className="overflow-hidden rounded-full bg-slate-50">
        //                 <img alt="" className="h-14 w-14 object-cover" style="color:transparent" src="https://randomuser.me/api/portraits/men/10.jpg"/>
        //                 </div>
        //             </figcaption>
        //             </figure>
        //         </li>
        //         </ul>
        //     </li> */}
        //     </ul>

        //     // </div>
        // // </div>
        // // </section>
    )
    
    // return (

        
    
    // )
    
}

export default CardTestimonial
