import React, { Component } from 'react'
import { Card, Button } from 'antd';
import './ui.less'
export default class Buttons extends Component {
    render() {
        return (
            <div>
                <Card title="基础按钮">
                    <Button type="primary">Imooc</Button>
                    <Button>Imooc</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                    <Button disabled>Imooc</Button>
                </Card>
                <Card title="图形按钮">
                    <Button >+ 创建</Button>
                    <Button icon="edit">Imooc</Button>
                    <Button icon="delete">Dashed</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" shape="circle" icon="search" />
                    <Button type="primary" icon="download">/</Button>
                    <Button></Button>
                </Card>
            </div>
        )
    }
}
