import React, { Component } from "react";
import { Breadcrumb, Card, Row, Col, Statistic } from "antd";
import { getClassList } from "../../api/class";
import AddClass from "./addClass";
import moment from "moment";

export default class Index extends Component {
  state = {
    data: [],
    classroom: "",
    teacher: "",
    subject: "",
    type: "",
    time: "",
    data1: [],
    id: "",
  };

  loadData = () => {
    getClassList().then((res) => {
      console.log("class", res.data);
      res.data.map(item=>{
        this.setState({
          data:res.data,
          id:item.id,
          classroom:item.classroom,
          teacher:item.teacher,
          subject:item.subject,
          type:item.type==1?"一对一":(item.type==2?"小班":(item.type==3?"大班":"精英班")),
          time:moment(item.time).format("YYYY-MM-DD HH:mm:ss")
        })
      })
    });
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { Countdown } = Statistic;
    const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK

    const onFinish = () => {
      console.log("finished!");
    };
    const onChange = (val) => {
      if (typeof val === "number" && 4.95 * 1000 < val && val < 5 * 1000) {
        console.log("changed!");
      }
    };

    const { id, classroom, teacher, subject, type, time } = this.state;

    return (
      <div>
        {/* 面包屑导航 */}
        <Breadcrumb
          items={[
            {
              title: "排课管理",
            },
          ]}
        />

        {/* 倒计时 */}
        <Card className="mt">
          <Row gutter={16}>
            <Col span={8}>
              <Countdown
                title="模拟考倒计时"
                value={deadline}
                onFinish={onFinish}
              />
            </Col>
            <Col span={8}>
              <Countdown
                title="测评日"
                value={deadline}
                format="HH:mm:ss:SSS"
              />
            </Col>
            <Col span={8}>
              <Countdown
                title="中考倒计时"
                value={deadline}
                format="D 天 H 时 m 分 s 秒"
              />
            </Col>
          </Row>
        </Card>

        {/* 排课安排 */}
        <AddClass
          id={id}
          classroom={classroom}
          teacher={teacher}
          subject={subject}
          type={type}
          time={time}
        />
        


      </div>
    );
  }
}
