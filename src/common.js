import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Header from './components/Header'
import { OrderDetail } from './pages/order/detail'
import './style/common.less'
export const Common = (props) => {
    console.log(props);
    return (
        <div>
            <Row className='simple-page'>
                <Header menuType="second" />
            </Row>
            <Row className='content'>
                {props.children}

                {/* <OrderDetail /> */}
            </Row>
        </div>
    )
}