import React, { Component } from "react";
import { Col, Row, Card, Tabs, List, Timeline } from "antd";
import style from "./index.module.css";
import * as echarts from "echarts";
import {
  ExclamationCircleOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  SmileOutlined,
} from "@ant-design/icons";

export default class Index extends Component {
  state = {
    xData: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    yData: [5, 20, 36, 10, 10, 20],
    timeList: [
      {
        content: "王刚结算了一门课程",
        date: "操作时间 2020-09-18",
        color: "red",
      },
      {
        content: "王刚新增了一名学员",
        date: "操作时间 2020-09-18",
        color: "green",
      },
      {
        content: "李梦如删除了排课记录",
        date: "操作时间 2020-09-18",
        color: "green",
      },
      {
        content: "王丽丽审批了一笔订单",
        date: "操作时间 2020-09-18",
        color: "blue",
      },
      {
        content: "刘小浩登陆了系统",
        date: "操作时间 2020-09-18",
        color: "gray",
      },
    ],
  };
  componentDidMount() {
    this.drawBar();
    this.drawPie();
  }

  //绘制柱形图
  drawBar() {
    var myChart = echarts.init(this.MyRef);
    myChart.setOption({
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      xAxis: {
        data: this.state.xData,
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: this.state.yData,
        },
      ],
    });
  }

  //绘制折线图
  drawLine(){
    var myChart = echarts.init(this.MyRef2);
    myChart.setOption({
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      xAxis: {
        data: this.state.xData,
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "line",
          data: this.state.yData,
        },
      ],
    });
  }

  //绘制饼图
  drawPie() {
    var myChart = echarts.init(this.MyPie);

    myChart.setOption({
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "语文" },
            { value: 735, name: "数学" },
            { value: 580, name: "英语" },
            { value: 484, name: "物理" },
            { value: 300, name: "化学" },
            { value: 300, name: "生物" },
          ],
        },
      ],
    });
  }

  callback=(activeKey)=>{
    if(activeKey == 2){
      setTimeout(()=>{
        this.drawLine()
      })
    }
  }
  render() {
    //列表数据
    const data = [
      "1.北京校区",
      "2.北京校区",
      "3.北京校区",
      "4.北京校区",
      "5.北京校区",
      "6.北京校区",
    ];
    return (
      <div>
        {/* 四张卡片 */}
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div>
              <Card
                title="总销售额"
                bordered={false}
                style={{
                  width: 400,
                }}
              >
                <p style={{ fontSize: "25px" }}>
                  ¥ 1526,560
                  <ExclamationCircleOutlined
                    style={{
                      fontSize: "15px",
                      marginLeft: "200px",
                      color: "gray",
                    }}
                  />
                </p>
                <p>
                  <span>
                    周同比 12%
                    <CaretUpOutlined style={{ color: "green" }} />
                  </span>
                  <span>
                    同日比 18%
                    <CaretDownOutlined style={{ color: "red" }} />
                  </span>
                </p>
                <p>日销售额￥122,423</p>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div>
              <Card
                title="访问量"
                bordered={false}
                style={{
                  width: 400,
                }}
              >
                <p style={{ fontSize: "25px" }}>
                  1128
                  <ExclamationCircleOutlined
                    style={{
                      fontSize: "15px",
                      marginLeft: "250px",
                      color: "gray",
                    }}
                  />
                </p>
                <p>
                  <span>
                    周同比 12%
                    <CaretUpOutlined style={{ color: "green" }} />
                  </span>
                  <span>
                    同日比 18%
                    <CaretDownOutlined style={{ color: "red" }} />
                  </span>
                </p>
                <p>日销售额￥122,423</p>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div>
              <Card
                title="支付笔数"
                bordered={false}
                style={{
                  width: 400,
                }}
              >
                <p style={{ fontSize: "25px" }}>
                  337
                  <ExclamationCircleOutlined
                    style={{
                      fontSize: "15px",
                      marginLeft: "280px",
                      color: "gray",
                    }}
                  />
                </p>
                <p>
                  <span>
                    周同比 12%
                    <CaretUpOutlined style={{ color: "green" }} />
                  </span>
                  <span>
                    同日比 18%
                    <CaretDownOutlined style={{ color: "red" }} />
                  </span>
                </p>
                <p>日销售额￥122,423</p>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div>
              <Card
                title="流失学员"
                bordered={false}
                style={{
                  width: 400,
                }}
              >
                <p style={{ fontSize: "25px" }}>
                  52
                  <ExclamationCircleOutlined
                    style={{
                      fontSize: "15px",
                      marginLeft: "280px",
                      color: "gray",
                    }}
                  />
                </p>
                <p>
                  <span>
                    周同比 12%
                    <CaretUpOutlined style={{ color: "green" }} />
                  </span>
                  <span>
                    同日比 18%
                    <CaretDownOutlined style={{ color: "red" }} />
                  </span>
                </p>
                <p>日销售额￥122,423</p>
              </Card>
            </div>
          </Col>
        </Row>
        {/* 选项卡图表 */}
        <Card className={style.wrapContent}>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <Tabs.TabPane tab="销售额" key="1">
              <Row>
                <Col span={18}>
                  <div
                    className={style.panel}
                    ref={(a) => (this.MyRef = a)}
                  ></div>
                </Col>
                <Col span={6}>
                  <List
                    header={<div>校区销售额排名</div>}
                    bordered={false}
                    dataSource={data}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                  />
                </Col>
              </Row>
            </Tabs.TabPane>
            <Tabs.TabPane tab="访问量" key="2">
              <Row>
                <Col span={18}>
                  <div className={style.panel} ref={a=>this.MyRef2=a}></div>
                </Col>
                <Col span={6}></Col>
              </Row>
            </Tabs.TabPane>
          </Tabs>
        </Card>
        {/* 时间进度条，饼图 */}
        <Row gutter={16}>
          {/* 时间进度条 */}
          <Col span={12}>
            <Card className="mt" title="操作动态">
              <Timeline>
                {this.state.timeList.map((item, index) => {
                  return (
                    <Timeline.Item color={item.color} key={index}>
                      <p>{item.content}</p>
                      <p>{item.date}</p>
                    </Timeline.Item>
                  );
                })}
              </Timeline>
            </Card>
          </Col>
          {/* 饼图 */}
          <Col span={12}>
            <Card className="mt" title="销售额类别占比">
              <div className={style.chart} ref={(a) => (this.MyPie = a)}></div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
