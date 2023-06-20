import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import {Route,NavLink} from "react-router-dom"
import { Layout, Menu } from "antd";
import style from "./index.module.css";
import {getInfo} from "../../api/index";
import { loginAction,menuAction } from "../../redux/actions/login";
import { filterMenu } from "../../utils/menuFilter";
import { asyncRouterMap } from "../../common/routerMap";
import Headers from "../../components/headers/Index"


const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
class Index extends Component {
  state={
    menuTree:[]
  }
  componentDidMount(){
    
    //判断用户是否刷新
    if(this.props.res.menuReducer.length){
      //首次加载
      const menuTree = this.renderMenu(this.props.res.menuReducer)
      this.setState({
        menuTree
      })
    }else{
      //刷新
      getInfo().then(res=>{
        const {loginAction,menuAction} = this.props
        // console.log("6666",res)
        //重新设置用户名和权限
        loginAction({
          role:res.data.role,
          nickname:res.data.nickname
        })
       
        
        //存储菜单数据
        menuAction(filterMenu(asyncRouterMap,res.data.role))
        const menuTree = this.renderMenu(this.props.res.menuReducer)
        this.setState({
          menuTree
        })
      })
    }
  }


  renderMenu=(data)=>{
    return data.map((item)=>{
      if(item.children){
        return <SubMenu title={item.meta.title} key={item.path}>
          {this.renderMenu(item.children)}
        </SubMenu>
      }
      return <Menu.Item key={item.path}>
              <NavLink to={"/index"+item.path}>
                {item.meta.title}
              </NavLink>
            </Menu.Item>
    })
  }

  //创建异步路由
  renderRoute = (menu)=>{
    let routerList = []
    const asynRoute = (data)=>{
      data.forEach((item)=>{
        if(item.children){
          asynRoute(item.children)
        }else{
          routerList.push(
              <Route path={"/index"+item.path} component={lazy(()=>import(`../../views${item.path}/Index.jsx`))} key={item.path}></Route>)
        }
      })
    }
    asynRoute(menu)
    console.log("routerList",routerList)
    return routerList
  }


  render() {
    const {menuReducer} = this.props.res
    return (
      <div>
        <Layout className={style.nav}>
          <Sider style={{ background: "#001529",height:"100vh" }}>
          
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              theme="dark"
              
            >
              <div className={style.container}>
                <h1 className={style.title}>好学教育</h1>
              </div>
              {this.state.menuTree}
            </Menu>
          </Sider>

          <Layout style={{background:"#f4f4f4",height:"100vh",overflow:"auto"}}>
            <Header style={{ background: "#fff",textAlign:"right" }}>
              <Headers history={this.props.history}></Headers>
            </Header>

            <Suspense fallback={<div>loading...</div>}>
              <Content style={{padding:"20px"}}>
                {this.renderRoute(menuReducer)}
              </Content>
            </Suspense>

          </Layout>
        </Layout>
      </div>
    );
  }
}

export default connect(
  state => ({
  res: state,
}),
{
  loginAction,
  menuAction
}
)(Index);
