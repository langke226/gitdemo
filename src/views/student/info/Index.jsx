import React, { Component } from "react";
import { studentList } from "../../../api/student";
import {
  Breadcrumb,
  Card,
  Row,
  Col,
  Input,
  Form,
  Select,
  Button,
  Radio,
  Table,
  Pagination,
} from "antd";

import style from "./index.module.css";


export default class Index extends Component {

  formRef = React.createRef()
  state = {
    data: [],
    pageData: {
      page: 1,
      pagaSize: 10,
    },
    total:0,
    formData:{}
  };

  loadData = () => {
    studentList({ ...this.state.pageData,...this.state.formData}).then((res) => {
      // console.log("777",res)
      this.setState({
        data: res.data,
      });
    });
  };

  //查询
  search = ()=>{
    const formData = this.formRef.current.getFieldsValue(true)
    // console.log("666",formData)
    this.setState({
      formData
    },function(){
      this.loadData()
    })
  }

  //重置
  reset = ()=>{
    // console.log("555",this.formRef)
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

  componentDidMount() {
    this.loadData();
  }

  render() {
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
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: 80,
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
        width: 80,
      },
      {
        title: "年级",
        dataIndex: "grade",
        key: "grade",
        width: 100,
      },
      {
        title: "科目",
        dataIndex: "subject",
        key: "4",
        width: 100,
      },
      {
        title: "班型",
        dataIndex: "type",
        key: "type",
        width: 100,
        render: (text) => {
          if (text == 1) {
            return "一对一";
          } else if (text == 2) {
            return "小班";
          } else if (text == 3) {
            return "大班";
          } else {
            return "精英班";
          }
        },
      },
      {
        title: "家长姓名",
        dataIndex: "parentname",
        key: "parentname",
        width: 100,
      },
      {
        title: "家长电话",
        dataIndex: "parenttel",
        key: "parenttel",
        width: 180,
      },
      {
        title: "班主任姓名",
        dataIndex: "classteacher",
        key: "classteacher",
        width: 120,
      },
      {
        title: "校区",
        dataIndex: "campus",
        key: "campus",
        width: 100,
        render: (text) => {
          if (text == 1) {
            return "中心校区";
          } else if (text == 2) {
            return "顺义校区";
          } else if (text == 3) {
            return "昌平校区";
          } else {
            return "大兴校区";
          }
        },
      },
      {
        title: "剩余课时",
        dataIndex: "percent",
        key: "percent",
        width: 150,
      },
      {
        title: "已缴费用",
        dataIndex: "charge",
        key: "charge",
        width: 100,
      },
      {
        title: "课程有效期",
        dataIndex: "validperiod",
        key: "validperiod",
        width: 150,
      },
      {
        title: "课程顾问",
        dataIndex: "consultant",
        key: "consultant",
        width: 100,
      },
      {
        title: "操作",
        key: "operation",
        fixed: "right",
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
              title: "学生信息",
            },
          ]}
        />

        {/* 搜索栏 */}
        <Card className="mt">
          <Form
            ref={this.formRef}
          >
            <Row>
              <Col span={6}>
                <div>
                  <span className={style.label}>姓名：</span>
                  <Input className={style.input} placeHolder="请输入学生姓名" />
                </div>
              </Col>
              <Col span={6}>
                <div>
                  <Form style={{ width: "340px" }}>
                    <Form.Item label="科目:">
                      <Select placeholder="全部">
                        <Select.Option value="">全部</Select.Option>
                        <Select.Option value="语文">语文</Select.Option>
                        <Select.Option value="数学">数学</Select.Option>
                        <Select.Option value="英语">英语</Select.Option>
                        <Select.Option value="物理">物理</Select.Option>
                        <Select.Option value="化学">化学</Select.Option>
                        <Select.Option value="生物">生物</Select.Option>
                      </Select>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
              <Col span={6}>
                <Form style={{ width: "340px" }}>
                  <Form.Item label="年级:">
                    <Select placeholder="全部">
                      <Select.Option value="">全部</Select.Option>
                      <Select.Option value="一年级">一年级</Select.Option>
                      <Select.Option value="二年级">二年级</Select.Option>
                      <Select.Option value="三年级">三年级</Select.Option>
                      <Select.Option value="四年级">四年级</Select.Option>
                      <Select.Option value="五年级">五年级</Select.Option>
                      <Select.Option value="六年级">六年级</Select.Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Col>
              <Col span={6}>
                <div className="ml">
                  <Button type="primary" className="mr" onClick={this.search}>
                    查询
                  </Button>
                  <Button onClick={this.reset}>重置</Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card>

        {/* 选项卡 */}
        <Card className="mt">
          <Radio.Group value="">
            <Radio.Button value="">全部</Radio.Button>
            <Radio.Button value="1">中心校区</Radio.Button>
            <Radio.Button value="2">顺义校区</Radio.Button>
            <Radio.Button value="3">大兴校区</Radio.Button>
            <Radio.Button value="4">昌平校区</Radio.Button>
          </Radio.Group>
        </Card>

        {/* 学生信息表格 */}
        <Card className="mt">
          <Table dataSource={data} columns={columns} />
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
