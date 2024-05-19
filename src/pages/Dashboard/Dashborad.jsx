import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import './dashboard.css';

const Dashborad = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("access_token") ? "" : navigate("/login");
  }, []);

  
  return (
    <>
      <div className="dashboard_main">
        <div className="dashboard-title">
          <h1 style={{fontWeight: 'bold', color:'#d13f3f', fontSize:36, marginBottom:23, marginTop:30}}>Welcome to your dashboard, Autozoom</h1>
          <p style={{fontWeight: 600, color:'#4F4F4F', marginLeft:60, fontSize:22, marginBottom:52}}>Admin panel researching your project!</p>
        </div>

        <div style={{ listStyle: "none", display:"flex", justifyContent: 'start', alignItems: 'center', gap:25, marginLeft:150, marginTop:30, marginBottom:32 }}>
            <div>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="8" fill="#EFF3FA"/>
                <path d="M18 8C15.38 8 13.25 10.13 13.25 12.75C13.25 15.32 15.26 17.4 17.88 17.49C17.96 17.48 18.04 17.48 18.1 17.49C18.12 17.49 18.13 17.49 18.15 17.49C18.16 17.49 18.16 17.49 18.17 17.49C20.73 17.4 22.74 15.32 22.75 12.75C22.75 10.13 20.62 8 18 8Z" fill="#13296A"/>
                <path d="M23.08 20.15C20.29 18.29 15.74 18.29 12.93 20.15C11.66 21 10.96 22.15 10.96 23.38C10.96 24.61 11.66 25.75 12.92 26.59C14.32 27.53 16.16 28 18 28C19.84 28 21.68 27.53 23.08 26.59C24.34 25.74 25.04 24.6 25.04 23.36C25.03 22.13 24.34 20.99 23.08 20.15ZM20 24.13H18.75V25.38C18.75 25.79 18.41 26.13 18 26.13C17.59 26.13 17.25 25.79 17.25 25.38V24.13H16C15.59 24.13 15.25 23.79 15.25 23.38C15.25 22.97 15.59 22.63 16 22.63H17.25V21.38C17.25 20.97 17.59 20.63 18 20.63C18.41 20.63 18.75 20.97 18.75 21.38V22.63H20C20.41 22.63 20.75 22.97 20.75 23.38C20.75 23.79 20.41 24.13 20 24.13Z" fill="#13296A"/>
              </svg>
            </div>
            <div>
              <Link to='/login'>
                  <h2>Get to know your new brands!</h2>
              </Link>
              <p style={{width: 600, marginBottom:5}}>Create rich course content and coaching products for your students.
                  When you give them a pricing plan, they’ll appear on your site!
              </p>
            </div>
        </div>

        <div style={{ listStyle: "none", display:"flex", justifyContent: 'start', alignItems: 'center', gap:25, marginLeft:150, marginTop:30, marginBottom:32 }}>
            <div>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="8" fill="#EFF3FA"/>
                  <path d="M18.37 8.15003L27.37 11.75C27.72 11.89 28 12.31 28 12.68V16C28 16.55 27.55 17 27 17H9C8.45 17 8 16.55 8 16V12.68C8 12.31 8.28 11.89 8.63 11.75L17.63 8.15003C17.83 8.07003 18.17 8.07003 18.37 8.15003Z" stroke="#13296A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M28 28H8V25C8 24.45 8.45 24 9 24H27C27.55 24 28 24.45 28 25V28Z" stroke="#13296A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 24V17" stroke="#13296A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 24V17" stroke="#13296A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18 24V17" stroke="#13296A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 24V17" stroke="#13296A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M26 24V17" stroke="#13296A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7 28H29" stroke="#13296A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

            <div>
              <Link to='/student'>
              <h2 className="text-[18px] font-bold text-[#4F4F4F]">See your location!</h2>
              </Link>
              <p style={{width: 600}}>Create rich course content and coaching products for your students.
                  When you give them a pricing plan, they’ll appear on your site!
              </p>
            </div>
        </div>

        <div style={{ listStyle: "none", display:"flex", justifyContent: 'start', alignItems: 'center', gap:25, marginLeft:150, marginTop:30, marginBottom:32 }}>
            <div >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="8" fill="#EFF3FA"/>
                  <path d="M16.05 8.52997L10.03 12.46C8.10002 13.72 8.10002 16.54 10.03 17.8L16.05 21.73C17.13 22.44 18.91 22.44 19.99 21.73L25.98 17.8C27.9 16.54 27.9 13.73 25.98 12.47L19.99 8.53997C18.91 7.81997 17.13 7.81997 16.05 8.52997Z" stroke="#13296A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11.6301 19.08L11.6201 23.77C11.6201 25.04 12.6001 26.4 13.8001 26.8L16.9901 27.86C17.5401 28.04 18.4501 28.04 19.0101 27.86L22.2001 26.8C23.4001 26.4 24.3801 25.04 24.3801 23.77V19.13" stroke="#13296A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M27.3999 21V15" stroke="#13296A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

            <div className="">
              <Link to='/students'>
                  <h2 className="text-[18px] font-bold text-[#4F4F4F]">Add new branding cars!</h2>
              </Link>
              <p style={{width: 600}}>Create rich course content and coaching products for your students.
                  When you give them a pricing plan, they’ll appear on your site!
              </p>
            </div>
        </div>
      </div>
  </>
  )
};

export default Dashborad;


