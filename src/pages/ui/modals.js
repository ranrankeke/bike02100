import React from 'react'
import { Card, Button, Modal } from 'antd'
import './ui.less'
export default class Modals extends React.Component {
    state = {
        showModal1: false,
        showModal2: false
    }
    handleOpen = (type) => {
        this.setState({
            [type]: true
        })
    }
    handleConfirm = (type) => {
        Modal.confirm({
            title: '确认?',
            content: '你确认学会react了吗',
            onkey() {
                console.log('ok')
            },
            onCancel() {
                console.log('cancel')
            }
        })
    }
    render() {
        return (
            <div>
                <Card title="基础模态框" className='card-wrap'>
                    {/* 事件处理函数 如果传参数的话 必须使用箭头函数 你传参数的话 直接this.handle */}
                    <Button type="primary" onClick={() => this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认框" className='card-wrap'>
                    {/* 事件处理函数 如果传参数的话 必须使用箭头函数 你传参数的话 直接this.handle */}
                    <Button type="primary" onClick={() => this.handleConfirm('showModal1')}>Open</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('showModal3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('showModal4')}>水平垂直居中</Button>
                </Card>
                <Modal title="React" visible={this.state.showModal1} onCancel={() => {
                    this.setState({
                        showModal1: false
                    })
                }}>
                    <p>欢迎学习慕课新推出的react高级课程</p>
                </Modal>
                <Modal title="React" visible={this.state.showModal2}
                    okText="好的"
                    cancelText="算了"
                    onCancel={() => {
                        this.setState({
                            showModal2: false
                        })
                    }}>
                    <p>欢迎学习慕课新推出的react高级课程</p>
                </Modal>
            </div>

        )
    }
}