import { useState, useEffect } from "react";
import { Preloader, Bars } from "react-preloader-icon";
import Header from "../common/header";
import Sidebar from "../common/sidebar";

import TopHeader from "../common/TopHeader";

import { Outlet } from "react-router-dom";

const DashboardMain = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  if (!loaded) {
    return (
      <div className="loading-page">
        <div className="center">
          <Preloader
            use={Bars}
            size={60}
            strokeWidth={10}
            strokeColor="#e3ecec"
            // strokeColor="#f7b085"
            duration={600}
          />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <TopHeader />
        <div className="d-flex" id="wrapper">
          {/* <!-- Sidebar--> */}

          <Sidebar />
          {/* <!-- Page content wrapper--> */}
          <div className="main" id="page-content-wrapper">
            {/* <!-- Top navigation--> */}
            <Header />
            {/* <!-- Page content--> */}
            <div className="container-fluid content-container">
              <Outlet />
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default DashboardMain;
