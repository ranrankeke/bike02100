import { useState, useEffect } from 'react'
import { Card } from 'antd'
import axios from '../../axios'
import './detail.less'
export const OrderDetail = (props) => {
    const [orderInfo, setOrderInfo] = useState({});
    let orderId = props.match.params.orderId;
    useEffect(() => {
        if (orderId) {
            getDetailInfo(orderId);
        }

    }, [])
    const getDetailInfo = (orderId) => {
        axios.ajax({
            url: '/order/detail',
            data: {
                params: {
                    orderId: orderId
                }
            }
        }).then((res) => {
            console.log('res.result', res.result)
            if (res.code == 0) {
                setOrderInfo(res.result)
            }
        })
    }
    // const renderMap = () => {
    //     let map = new window.BMapGL.Map("orderDetailMap");
    //     let point = new window.BMapGL.Point(116.404, 39.915);
    //     map.conterAndZoo(point, 15);

    //     // map.centerAndZoom(new window.BMapGL.Point(116.404, 39.915), 11);
    //     // map.addControl(new window.BMapGL.MapTypeControl());
    //     // map.setCurrentCity("北京");
    //     // map.enableScrolWheelZoom(true);
    //     // this.map=new window.BMap.Map('orderDetailMap');
    //     // this.map.contentAndZoom('北京',11);
    //     // this.addMapContorl();
    // }
    //添加地图控件
    // const addMapContorl=()=>{
    //     let map=this.map;
    //     map.addControl(new window)
    // }
    return (

        <div>
            <Card>
                <div id="orderDetailMap" ></div>
                <div className="detail-items">
                    <div className="item-title">基础信息</div>
                    <ul className="detail-form">
                        <li>
                            <div className="detail-form-left">用车模式</div>
                            <div className="detail-form-content">{orderInfo.mode == 1 ? '服务区' : '停车点'}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">订单编号</div>
                            <div className="detail-form-content">{orderInfo.order_sn}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">车辆编号</div>
                            <div className="detail-form-content">{orderInfo.bike_sn}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">用户姓名</div>
                            <div className="detail-form-content">{orderInfo.user_name}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">手机号码</div>
                            <div className="detail-form-content">{orderInfo.mobile}</div>
                        </li>
                    </ul>
                </div>
                <div className="detail-items">
                    <div className="item-title">行程轨迹</div>
                    <ul className="detail-form">
                        <li>
                            <div className="detail-form-left">行程起点</div>
                            <div className="detail-form-content">{orderInfo.start_location}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">行程终点</div>
                            <div className="detail-form-content">{orderInfo.end_location}</div>
                        </li>
                        <li>
                            <div className="detail-form-left">行驶里程</div>
                            <div className="detail-form-content">{orderInfo.distance / 1000}公里</div>
                        </li>
                    </ul>
                </div>
            </Card>
        </div>
    )

}