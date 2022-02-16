import React, { Component } from 'react'
import { Card, Button, message } from 'antd'
import './ui.less'
export default class Messages extends Component {
    showMessage = (type) => {
        message[type]("加油加油")
    }
    render() {
        return (
            <div>
                <Card title="全局提示框" className='card-wrap'>
                    <Button type="primary" onClick={() => this.showMessage('success')}>success</Button>
                    <Button type="primary" onClick={() => this.showMessage('info')}>onfo</Button>
                    <Button type="primary" onClick={() => this.showMessage('error')}>error</Button>
                </Card>
            </div>
        )
    }
}
