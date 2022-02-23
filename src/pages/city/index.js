import React, { Component } from 'react'
import { Card, Button, Table, Form, Select, Modal } from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'
import '../../style/common.less'
export default class City extends Component {
    state = {
        list: [],
        isShowOpenCity: false
    }
    param = {
        page: 1
    }
    componentDidMount() {
        this.requestList()
    }
    //默认请求接口数据
    requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/open_city',
            data: {
                params: {
                    page: this.param.page
                }
            }
        }).then((res) => {
            this.setState({
                list: res.result.item_list.map((item, index) => {
                    item.key = index;
                    return item
                }),
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })

            })
        })
    }
    //开通城市
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity: true
        })
    }
    render() {
        const columns = [
            {
                title: '城市ID',
                //返回的数据源的字段
                dataIndex: 'id'
            }, {
                title: '城市名称',
                dataIndex: 'name'
            }, {
                title: '用车模式',
                dataIndex: 'mode'
            }, {
                title: '营运模式',
                dataIndex: 'op_mode'
            }, {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            }, {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr) {
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(',');
                }

            }, {
                title: '城市开通时间',
                dataIndex: 'open_time'
            }, {
                title: '操作时间',
                dataIndex: 'update_time'
            }, {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }

        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className='content-wrap'>
                    <Table
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        bordered
                    />
                </div>
                <Modal
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onCancel={() => {
                        this.setState({
                            isShowOpenCity: false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                </Modal>


            </div>
        )
    }
}
const { Option } = Select;
class FilterForm extends React.Component {
    render() {
        return (
            <Form layout="inline" initialValues={{ "city_id": "1" }}>
                <Form.Item label="城市" name="city_id">
                    <Select placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">天津市</Option>
                        <Option value="3">深圳市</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="用车模式" name="mode">
                    <Select placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="1">指定停车点模式</Option>
                        <Option value="2">禁停区模式</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="营运模式" name="op_mode">
                    <Select placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="加盟商授权状态" name="auth_status">
                    <Select placeholder="全部">
                        <Option value="">全部</Option>
                        <Option value="1">已授权</Option>
                        <Option value="2">未授权</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" style={{ margin: '0 10px' }}>查询</Button>
                    <Button>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}
