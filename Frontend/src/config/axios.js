import axioss from "axios";
const userInfo = localStorage.getItem("userInfo")

let axios;

if (userInfo) {
  axios = axioss.create({
    baseURL: "http://127.0.0.1:5000",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  });
}
else {
  axios = axioss.create({
    baseURL: "http://127.0.0.1:5000",
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export default axios
