import React, { Component } from 'react'

export default class Info extends Component {
    render() {
        return (
            <div>
                测试动态路由
                动态路由的值是:{this.props.match.params.value}

            </div>
        )
    }
}
