import React, { Component } from "react";
import { Card, Row, Col, Table, Button, Badge, Descriptions } from "antd";
import { getUserList } from "../../api/index";
import AddModal from "./addModal"

export default class Index extends Component {
  state = {
    data: [],
    record: "",
    title:"",
    visible:false
  };

  loadData = () => {
    getUserList().then((res) => {
      this.setState({
        data: res.data,
      });
    });
  };

  showModal = () => {
    this.setState({
      visible:true,
      title:"权限设置"
    })
  };

  changeModal=(visible)=>{
    this.setState({
      visible
    })
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
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
        title: "手机号",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "昵称",
        dataIndex: "nickname",
        key: "nickname",
      },
      {
        title: "角色",
        dataIndex: "role",
        key: "role",
      },
      {
        title: "操作",
        dataIndex: "setRole",
        key: "setRole",
        render: () => {
          return (
            <div>
              <Button
                type="primary"
                onClick={this.showModal}
              >
                设置权限
              </Button>
            </div>
          );
        },
      },
    ];
    const { data,visible,title } = this.state;
    return (
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Card className="mt">
              <Table columns={columns} dataSource={data} pagination={false} />
            </Card>
          </Col>

          <Col span={12}>
            <Card className="mt">
              <Descriptions bordered>
                <Descriptions.Item label="销售冠军">
                  王明君
                </Descriptions.Item>
                <Descriptions.Item label="课时冠军">
                萧琪琪
                </Descriptions.Item>
                <Descriptions.Item label="金牌咨询师">
                郭诗云
                </Descriptions.Item>
                <Descriptions.Item label="统计起始时间">
                  2018-04-24 18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="统计截止时间" span={2}>
                  2019-04-24 18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="本月盈亏" span={3}>
                  <Badge status="processing" text="盈利320万元" />
                </Descriptions.Item>
                <Descriptions.Item label="收益科目">
                数学
                </Descriptions.Item>
                <Descriptions.Item label="较差科目">语文</Descriptions.Item>
                <Descriptions.Item label="进步科目">
                数学
                </Descriptions.Item>
                <Descriptions.Item label="备注">
                  综合趋势有所下降，主要受国家政策影响，老师离职率较高，需要管控人员走动，
                数学是主要盈利科目，英语报名人数较少，英语老师有空闲，排班不满的情况
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>

        <AddModal
          visible={visible}
          changeModal={this.changeModal}
          title={title}
        />
      </div>
    );
  }
}
