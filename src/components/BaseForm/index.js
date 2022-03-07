import React, { useState } from 'react'
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from 'antd'
import Utils from '../../utils/utils'

export const FilterForm = (props) => {
    console.log(props);
    const handleFilterSubmit = () => {
        let fieldsValue = props.form.getFieldsValue();
        props.filterSubmit(fieldsValue);
        console.log(fieldsValue);
    }
    const initFormList = () => {
        const formList = props.formList;
        const formItemList = [];
        //循环遍历
        if (formList && formList.length > 0) {
            formList.forEach((item, i) => {
                let label = item.label;
                let field = item.field;
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type == '时间查询') {
                    const start_time = <Form.Item label="订单时间" key={field}>
                        <DatePicker showTime={true} />
                    </Form.Item>
                    formItemList.push(start_time);
                    const end_time = <Form.Item label="~" colon={false} key={field}>
                        <DatePicker showTime={true} />
                    </Form.Item>
                    formItemList.push(end_time);
                } else if (item.type == 'INPUT') {
                    const INPUT = <Form.Item label={label} key={field}>
                        <Input type="text" placeholder={placeholder} />
                    </Form.Item>
                    formItemList.push(INPUT);
                } else if (item.type == 'SELECT') {
                    const SELECT =
                        <Form.Item label={label} key={field}>
                            <Select style={{ width: width }} placeholder={placeholder}>
                                {Utils.getOptionList(item.list)}
                            </Select>
                        </Form.Item>
                    formItemList.push(SELECT);
                } else if (item.type == 'CHECKBOX') {
                    const CHECKBOX = <Form.Item label={label} key={field}>
                        <Checkbox>
                            {label}
                        </Checkbox>
                    </Form.Item>
                    formItemList.push(CHECKBOX);
                }
            })
        }
        return formItemList;
    }
    // const onFinish = (values) => {
    //     console.log('Success:', values);
    // };

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };
    const reset = () => {
        props.form.resetFields();
    }
    return (
        <Form form={props.form}
            layout="inline"
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        >
            {initFormList()}
            <Form.Item>
                <Button type="primary" style={{ margin: '0 20px' }} onClick={handleFilterSubmit} htmlType="submit" >查询</Button>
                <Button onClick={reset}>重置</Button>
            </Form.Item>
        </Form>
    )
}