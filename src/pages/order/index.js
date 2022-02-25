import React, { Component, useState, useEffect } from 'react'
import { Card, Form, Select, Button, Table, DatePicker, Pagination, Modal, message } from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'
const { Option } = Select;
export const Order = () => {
    const [list, setList] = useState([]);
    const [param, setParam] = useState({ page: 1 });
    const [pagination, setPagination] = useState("");
    const [orderConfirmVisible, setOrderConfirmVisible] = useState(false);
    const [orderInfo, setOrderInfo] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState();
    const [selectedItem, setSelectdItem] = useState();
    useEffect(() => {
        requestList()
    }, [])
    const requestList = () => {
        const _this = this;
        axios.ajax({
            url: '/order/list',
            data: {
                params: {
                    page: param.page
                }
            }
        }).then((res) => {
            setList(
                res.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                })
            )
            setPagination(
                Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            )

        })
    }
    const columns = [
        {
            title: '订单编号',
            dataIndex: 'order_sn',
            key: 'order_sn'
        }, {
            title: '车辆编号',
            dataIndex: 'bike_sn',
            key: 'bike_sn'
        }, {
            title: '用户名',
            dataIndex: 'user_name',
            key: 'user_name'
        }, {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile'
        }, {
            title: '里程',
            dataIndex: 'distance',
            key: 'distance',
            render(distance) {
                return distance / 1000 + "Km"
            }
        }, {
            title: '行驶时长',
            dataIndex: 'total_time',
            key: 'total_time'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render(status) {
                return status = 1 ? '进行中' : '结束行程'
            }
        },
        {
            title: '开始时间',
            dataIndex: 'start_time',
            key: 'start_time'
        },
        {
            title: '结束时间',
            dataIndex: 'end_time',
            key: 'end_time'
        },
        {
            title: '订单金额',
            dataIndex: 'total_fee',
            key: 'total_fee'
        },
        {
            title: '实付金额',
            dataIndex: 'user_pay',
            key: 'user_pay'
        }
    ]
    //点击结束订单按钮
    const handleConfirm = () => {
        let item = selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'

            })
            return
        }
        axios.ajax({
            url: '/order/ebike_info',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            return (
                setOrderInfo(res.result),
                console.log(setOrderInfo),
                setOrderConfirmVisible(true)
            )

        })

    }
    //结束订单
    const handleFinishOrder = () => {

        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: 1
            }
        }).then((res) => {
            if (res.code == 0) {
                message.success("订单结束成功")
                setOrderConfirmVisible(false)
            }
            requestList();

        })
    }
    const formItemLayout = {
        labelCol: {
            span: 7
        },
        wrapperCol: {
            span: 17
        }
    }

    const rowSelection = {
        type: 'radio',
        selectedRowKeys
    }
    const onRowClick = (record, index) => {
        setSelectedRowKeys([index])
        setSelectdItem(record)

    }
    return (
        <div>
            <Card>
                <FilterForm />
            </Card>
            <Card style={{ marginTop: 10 }}>
                <Button type="primary" style={{ marginRight: 20 }}>订单详情</Button>
                <Button type="primary" onClick={handleConfirm}>结束订单</Button>
            </Card>
            <div className='content-wrap'>
                <Table
                    bordered
                    columns={columns}
                    dataSource={list}
                    rowSelection={rowSelection}
                    onRow={(record, index) => {
                        return {
                            onClick: () => {
                                onRowClick(record, index);
                            }
                        }
                    }}
                />
            </div>
            <Modal
                title="结束订单"
                visible={orderConfirmVisible}
                onCancel={() => {
                    setOrderConfirmVisible(false)
                }}
                onOk={handleFinishOrder}
            >
                <Form layout="horizontal">
                    <Form.Item label="车辆编号" {...formItemLayout}>
                        {orderInfo.bike_sn}
                    </Form.Item>
                    <Form.Item label="剩余电量" {...formItemLayout}>
                        {orderInfo.battery + "%"}
                    </Form.Item>
                    <Form.Item label="行程开始时间" {...formItemLayout}>
                        {orderInfo.start_time}
                    </Form.Item>
                    <Form.Item label="当前位置" {...formItemLayout}>
                        {orderInfo.location}
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )

}
const FilterForm = (props) => {
    const { RangePicker } = DatePicker;
    const formItemLayout = {
        labelCol: {
            span: 5
        },
        wrapperCol: {
            span: 19
        }
    }
    return (
        <Form layout="inline">
            <Form.Item label="城市" name="city_id" style={{ width: 140 }}>
                <Select>
                    <Option value="">全部</Option>
                    <Option value="1">北京市</Option>
                    <Option value="2">天津市</Option>
                </Select>
            </Form.Item>
            <Form.Item label="订单时间">
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" name="start_time" />
            </Form.Item>
            <Form.Item label="">
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" name="end_time" />
                {/* <RangePicker renderExtraFooter={() => 'extra footer'} showTime /> */}
            </Form.Item>
            <Form.Item label="订单状态" style={{ width: 180 }}>
                <Select>
                    <Option value="">全部</Option>
                    <Option value="1">进行中</Option>
                    <Option value="2">结束行程</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" style={{ marginRight: 10 }}>查询</Button>
                <Button>重置</Button>
            </Form.Item>
        </Form>
    )
}
