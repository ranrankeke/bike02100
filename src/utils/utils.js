
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
    }
}