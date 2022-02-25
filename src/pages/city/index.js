import React, { useState, useEffect } from 'react'
import { Card, Button, Table, Form, Select, Modal } from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'
import '../../style/common.less'
const { Option } = Select;
export const City = () => {
    const [list, setList] = useState([]);
    const [isShowOpenCity, setIsShowOpenCity] = useState(false);
    const [pagination, setPagination] = useState("");
    const [param, setParam] = useState({ page: 1 });
    //获取表单form对象
    const [cityFormData, setCityFormDate] = useState();
    // state = {
    //     list: [],
    //     isShowOpenCity: false
    // }
    // const param = {
    //     page: 1
    // }
    // componentDidMount() {
    //     this.requestList()
    // }
    useEffect(() => {
        requestList()
    }, []);
    //默认请求接口数据
    const requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/open_city',
            data: {
                params: {
                    page: setParam.page
                }
            }
        }).then((res) => {
            setList(
                res.result.item_list.map((item, index) => {
                    item.key = index;
                    return item
                })
            )
            setPagination(
                Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            )
            // this.setState({
            //     list: res.result.item_list.map((item, index) => {
            //         item.key = index;
            //         return item
            //     }),
            //     pagination: Utils.pagination(res, (current) => {
            //         _this.params.page = current;
            //         _this.requestList();
            //     })
            // })
        })
    }
    //开通城市
    const handleOpenCity = () => {
        setIsShowOpenCity(true)
        // this.setState({
        //     isShowOpenCity: true
        // })
    }
    //城市开通提交
    const handleSubmit = () => {
        const formData = cityFormData.getFieldsValue();
        console.log(formData);
    }

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
            dataIndex: 'mode',
            render(mode) {
                return mode === 1 ? '停车点' : '禁停区'
            }
        }, {
            title: '营运模式',
            dataIndex: 'op_mode',
            render(op_mode) {
                return op_mode === 1 ? '自营' : '加盟'
            }
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
            dataIndex: 'update_time',
            render: Utils.formateDate
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
                <Button type="primary" onClick={handleOpenCity}>开通城市</Button>
            </Card>
            <div className='content-wrap'>
                <Table
                    columns={columns}
                    dataSource={list}
                    pagination={pagination}
                    bordered
                />
            </div>
            <Modal
                title="开通城市"
                visible={isShowOpenCity}
                onCancel={() => {
                    // this.setState({
                    //     isShowOpenCity: false
                    // });
                    setIsShowOpenCity(false);
                }}
                onOk={handleSubmit}
            >
                <OpenCityForm setCityFormDate={setCityFormDate} />
            </Modal>
        </div>
    )
}


const FilterForm = () => {

    return (
        <Form layout="inline" initialValues={{ "city_id": "1" }}>
            <Form.Item label="城市" name="city_id" style={{ width: 200 }}>
                <Select placeholder="全部">
                    <Option value="">全部</Option>
                    <Option value="1">北京市</Option>
                    <Option value="2">天津市</Option>
                    <Option value="3">深圳市</Option>
                </Select>
            </Form.Item>
            <Form.Item label="用车模式" name="mode" style={{ width: 200 }} >
                <Select placeholder="全部" >
                    <Option value="">全部</Option>
                    <Option value="1">指定停车点模式</Option>
                    <Option value="2">禁停区模式</Option>
                </Select>
            </Form.Item>
            <Form.Item label="营运模式" name="op_mode" style={{ width: 200 }}>
                <Select placeholder="全部">
                    <Option value="">全部</Option>
                    <Option value="1">自营</Option>
                    <Option value="2">加盟</Option>
                </Select>
            </Form.Item>
            <Form.Item label="加盟商授权状态" name="auth_status" style={{ width: 200 }} >
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


const OpenCityForm = (props) => {
    const { setCityFormDate } = props;
    const formItemLayout = {
        labelCol: {
            span: 5
        },
        wrapperCol: {
            span: 19
        }
    }
    //处理表单
    const [form] = Form.useForm();
    useEffect(() => {
        setCityFormDate(form);
    }, [])
    return (
        <Form layout="horizontal" form={form}>
            <Form.Item label="选择城市"  {...formItemLayout} name="city_id">
                <Select style={{ width: 100 }}>
                    <Option value="">全部</Option>
                    <Option value="1">北京市</Option>
                    <Option vlaue="2">天津市</Option>
                </Select>
            </Form.Item>
            <Form.Item label="营运模式 " {...formItemLayout} name="op_mode">
                <Select style={{ width: 120 }}>
                    <Option value="">全部</Option>
                    <Option value="1">加盟</Option>
                    <Option vlaue="2">自营</Option>
                </Select>
            </Form.Item>
            <Form.Item label="用车模式"  {...formItemLayout} name="use_mode">
                <Select style={{ width: 150 }} >
                    <Option value="">全部</Option>
                    <Option value="1">指定停车区</Option>
                    <Option vlaue="2">禁停区</Option>
                </Select>
            </Form.Item>
        </Form>
    )
}


