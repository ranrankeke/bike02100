import { useState } from "react";
import axios from '../axios/index'
import Utils from '../utils/utils'
export const RequestList = (url, params) => {
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState();
  var data = {
    params: params
  }
  axios.ajax.ajax({
    url: url,
    data: data
  }).then((data) => {
    if (data && data.result) {
      setList(data.result.item_list.map((item, index) => {
        item.key = index;
        return item;
      }))
      setPagination(Utils.pagination(data, (current) => {
        params.page = current;
        RequestList();
      }))

    }
  })
}