import React, { Component } from 'react'
import { Row, Col } from 'antd'
import NavLeft from './components/NavLeft'
import Header from './components/Header'
import Footer from './components/Footer'
//import Home from '../src/pages/home'
import './style/common.less'
export default class Admin extends Component {
    render() {
        return (
            //所有列（Col）必须放在 Row 内。
            <Row className='container'>
                <Col className="nav-left" style={{ width: "20%" }}>
                    <NavLeft />
                </Col>
                <Col className="main" style={{ width: "80%" }}>
                    <Header />
                    <div className='content'>
                        {/* <Home /> */}
                        {this.props.children}
                    </div>

                    <Footer />
                </Col>
            </Row>

        )
    }
}
