import React, { Component } from 'react'
import { Card, Table, Modal, message, Button } from 'antd'
import axios from '../../axios'
import utils from '../../utils/utils'

export default class BasicTable extends Component {
    state = {

    }
    //不需要this.setState 重新渲染  因为是接口需要 而不是页面需要？？？
    params = {
        page: 1
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
        //添加key值
        dataSource.map((item, index) => {
            return item.key = index;
        })
        this.setState({
            dataSource
        })
        this.request();
    }
    //动态获取mock数据
    request = () => {
        //避免作用域出现问题
        let _this = this;
        //二次封装的axios 便于错误拦截处理 和 loading效果
        axios.ajax({
            url: '/table/list',
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
                    dataSource2: res.result.list,
                    selecetedRowKeys: [],
                    selectedRows: null,
                    pagination: utils.pagination(res, (current) => {
                        _this.params.page = current;
                        this.request();
                    })
                })
            }
        })
    }
    onRowClick = (record, index) => {
        //选中的索引值
        let selectKey = [index];
        console.log('selectKey', selectKey)
        Modal.info({
            title: '信息',
            content: `用户名:${record.username}`
        })
        this.setState({
            //选中的索引值
            selectedRowKeys: selectKey,
            //选中的是哪一项
            selectedItem: record
        })
        console.log('selectedItem', this.state.selectedItem);
    }
    handleDelete = (() => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item) => {
            return ids.push(item.id)
        })
        Modal.confirm({
            title: '删除提示',
            //join() 方法用于把数组中的所有元素转换一个字符串  元素是通过指定的分隔符进行分隔的
            content: `您确认要删除这些数据吗${ids.join(',')}`,
            onOk: () => {
                message.success('删除成功');
                this.request();
            }
        })
    })
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
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                let ids = [];
                selectedRows.map((item) => {
                    ids.push(item.id)
                })
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
                console.log('selectedRowKeys', selectedRowKeys);
                console.log('selectedRows', selectedRows);
            }
        }
        return (
            <div>
                <Card title="基础表格">
                    <Table columns={columns}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination={false}
                    />
                </Card>
                <Card title="动态渲染表格" style={{ margin: '10px 0' }}>
                    <Table columns={columns}
                        dataSource={this.state.dataSource2}
                        bordered
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-单选" style={{ margin: '10px 0' }}>
                    <Table columns={columns}
                        // rowSelection onRow dataSource bordered pagination 是api 名称是固定的 不能修改
                        //设置单选按钮 还是 复选框
                        rowSelection={rowSelection}
                        //设置行属性 record 指的是这一行
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                    console.log('click', record);
                                }
                            }
                        }}
                        dataSource={this.state.dataSource2}
                        bordered
                        pagination={false}
                    />
                </Card>

                <Card title="Mock-复选框" style={{ margin: '10px 0' }}>
                    <div style={{ marginBottom: 10 }}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table columns={columns}
                        rowSelection={rowCheckSelection}
                        dataSource={this.state.dataSource2}
                        bordered
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-表格分页" style={{ margin: '10px 0' }}>
                    <div style={{ marginBottom: 10 }}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table columns={columns}
                        rowSelection={rowCheckSelection}
                        dataSource={this.state.dataSource2}
                        bordered
                        pagination={this.state.pagination}
                    />
                </Card>
            </div >
        )
    }
}
