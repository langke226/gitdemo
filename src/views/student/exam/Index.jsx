import React, { Component } from "react";
import {
  Breadcrumb,
  Card,
  Form,
  Row,
  Col,
  Select,
  Input,
  Button,
  DatePicker,
  Table,
  Pagination
} from "antd";
import moment from "moment";
import { examList } from "../../../api/student";



export default class Index extends Component {

  formRef = React.createRef();

  state = {
    data:[],
    pageData:{
      page:1,
      pageSize:10
    },
    total:0,
    formData:{}
  }
  
  loadData=()=>{
    examList({...this.state.pageData,...this.state.formData}).then((res)=>{
      this.setState({
        data:res.data
      })
    })
  }

  //查询
  search = ()=>{
    const formData = this.formRef.current.getFieldsValue(true)
    this.setState({
      formData
    },function(){
      this.loadData()
    })
  }

  //重置表单
  reset = ()=>{
    //清空表单
    this.formRef.current.resetFields()
    //清空分页
    this.setState({
      pageData:{
        page:1,
        pageSize:10
      },
      formData:{}
    },function(){
      this.loadData()
    })

  }


  pageChange=(page,pageSize)=>{
    // console.log(page,pageSize)
    this.setState({
      pageData:{
        page,
        pageSize
      }
    },function(){
      this.loadData()
    })
  }

  componentDidMount(){
    this.loadData()
  }

  render() {
    const { RangePicker } = DatePicker;
    const {data,total} = this.state
    const columns = [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
        align: "center",
        width: 80,
        render: (text, record, index) => index + 1,
      },
      {
        title: "名称",
        dataIndex: "name",
        key: "name",
        width: 80,
      },
      {
        title: "类别",
        dataIndex: "type",
        key: "type",
        width: 100,
        render:(text)=>{
          if(text==1){
            return "摸底考试"
          }else if(text==2){
            return "随堂测验"
          }else if(text==3){
            return "期中考试"
          }else{
            return "期末考试"
          }
        }
      },
      {
        title: "考试时间",
        dataIndex: "date",
        key: "date",
        width: 100,
        render:(text)=>{
          return moment(text).format("YYYY-MM-DD");
        },
      },
      {
        title: "科目",
        dataIndex: "subject",
        key: "subject",
        width: 100,
      },
      {
        title: "成绩发布时间",
        dataIndex: "publishTime",
        key: "publishTime",
        render:(text)=>{
          return moment(text).format("YYYY-MM-DD");
        },
        width: 100,
      },
      {
        title: "备注",
        dataIndex: "remark",
        key: "remark",
        width: 120,
      },
      {
        title: "参与班级",
        dataIndex: "grade",
        key: "grade",
        width: 150,
      },
    ];
    return (
      <div>
        {/* 面包屑导航 */}
        <Breadcrumb
          items={[
            {
              title: "学生管理",
            },
            {
              title: "考试管理",
            },
          ]}
        />

        {/* 查询栏 */}
        <Card className="mt">
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            ref={this.formRef}
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="考试名称：" name="name">
                  <Input placeholder="请输入考试名称" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="考试类别：" name="type">
                  <Select placeholder="全部">
                    <Select.Option value="">全部</Select.Option>
                    <Select.Option value="1">摸底考试</Select.Option>
                    <Select.Option value="2">随堂测验</Select.Option>
                    <Select.Option value="3">期中考试</Select.Option>
                    <Select.Option value="4">期末考试</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="考试日期" name="date">
                  <RangePicker />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Button type="primary" onClick={this.search}>
                  查询
                </Button>
                <Button className="ml" onClick={this.reset}>
                  重置
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>

        {/* 考试管理表格 */}
        <Card className="mt">
          <Table 
          dataSource={data}
          columns={columns}
          pagination={false}
          />
          <Pagination
            total={total}
            showSizeChanger
            showQuickJumper
            className="mt"
            onChange={this.pageChange}
            style={{textAlign:"right"}}
          />
        </Card>
      </div>
    );
  }
}
