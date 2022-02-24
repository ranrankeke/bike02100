import React, { Component } from 'react'
import { Form, Radio, Card, Button, Modal, Select } from 'antd'
const { Option } = Selection;
export default class Order extends Component {
    render() {
        return (
            <div>
                <Card>
                    <OpenCityForm />
                </Card>

            </div>
        )
    }
}
class OpenCityForm extends React.Component {
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        return (
            <Form layout="horizontal">
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
}


