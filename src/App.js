import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet';
// import HelmetPro

// layouts

import Admin from "./layouts/Admin.js";
import Auth from "./layouts/Auth.js";

// views without layouts

import Landing from "./views/Landing.js";
import Profile from "./views/Profile.js";
import Index from "./views/Index.js";

import '../src/assets/styles/index.css'
import Classes from './views/Classes.js';
import DetailClass from './views/DetailClass.js';
import ContactUs from './views/ContactUs.js';
import AboutUs from './views/AboutUs.js';
import Dashboard from './views/admin/Dashboard.js';
import Settings from './views/admin/Settings.js';
import Maps from './views/admin/Maps.js';
import Tables from './views/admin/Tables.js';

function App() {


    return (
    <>
      <Helmet>
          {/* <script src='https://app-sandbox.duitku.com/lib/js/duitku.js'></script>
          <script src='https://app-prod.duitku.com/lib/js/duitku.js'></script>
          <script src="../path/to/flowbite/dist/flowbite.min.js"></script> */}
      </Helmet>
      <Routes>
        {/* <Route exact path="/" element={<Jenjang />} /> */}
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/official" element={<Index />} />
        <Route exact path="/opened-classes" element={<Classes />} />
        <Route exact path="/class/:id" element={<DetailClass />} />
        <Route exact path="/about-us" element={<AboutUs />} />
        <Route exact path="/contact-us" element={<ContactUs />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/admin/maps" element={<Maps />} />
        <Route exact path="/admin/settings" element={<Settings />} />
        <Route exact path="/admin/tables" element={<Tables />} />
        {/* <Route exact path="/admin" element={<Dashboard />} /> */}
        {/* <Route exact path="/transfer" element={<JenjangTransfer />} /> */}
        
        {/* <Route element={<ProtectedRoute />}>
          <Route path="/pay" element={<Payment />} />
          <Route path='/home' element={<Home/>}></Route>
          <Route path="/logout" element={<SignIn />} />
        </Route> */}
        {/* <Route element={
          // <RequireAuth loginPath="/login">
            <ProtectedRoute />
          // </RequireAuth>
          }/> */}
        <Route path="/login" element={<Auth />} />
        {/* {
        allowed_codes.map(                                                                                                              => {
          return <Route path={`/:${code}`} element={<SignUp />} /> 
        })
        } */}
        {/* <Route path="/:code" element={<SignUp />} />
        <Route path="/:code/:pid" element={<SignUp />} />
        <Route path="/transfer/:code" element={<SignUp_Transferred />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/landing" element={<RedirectPayment />} />
        <Route path="/*" element={<NotFoundRoute />} /> */}
      </Routes>

      
      {/* <HelmetProvider> */}
        
      {/* </HelmetProvider> */}
    </>
  );

}


export default App