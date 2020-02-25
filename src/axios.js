import Vue from "vue";
import axios from "axios";
import qs from "qs";
axios.interceptors.request.use(request => {
	request.url = "/circles" + request.url;
	if (
		request.data &&
		request.headers["Content-Type"] !== "multiple/form-data" &&
		(request.headers["Content-Type"] === "application/x-www-form-urlencoded" || (request.method === "post" && request.headers["Content-Type"] !== "application/json"))
	) {
		request.data = qs.stringify(request.data);
	}
	if (request.method === "get") {
		request.params = { ...request.params, time: new Date().getTime() };
	}
	return request;
});
//请求全局配置
Vue.prototype.$axios = axios;
