import React, { Component } from 'react'
import { Card, Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class FormLogin extends Component {
    render() {
        const onFinish = (values) => {
            console.log('Success:', values);
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };
        return (
            <div>
                <Card title="登陆行内表单">
                    <Form layout="inline">

                        <Form.Item>
                            <Input placeholder='请输入用户名' />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder='请输入密码' />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">登陆</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card title="登陆水平表单" style={{ marginTop: 10 }}>
                    <Form style={{ width: 300 }}>
                        <Form.Item name="usename" initialValues="Jack" rules={[]} >
                            <Input placeholder='请输入用户名' />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder='请输入密码' />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">登陆</Button>
                        </Form.Item>
                    </Form>

                </Card>
                <Card title="antd4版">
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
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                                {
                                    min: 5, max: 10,
                                    message: '长度不在范围内'
                                },
                                {
                                    pattern: new RegExp('^\w+$', 'g'),
                                    message: '用户名必须为字母或者数字'
                                }
                            ]}
                        >

                            <Input prefix={<UserOutlined />} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox >Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                </Card>
            </div>
        )
    }
}
