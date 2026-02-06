
import React from "react";
import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";

const HoverDevCards = () => {
  return (
    <>
      {/* // <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"> */}
      
        <HoverDevCard
          title="Pengajar Kompeten"
          subtitle="Para pengajar tahsin dan tahfidz Al-Qur'an di Rumah Qur’an Al Ayman adalah para pengajar yang kompeten serta memiliki pengalaman mengajar di bidang pengajaran Al-Qur'an."
          // subtitle="Para pengajar tahsin dan tahfidz Al-Qur'an yang kompeten serta berpengalaman"
          class
          href="#"
          Icon={FiUser}
        />
        <HoverDevCard 
          title="Sistem Interaktif" 
          subtitle="Pembelajaran online yang interaktif langsung antara pengajar dan murid" 
          href="#" 
          Icon={FiMail} 
        />
        <HoverDevCard 
          title="Komunitas Aktif" 
          subtitle="Bergabung dengan komunitas pembelajar Al-Qur'an yang solid" 
          href="#" 
          Icon={FiUsers} 
        />
        <HoverDevCard 
          title="Fleksibel" 
          subtitle="Jadwal belajar yang dapat disesuaikan dengan kesibukan Anda" 
          href="#" 
          Icon={FiCreditCard} 
        />

      {/* </div> */}
    </>
  );
};

const HoverDevCard = ({ title, subtitle, Icon, href, additionalClass }) => {
  return (
  // <div className={`mt-[-64px] w-full md:w-3/12 px-4 text-center ${additionalClass}`}>
    <div className={`mt-[-64px] w-full px-4 text-center ${additionalClass}`}>
    {/* <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 " > */}
    {/* <div className="relative break-words bg-white w-full mb-8 shadow-lg rounded-lg" > */}
      <a
        href={href}
        className="block p-6 rounded-lg border border-blueGray-300 relative overflow-hidden group bg-white hover:shadow-xl transition-all duration-300 min-h-[180px]"
      >
        {/* Gradient Background on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#42adf5] to-[#4281f5] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
        {/* <div style={{
    background: 'linear-gradient(to right, #7c3aed, #4f46e5)',
    transform: 'translateY(100%)'
  }} className="absolute inset-0 group-hover:translate-y-0 transition-transform duration-300" /> */}

        {/* Large Background Icon */}
        <Icon className="absolute z-10 -top-8 -right-8 text-8xl text-blueGray-100 group-hover:text-violet-300 group-hover:rotate-12 transition-all duration-500" />
        
        {/* Main Icon */}
        <div className="relative z-20">
          <Icon className="mb-4 text-3xl text-[#42adf5] group-hover:text-white transition-colors duration-300" />
          
          {/* Content */}
          <h3 className="font-semibold text-lg text-blueGray-800 group-hover:text-white relative z-20 duration-300 mb-2">
            {title}
          </h3>
          <p className="text-blueGray-600 group-hover:text-violet-100 relative z-20 duration-300 text-sm leading-relaxed">
            {subtitle}
          </p>
        </div>
      </a>

    {/* </div> */}
    </div>
  );
};

export default HoverDevCard;
// import React from "react";
// import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";

// const HoverDevCards = () => {
//   return (
//     <div className="p-4">
//       <p className="text-xl font-semibold mb-2">Settings</p>
//       <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
//         <Card
//           title="Account"
//           subtitle="Manage profile"
//           href="#"
//           Icon={FiUser}
//         />
//         <Card title="Email" subtitle="Manage email" href="#" Icon={FiMail} />
//         <Card title="Team" subtitle="Manage team" href="#" Icon={FiUsers} />
//         <Card
//           title="Billing"
//           subtitle="Manage cards"
//           href="#"
//           Icon={FiCreditCard}
//         />
//       </div>
//     </div>
//   );
// };

// const Card = ({ title, subtitle, Icon, href }) => {
//   return (
//     <a
//       href={href}
//       className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
//     >
//       <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

//       <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
//       <Icon className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300" />
//       <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
//         {title}
//       </h3>
//       <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
//         {subtitle}
//       </p>
//     </a>
//   );
// };

// export default HoverDevCards;

// // import React from "react";
// // import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";
// // import Card from "../Cards/Card";
// // const HoverDevCards = () => {
// //   return (
// //     <div className="p-4">
// //       <p className="text-xl font-semibold mb-2">Settings</p>
// //       <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
// //         <Card
// //           title="Account"
// //           subtitle="Manage profile"
// //           href="#"
// //           Icon={FiUser}
// //         />
// //         <Card title="Email" subtitle="Manage email" href="#" Icon={FiMail} />
// //         <Card title="Team" subtitle="Manage team" href="#" Icon={FiUsers} />
// //         <Card
// //           title="Billing"
// //           subtitle="Manage cards"
// //           href="#"
// //           Icon={FiCreditCard}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // // const HoverDevCards = ({ title, subtitle, Icon, href }) => {
// // //   return (
// // //     <a
// // //       href={href}
// // //       className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
// // //     >
// // //       <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
// // //       {Icon && (
// // //         <>
// // //         <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300">{Icon} </Icon>
// // //         {/* {Icon} */}
// // //             {/* <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
// // //             <Icon className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300" /> */}

// // //         </>

// // //       )}
// // //       <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
// // //         {title}
// // //       </h3>
// // //       <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
// // //         {subtitle}
// // //       </p>
// // //     </a>
// // //   );
// // // };

// // export default HoverDevCards;