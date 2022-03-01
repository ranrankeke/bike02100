import { Input, Select, Form, Button, Checkbox, Radio } from 'antd'
const { Option } = Select.Option;

export const FilterForm = () => {
    const [form] = Form.useForm();
    const initFormList = () => {
        const formList = this.props.formList;
        if (formList && formList.length > 0) {
            formList.formEach((item, i) => {
                let label = item.label;
                let field = item.field;
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type == 'SELECT') {
                    const SELECT =
                        <Form.Item label={label} >
                            <Select style={{ width: width }} placeholder={placeholder}>
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">结束行程</Option>
                            </Select>
                        </Form.Item>
                }
            })
        }
    }
    return (
        <Form>

        </Form>
    )
}