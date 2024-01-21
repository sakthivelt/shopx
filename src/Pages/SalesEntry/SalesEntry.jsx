import React, { useEffect } from "react";
import "./SalesEntry.css";

//components
import Header from "../../components/Header/Header";
import Detials from "../../components/Detials/Detials";

import { Toaster } from "react-hot-toast";
import Aos from "aos";

function SalesEntry() {
  useEffect(() => {
    Aos.init({
      duration: 3000,
    });
  });

  return (
    <div className="wraper flex justify-center items-center flex-col h-fit w-[100%]">
      <div className="bg_blur_wraper" data-aos="fade-up">
        <div className="bg_blur" />
        <div className="bg_line" />
      </div>
      <h1 className="text-4xl p-[1rem]">SHOP X</h1>
      {/* Continer */}
      <div className=" w-[90%] h-full  p-[1rem] grid grid-row-4 gap-[1rem]">
        <Header />
        <Detials />
      </div>
      <Toaster toastOptions={{ duration: 2000 }} />
    </div>
  );
}

export default SalesEntry;
