import React, { Component } from 'react'
import { Card, Form, Input, Button } from 'antd'

class FormLogin extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
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
                        <Form.Item>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: 'Jack',
                                    rules: []
                                })(
                                    <Input placeholder='请输入用户名' />
                                )
                            }

                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '123456',
                                    rules: []
                                })(
                                    <Input placeholder='密码' />
                                )
                            }

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">登陆</Button>
                        </Form.Item>
                    </Form>

                </Card>
            </div>
        )
    }
}
export default Form.useForm()(FormLogin)