import { Select } from 'antd'
const { Option } = Select;
export default {
    formateDate(time) {
        if (!time) return '';
        let date = new Date(time);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

    },
    pagination(data, callback) {
        return {
            onChange: (current) => {
                callback(current)
            },
            //当前页数
            current: data.result.page,
            //每页条数
            pageSize: data.result.page_size,
            //总条数
            total: data.result.total,
            showTotal: () => {
                return `共${data.result.total}条`
            },
            showQuickJumper: true
        }
    },
    getOptionList(data) {
        if (!data) {
            return [];
        }
        let options = [<Option value="0" key="all_key"></Option>];
        data.map((item) => {
            options.push(<Option value={item.id} key="all_key">{item.name}</Option>)
        })
    }
}