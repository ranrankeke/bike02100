import React, { Component } from 'react'
import { Card, Table } from 'antd'
import axios from '../../axios'
export default class BasicTable extends Component {
    state = {

    }
    componentDidMount() {
        const dataSource = [
            {
                id: '0',
                userName: 'Jack',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '1990-01-01',
                address: '石家庄',
                time: '06:30:12'
            },
            {
                id: '1',
                userName: 'Tom',
                sex: '2',
                state: '1',
                interest: '2',
                birthday: '1998-01-01',
                address: '石家庄长安区',
                time: '08:30:12'
            }
        ]
        this.setState({
            dataSource
        })
        this.request();
    }
    request = () => {
        //二次封装的axios 便于错误拦截处理 和 loading效果
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: 1
                },
                isShowLoading: false
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    dataSource2: res.result.list
                })
            }
        })

    }
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户',
                dataIndex: 'username'
            },
            {
                title: '性别',
                dataIndex: 'sex'
            },
            {
                title: '状态',
                dataIndex: 'state'
            },
            {
                title: '爱好',
                dataIndex: 'interest'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ]
        return (
            <div>
                <Card title="基础表格">
                    <Table columns={columns}
                        dataSource={this.state.dataSource}
                        bordered
                    />
                </Card>
                <Card title="动态渲染表格" style={{ margin: '10px 0' }}>
                    <Table columns={columns}
                        dataSource={this.state.dataSource2}
                        bordered
                    />
                </Card>
            </div>
        )
    }
}
