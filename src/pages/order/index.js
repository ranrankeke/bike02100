import React, { useState, useEffect } from 'react'
import { Card, Form, Select, Button, DatePicker, Table } from 'antd'
import axios from 'axios';
export const Order = () => {
  //通过 Form.useForm 对表单数据域进行交互
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const { Option } = Select;
  const dataSource = []
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'orderSn',
      key: 'orderSn'
    },
    {
      title: '车辆编号',
      dataIndex: 'bikeSn',
      key: 'bikeSn'
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: '里程',
      dataIndex: 'distance',
      key: 'distance'
    },
    {
      title: '行驶时长',
      dataIndex: 'totalTime',
      key: 'totalTime'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime'
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime'
    },
    {
      title: '订单金额',
      dataIndex: 'totalFee',
      key: 'totalFee'
    },
    {
      title: '实付金额',
      dataIndex: 'userPay',
      key: 'userPay'
    },
  ]
  const handleClick = () => {
    //form.getFieldsValue() form自带的方法 获取表单的字段
    let data = form.getFieldsValue();
    console.log(data);
  }
  const onReset = () => {
    //form.resetFields() form 方法 重置表单
    form.resetFields();
  }
  async function queryData() {
    const res = await axios.get('http://127.0.0.1:4523/mock/650390/order/list');
    return res.data;
  }
  useEffect(() => {
    requestList()
  }, [])
  const requestList = () => {
    queryData().then(function (data) {
      setList(
        data.result.itemList.map((item, index) => {
          item.key = index;
          return item
        })
      )
      console.log(data.result.itemList)
    })
  }

  //设置初始值
  const initValue = {
    "city": "1",
    "status": "1"
  }
  return (
    <div>
      <Card>
        <Form layout="inline" form={form} initialValues={initValue}>
          {/* 要想获取表单的数据 需要添加name属性区标记 在form.item 上 */}
          <Form.Item label="城市" style={{ width: 160 }} name="city">
            <Select>
              <Option value="">全部</Option>
              <Option value="1">北京市</Option>
              <Option value="2">天津市</Option>
            </Select>
          </Form.Item>
          <Form.Item label="订单时间" name="startTime" >
            <DatePicker showTime style={{ marginRight: 10 }} />
          </Form.Item>
          <Form.Item name="endTime" >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="订单状态" style={{ width: 180 }} name="status">
            <Select>
              <Option value="">全部</Option>
              <Option value="1">进行中</Option>
              <Option value="2">结束行程</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{ marginRight: 20 }} onClick={handleClick}>查询</Button>
            <Button onClick={onReset}>重置</Button>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Button type="primary" style={{ marginRight: 20, marginBottom: 20 }}>订单详情</Button>
        <Button type="primary" style={{ marginBottom: 20 }}>结束订单</Button>
        <Table
          dataSource={list}
          columns={columns}
        />
      </Card>
    </div>
  )
}