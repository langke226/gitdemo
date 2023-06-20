import React, { Component,lazy } from "react";
import { Breadcrumb,Card,Row,Col,Input,Button,Table } from "antd";
import style from "./index.module.css"
import {getStudentList} from "../../../api/student"
import {Route} from "react-router-dom"


export default class Index extends Component {

  state = {
    data:[]
  }


  componentDidMount(){
    this.loadData()
  }

  loadData=()=>{
    getStudentList().then(res=>{
      this.setState({
        data:res.data
      })
    })
  }

  jumpPage=()=>{
    this.props.history.push("/index/admissions/solicitation")
  }


  render() {
    

    const columns = [
      {
        title: "序号",
        render: (text, record, index) => index + 1,
        align:"center"
      },
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        align:"center"
      },
      {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
        align:"center",
        render:(text)=>text==1?"男":"女"
      },
      {
        title: "客户状态",
        dataIndex: "status",
        key: "status",
        align:"center",
        render:(text)=>{
          if(text==1){
            return <Button type="primary" style={{background:"green"}}>转化成功</Button>
          }else if(text==2){
            return <Button type="primary">待转化</Button>
          }else{
            return <Button type="primary" danger>转化失败</Button>
          }
        }
      },
      {
        title: "试听状态",
        key: "audition",
        dataIndex: "audition",
        align:"center",
        render:(text)=>text==1?"已转试听":"未转试听"
      },
      {
        title: "招生来源",
        key: "source",
        dataIndex: "source",
        align:"center"
      },
      {
        title: "手机号码",
        dataIndex: "tel",
        key: "tel",
        align:"center"
      },
      {
        title: "年级",
        dataIndex: "grade",
        key: "grade",
        align:"center"
      },
      {
        title: "意向级别",
        dataIndex: "level",
        key: "level",
        align:"center",

      },
      {
        title: "主负责任人",
        dataIndex: "principal",
        key: "principal",
        align:"center"
      },
      {
        title: "详情",
        align:"center",
        render:(text,record)=>{
          return <div>
            <Button type="primary" onClick={this.jumpPage}>详情</Button>
          </div>
        }
      },
    ];
    return (
      <div>
        {/* 面包屑导航 */}
        <Breadcrumb
          items={[
            {
              title: "招生管理",
            },
            {
              title: '意向学员管理',
            },
          ]}
        />

        {/* 头部导航栏 */}
          <Card className="mt">
            <Row gutter={16}>
              <Col span={6}>
                <div style={{display:"block"}}>
                  <span className={style.label}>姓名:</span>
                  <Input className={style.input} placeholder="请输入教师姓名"/>
                </div>
              </Col>
              <Col span={6}>
                <div>
                  <span className={style.label}>负责人:</span>
                  <Input className={style.input} placeholder="请输入负责人姓名"/>
                </div>
              </Col>
              <Col span={4}>
                <div>
                <Button type="primary" className="mr">查询</Button>
                <Button>重置</Button>
                </div>
              </Col>
                
            </Row>
          </Card>

        {/* 功能栏 */}
        <Card className="mt">
          <div>
            <Button type="primary" className="mr">新增</Button>
            <Button type="primary" danger className="mr">删除</Button>
            <Button type="primary" className="mr">转化为正式学员</Button>
            <Button type="primary">取消转化</Button>
          </div>
        </Card>

        {/* 表格信息 */}
        <Card className="mt">
          <Table
          dataSource={this.state.data}
          columns={columns}
          />
        </Card>
      </div>
    );
  }
}
