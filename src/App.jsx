import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast, Slide, cssTransition} from 'react-toastify';

import Signup from "./pages/Signup";
import Match from "./pages/Match";
import Payments from "./pages/Payments";
import VendorSignup from "./pages/VendorSIgnup";
import Login from "./pages/Login";
import VendorLogin from "./pages/VendorLogin";
import Landing from "./pages/Landing"

export default function App(){

  const SlideFromTop = cssTransition({
  enter: "animate-slide-in-top",
  exit: "animate-slide-out-top",
  appendPosition: false,
  collapse: true,
  duration: [400, 200],
});


  return(
    <BrowserRouter>
      <ToastContainer position="top-right" hideProgressBar={false} autoClose={3000} transition={SlideFromTop} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/Signup" element={<Signup/>}></Route>
        <Route path="/vendorSignup" element={<VendorSignup/>}></Route>
        <Route path="/vendorLogin" element={<VendorLogin/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/match" element={<Match/>}></Route>
        <Route path="/payments" element={<Payments/>}></Route>
      </Routes>
    </BrowserRouter>
  )


}