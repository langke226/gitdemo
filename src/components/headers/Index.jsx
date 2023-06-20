import React, { Component } from "react";
import { Dropdown, Space,message } from "antd";
import { DownOutlined,UserOutlined,PoweroffOutlined } from '@ant-design/icons';
import {connect} from "react-redux"
import { loginAction,menuAction } from "../../redux/actions/login";


class Index extends Component {
  
  render() {
    const {nickname} = this.props.res.loginReducer
    const items = [
        {
          key: "1",
          label: (
            <a
              target="_blank"
            >
               个人中心
            </a>
          ),
          icon:<UserOutlined />
        },
        {
          key: "2",
          label: (
            <a
              target="_blank"
            >
              退出登录
            </a>
          ),
          icon: <PoweroffOutlined />
        },
      ];
    //   const onClick = ({ key }) => {
    //     message.info(`Click on item ${key}`);
    //   };
    const onClick = ()=>{
        // console.log(this.props)
        sessionStorage.clear()
        this.props.loginAction({role:"",nickname:""})
        this.props.menuAction([])
        this.props.history.push("/login")
        // message.info(`Click on item ${key}`);
    }
    return (
      <div>
        <Dropdown
          menu={{
            items,
            onClick
          }}
          
        >
          <a >
            <Space>
              欢迎您,{nickname}<DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    );
  }
}

export default connect(
    state=>({
        res:state
    }),
    {
        loginAction,
        menuAction
    }
)(Index)