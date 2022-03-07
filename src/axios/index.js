import axios from 'axios'
import { Modal } from 'antd'
export default class Axios {
    //static 类方法是在类本身上定义的
    static requestList(url, params) {
        var data = {
            params: params
        }
        this.ajax({
            url: url,
            data: data
        })
    }
    static ajax(options) {
        // debugger
        let loading;

        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById("ajaxLoading");
            loading.style.display = 'block';
        }
        let baseApi = 'http://127.0.0.1:4523/mock/650390'
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById("ajaxLoading");
                    loading.style.display = 'none';
                }
                if (response.status === 200) {
                    let res = response.data;
                    // res.code 是业务代码 自己定的
                    if (res.code === 0) {
                        resolve(res);
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.data.msg
                        })
                    }
                } else {
                    reject(response.data);
                }
            })
        })
    }
}