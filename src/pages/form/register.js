import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Card, Radio, InputNumber, Select, Switch, DatePicker, Space, TimePicker } from 'antd';
import moment from 'moment'
const { Option } = Select;

export default class FormRegister extends Component {
    state = {
        value: 1
    }
    render() {
        //登陆成功
        const onFinish = (values) => {
            console.log('Success:', values);
        };
        //登陆失败
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };
        //单选按钮
        const onChange = e => {
            console.log('radio checked', e.target.value);
            this.setState({
                value: e.target.value
            })
        };

        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }

        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        return (
            <div>

                <Card title="注册表单">
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                            {...formItemLayout}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            {...formItemLayout}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label="性别" name="sex" {...formItemLayout}>
                            <Radio.Group onChange={onChange} value={this.state.value}>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="年龄" name="age" {...formItemLayout}>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="当前状态" name="state" {...formItemLayout}>
                            <Select>
                                <Option value="1">咸鱼一条</Option>
                                <Option value="2">白纸一张</Option>
                                <Option value="3">风华浪子</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="爱好" name="like" {...formItemLayout}>
                            <Select mode="multiple" defaultValue={['1', '2']}>
                                <Option value="1">游泳</Option>
                                <Option value="2">打篮球</Option>
                                <Option value="3">踢足球</Option>
                                <Option value="4">跑步</Option>
                                <Option value="5">爬山</Option>
                                <Option value="6">桌球</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="是否已婚" name="marry" {...formItemLayout} valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        <Form.Item label="生日" name="birthday" {...formItemLayout}>
                            <Space direction="vertical">
                                <DatePicker defaultValue={moment('2015/01/01')} />
                            </Space>
                        </Form.Item>
                        <Form.Item label="联系地址" name="address" {...formItemLayout}>
                            <Input.TextArea rows={4} placeholder="河北省石家庄市长安区谈固大街32号..." />
                        </Form.Item>
                        <Form.Item label="早起时间" name="time" {...formItemLayout}>
                            <TimePicker defaultValue={moment('00:00:00', 'HH:mm:ss')} />
                        </Form.Item>
                        <Form.Item label="头像" {...formItemLayout}>

                        </Form.Item>
                        <Form.Item name="xieyi" {...offsetLayout} valuePropName="checked">
                            <Checkbox>我已阅读过<a href="#">慕课协议</a></Checkbox>
                        </Form.Item>
                        <Form.Item  {...offsetLayout} rules={[{ required: true }]} valuePropName="checked" >
                            <Button type="primary" htmlType="submit">注册</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
