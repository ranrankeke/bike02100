import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './index.less'
import Util from '../../utils/utils'
export default class Header extends Component {
    state = {

    }
    componentDidMount() {
        this.setState({
            userName: "河畔一角"
        })
        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        }, 1000)
    }

    render() {
        const menuType = this.props.menuType;
        return (
            <div className='header'>
                <Row className='header-top'>
                    {
                        menuType ?
                            <Col span={6} >
                                <img src="/assets/logo-ant.svg" alt="" />
                                <span className='imooc'>IMooc 通用管理系统</span>
                            </Col> : ''
                    }
                    <Col span={menuType ? 18 : 24}>
                        <span>欢迎:{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType ? '' :
                        <Row className='breadcrumb'>
                            <Col span={4} className="breadcrumb-title">首页</Col>
                            <Col span={20} className="weather">
                                <span className='date'>{this.state.sysTime}</span>
                                <span className='weather-detail'>天气</span>
                            </Col>
                        </Row>
                }

            </div>
        )
    }
}
