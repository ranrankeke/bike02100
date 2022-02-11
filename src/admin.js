import React, { Component } from 'react'
import { Row, Col } from 'antd'
import NavLeft from './components/NavLeft'
import Header from './components/Header'
import Footer from './components/Footer'
import './style/common.less'
export default class Admin extends Component {
    render() {
        return (
            //所有列（Col）必须放在 Row 内。
            <Row className='container'>
                <Col span={4} className="nav-left">
                    <NavLeft />
                </Col>
                <Col span={20} className="main">
                    <Row><Header /></Row>
                    <Row className='content'>content</Row>
                    <Row><Footer /></Row>
                </Col>
            </Row>

        )
    }
}
