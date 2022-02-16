import React, { Component } from 'react'
import { Card, Spin, Alert } from 'antd';
import './ui.less'
export default class Loading extends Component {
    render() {
        return (
            <div>
                <Card title="spin用法" className='card-wrap'>
                    <Spin />

                </Card>
                <Card title="内容遮罩">
                    <Spin tip="Loading..." className='card-wrap'>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"
                        />
                    </Spin>
                </Card>

            </div>
        )
    }
}
