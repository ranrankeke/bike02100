import React, { Component } from 'react'
import { Card, message, Tabs } from 'antd'
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
export default class Tab extends Component {
    handleCallback = () => {
        message.info("坚持就是胜利")
    }
    UNSAFE_componentWillMount() {
        const panes = [
            {
                title: "Tab 1",
                content: "Tab 1",
                key: 1
            },
            {
                title: "Tab 2",
                content: "Tab 2",
                key: 2
            },
            {
                title: "Tab 3",
                content: "Tab 3",
                key: 3
            }
        ]
        this.setState({
            panes
        })
    }
    onChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }
    render() {
        return (
            <div>
                <Card title="Tab页签" className='card-wrap'>
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">欢迎学习react课程</TabPane>
                        <TabPane tab="Tab 2" key="2">欢迎学习react实战课程</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className='card-wrap'>
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><AppleOutlined />Tab 1</span>} key="1">欢迎学习react课程</TabPane>
                        <TabPane tab={<span><AndroidOutlined />Tab2</span>} key="2">欢迎学习react实战课程</TabPane>
                    </Tabs>
                </Card>
                <Card title="动态添加Tab页签" className='card-wrap'>
                    <Tabs defaultActiveKey="1"
                        onChange={this.onChange}
                        onChange={this.handleCallback}
                        type="editable-card"

                    >
                        {
                            this.state.panes.map((panel) => {
                                //一定要return
                                return (
                                    <TabPane tab={panel.title} key={panel.key}>
                                        {panel.content}
                                    </TabPane>)
                            })
                        }
                    </Tabs>
                </Card>

            </div>
        )
    }
}
