import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'
import MenuConfig from '../../config/menuConfig'
const { SubMenu } = Menu;
export default class NavLeft extends Component {
    //menu样式
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    componentDidMount() {
        const menuTreeNode = this.renderMenu(MenuConfig)
        this.setState({
            menuTreeNode
        })
    }
    //菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                //一定要记住return
                return (
                    <SubMenu key={item.key} title={item.title}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key} title={item.title}>
                <Link to={"/admin" + item.key}>{item.title}</Link>
            </Menu.Item>
        }
        )
    }
    render() {
        return (
            <div className='gbike'>
                <div className='logo'>
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>Imooc MS</h1>
                </div>
                <div >

                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={this.state.collapsed}
                    >
                        {this.state.menuTreeNode}
                    </Menu>
                </div>
            </div>
        )
    }
}
