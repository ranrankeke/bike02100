import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Header from './components/Header'
import './style/common.less'
export const Common = () => {
    return (
        <div>
            <Row className='simple-page'>
                <Header menuType="second" />
            </Row>
            <Row className='content'>

            </Row>
        </div>
    )
}