import React, { Component } from 'react'
import { Button, notification, Card } from 'antd';
const openNotification = () => {
    notification.success({
        message: 'Notification Title',
        description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
};
export default class Notice extends Component {
    render() {
        return (
            <div>
                <Card title="通知提醒框">


                    <Button type="primary" onClick={openNotification}>
                        Open the notification box
                    </Button>
                </Card>
            </div>
        )
    }
}
