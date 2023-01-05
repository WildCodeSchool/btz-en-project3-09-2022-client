import axios from "axios";
import React from "react";

function profil() {
  const getUser = async () => {
    const res = await axios.get("http://localhost:4000/api/v1/users");
    return res.data;
  };

  return <div>profil</div>;
}

export default profil;
