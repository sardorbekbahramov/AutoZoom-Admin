import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Locations = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("access_token") ? "" : navigate("/login");
  }, []);
  return <div className=" text-[60px]">Locations</div>;
};

export default Locations;
