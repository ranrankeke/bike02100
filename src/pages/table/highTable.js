import React, { Component } from 'react'
import { Card, Table } from 'antd'
import axios from './../../axios'
import utils from './../../utils/utils'
export default class highTable extends Component {
    state = {

    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.request();
    }
    request = () => {
        //避免作用域出现问题
        let _this = this;
        //二次封装的axios 便于错误拦截处理 和 loading效果
        axios.ajax({
            url: '/table/high/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                if (res.code === 0) {
                    res.result.list.map((item, index) => {
                        return item.key = index;
                    })
                }
                this.setState({
                    dataSource: res.result.list,

                })
            }
        })
    }
    handleChange = (pagination, filters, sorter) => {

        this.setState({

            sortOrder: sorter.order
        })
        console.log(sorter)
    }
    render() {
        const columns = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '用户',
                key: 'username',
                dataIndex: 'username',
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '前端小白',
                        '3': '有为青年',
                        '4': '创业者',
                        "5": '风华才子'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render(state) {
                    let config = {
                        '1': '打篮球',
                        '2': '踢足球',
                        '3': '打乒乓球',
                        '4': '打羽毛球',
                        '5': '打网球',
                        '6': '爬山',
                        '7': '打游戏',
                        '8': '跑步'
                    }
                    return config[state];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'addrress',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            }
        ]
        const columns2 = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id',
                width: 60,
                fixed: "left"
            },
            {
                title: '用户',
                key: 'username',
                dataIndex: 'username',
                width: 60,
                fixed: "left"
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                },
                width: 60
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '前端小白',
                        '3': '有为青年',
                        '4': '创业者',
                        "5": '风华才子'
                    }
                    return config[state];
                },
                width: 120
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render(state) {
                    let config = {
                        '1': '打篮球',
                        '2': '踢足球',
                        '3': '打乒乓球',
                        '4': '打羽毛球',
                        '5': '打网球',
                        '6': '爬山',
                        '7': '打游戏',
                        '8': '跑步'
                    }
                    return config[state];
                },
                width: 120
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday',
                width: 120
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday',
                width: 120
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday',
                width: 120
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday',
                width: 120
            },
            {
                title: '地址',
                key: 'addrress',
                dataIndex: 'address',
                width: 120
            },
            {
                title: '地址',
                key: 'addrress',
                dataIndex: 'address',
                width: 120
            },
            {
                title: '地址',
                key: 'addrress',
                dataIndex: 'address',
                width: 120
            },
            {
                title: '地址',
                key: 'addrress',
                dataIndex: 'address',
                width: 120
            },
            {
                title: '地址',
                key: 'addrress',
                dataIndex: 'address',
                width: 120
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time',
                width: 120,
                fixed: "right"
            }
        ]
        const columns3 = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '用户',
                key: 'username',
                dataIndex: 'username',
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                key: 'age',
                dataIndex: 'age',
                sorter: (a, b) => {
                    return a.age - b.age
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '前端小白',
                        '3': '有为青年',
                        '4': '创业者',
                        "5": '风华才子'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render(state) {
                    let config = {
                        '1': '打篮球',
                        '2': '踢足球',
                        '3': '打乒乓球',
                        '4': '打羽毛球',
                        '5': '打网球',
                        '6': '爬山',
                        '7': '打游戏',
                        '8': '跑步'
                    }
                    return config[state];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'addrress',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            }
        ]
        return (
            <div>
                <Card title="头部固定">
                    <Table columns={columns}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination={false}
                        scroll={{ y: 240 }}
                    />
                </Card>
                <Card title="左侧固定" style={{ margin: '10px 0' }}>
                    <Table columns={columns2}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination={false}
                        scroll={{ x: 1630 }}
                    />
                </Card>
                <Card title="表格排序" style={{ margin: '10px 0' }}>
                    <Table columns={columns3}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>

            </div>
        )
    }
}
