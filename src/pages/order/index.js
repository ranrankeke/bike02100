import React, { Component, useState, useEffect } from 'react'
import { Card, Form, Select, Button, Table, DatePicker, Pagination, Modal, message } from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'
import { FilterForm } from '../../components/BaseForm'
const { Option } = Select;
export const Order = () => {
    const [list, setList] = useState([]);
    const [param, setParam] = useState({ page: 1 });
    const [pagination, setPagination] = useState("");
    const [orderConfirmVisible, setOrderConfirmVisible] = useState(false);
    const [orderInfo, setOrderInfo] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState();
    const [selectedItem, setSelectdItem] = useState();
    const [form] = Form.useForm();
    useEffect(() => {
        requestList()
    }, [])
    const handleFilter = (params) => {
        params = params;
        requestList()
    }
    const formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            // placeholder: '全部',
            width: 100,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '杭州' }]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            // placeholder: '全部',
            width: 100,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ]
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
    const openOrderDetail = () => {
        let item = selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`, '_blank')

    }
    return (
        <div>
            <Card>
                {/* 表单组件封装后 */}
                <FilterForm formList={formList} filterSubmit={handleFilter} form={form} />
                {/* <FilterForm1 /> */}
            </Card>
            <Card style={{ marginTop: 10 }}>
                <Button type="primary" style={{ marginRight: 20 }} onClick={openOrderDetail}>订单详情</Button>
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

