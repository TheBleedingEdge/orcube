import axioss from "axios";
const userInfo = localStorage.getItem("userInfo")

let axios;

  axios = axioss.create({
    baseURL: "http://127.0.0.1:5000",
  });

export default axios
