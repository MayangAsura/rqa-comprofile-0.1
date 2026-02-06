import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import App from './App'
import { Helmet } from "react-helmet";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <React.StrictMode>
    {/* <Suspense fallback={<SuspenseContent />}> */}
      {/* <AuthProvider> */}
      <Router>
          <App />
      </Router>

        {/* </AuthProvider> */}
    {/* </Suspense> */}
  </React.StrictMode>
  <Helmet>
    <script src="./node_modules/preline/dist/preline.js"></script>
  </Helmet>
  </>
);
// ReactDOM.render(
//   <BrowserRouter>
//     <Switch>
//       {/* add routes with layouts */}
//       <Route path="/admin" component={Admin} />
//       <Route path="/auth" component={Auth} />
//       {/* add routes without layouts */}
//       <Route path="/landing" exact component={Landing} />
//       <Route path="/profile" exact component={Profile} />
//       <Route path="/" exact component={Index} />
//       {/* add redirect for first page */}
//       <Redirect from="*" to="/" />
//     </Switch>
//   </BrowserRouter>,
//   document.getElementById("root")
// );
