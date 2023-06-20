import React, { Component } from "react";
import style from "./index.module.css";
import { Card, Tabs, Button, Form, Input } from "antd";
import {login} from "../../api/index"
import {connect} from "react-redux"
import {loginAction,menuAction} from "../../redux/actions/login"
import { asyncRouterMap } from "../../common/routerMap";
import {filterMenu} from "../../utils/menuFilter"


class Index extends Component {
  
  login=()=>{
    
    const {loginAction,menuAction,history} = this.props
    this.formRef.validateFields().then(res=>{
      //res可以拿到表单中的数据
      //表单校验通过后登录
      login(res).then((res)=>{
        //存token
        sessionStorage.setItem("token",res.token)
        // console.log(res.role)
        //用户的权限和昵称
        loginAction({
          role:res.role,
          nickname:res.nickname
        })
        //直接筛选出每个角色对应的菜单项
        menuAction(filterMenu(asyncRouterMap,res.role))
        //跳转
        history.push("/index/home")

      }).catch((err)=>{
        console.log("执行第二个",err)
      })
    }).catch((err)=>{
      //表单校验不通过
      console.log(err)
    })
  }
  render() {
    return (
      <div className={style.wrap}>
        <Card
          title="好学教育后台管理系统"
          headStyle={{ textAlign: "center" }}
          style={{ width: 500 }}
          bordered={false}
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="手机号密码登录" key="1">
              <Form
                ref={a=>this.formRef=a}
                name="basic"
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      pattern:/^\w{4,8}$/,
                      message:"账号要求是4-8位数字字母组合",
                  },
                    {
                      required: true,
                      message: "用户名不能为空",
                    },
                    
                  ]}
                >
                  <Input placeholder="请输入您的用户名"/>
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "密码不能为空",
                    },
                  ]}
                >
                  <Input.Password placeholder="请输入您的密码"/>
                </Form.Item>

                
                  <Button 
                  type="primary" 
                  style={{width:"100%"}}
                  onClick={this.login}
                  >
                    立即登陆
                  </Button>

              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="新用户注册" key="2"></Tabs.TabPane>
          </Tabs>
        </Card>
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