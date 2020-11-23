import axios from "axios";
import router from "../../router";
import { Toast } from "vant";

const http = axios.create({
    baseURL: "/api/api"
});

//请求拦截
http.interceptors.request.use(req => {
    let token = sessionStorage.getItem("userInfo") ?
        JSON.parse(sessionStorage.getItem("userInfo")).token :
        "";
    req.headers.authorization = token;
    return req;
});

//响应拦截
http.interceptors.response.use(res => {
    if (res.code == 500) {
        Toast.fail(res.msg);
        router.push("/login");
        return res.data;
    } else if (res.code == 403) {
        Toast.fail(res.msg);
        router.push("/login");
        return res.data;
    } else {
        return res.data;
    }
});

export default http;