import React, { Component } from "react";
import { Row, Col, Card, Divider, Badge, Calendar,Avatar, List } from "antd";
import style from "./index.module.css";
import { loginAction } from "../../redux/actions/login";
import { connect } from "react-redux";
import moment from "moment";

class Index extends Component {
  state = {
    text: "",
  };

  componentDidMount() {
    // this.time()
    console.log(this.state.text);
  }

  time = () => {
    const date = new Date().getHours();
    let text = "";
    if (date > 7 && date <= 9) {
      text = "早上好";
    } else if (date > 9 && date <= 12) {
      text = "上午好";
    } else if (date > 12 && date <= 15) {
      text = "中午好";
    } else if (date > 15 && date <= 19) {
      text = "下午好";
    } else {
      text = "晚上好";
    }
    this.setState({
      text,
    });
  };

  render() {
    const { nickname } = this.props.res.loginReducer;
    const getListData = (value) => {
      let listData;
      switch (value.date()) {
        case 8:
          listData = [
            {
              type: "warning",
              content: "This is warning event.",
            },
            {
              type: "success",
              content: "This is usual event.",
            },
          ];
          break;
        case 10:
          listData = [
            {
              type: "warning",
              content: "This is warning event.",
            },
            {
              type: "success",
              content: "This is usual event.",
            },
            {
              type: "error",
              content: "This is error event.",
            },
          ];
          break;
        case 15:
          listData = [
            {
              type: "warning",
              content: "This is warning event",
            },
            {
              type: "success",
              content: "This is very long usual event。。....",
            },
            {
              type: "error",
              content: "This is error event 1.",
            },
            {
              type: "error",
              content: "This is error event 2.",
            },
            {
              type: "error",
              content: "This is error event 3.",
            },
            {
              type: "error",
              content: "This is error event 4.",
            },
          ];
          break;
        default:
      }
      return listData || [];
    };
    const getMonthData = (value) => {
      if (value.month() === 8) {
        return 1394;
      }
    };

    const monthCellRender = (value) => {
      const num = getMonthData(value);
      return num ? (
        <div className="notes-month">
          <section>{num}</section>
          <span>Backlog number</span>
        </div>
      ) : null;
    };
    const dateCellRender = (value) => {
      const listData = getListData(value);
      return (
        <ul className="events">
          {listData.map((item) => (
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      );
    };
    const cellRender = (current, info) => {
      if (info.type === "date") return dateCellRender(current);
      if (info.type === "month") return monthCellRender(current);
      return info.originNode;
    };

    const dataList = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
    ];

    return (
      <div>
        <Card>
          <Row>
            <Col span={8}>
              <div>
                <p className={style.text}>上午好，{nickname}，今天吃点什么？</p>
                <p>课程咨询师 | 禾苗教育-IT技术部-教育管理系统后台</p>
              </div>
            </Col>
            <Col span={8} offset={8}>
              <div>
                <div className={style.wrap}>
                  <span>转化学员数</span>
                  <p className={style.font}>56</p>
                </div>
                <Divider type="vertical" />

                <div className={style.wrap}>
                  <span>团队排名</span>
                  <p className={style.font}>5/23</p>
                </div>
                <Divider type="vertical" />

                <div className={style.wrap}>
                  <span>本月目标</span>
                  <p className={style.font}>2,345</p>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        <Card className="mt">
          <Row>
            <Col span={8}>
              <div className={style.info}>
                <span className={style.span}>我的待办</span>
                <p style={{ fontSize: "24px", color: "rgba(0, 0, 0, 0.65)" }}>
                  8个任务
                </p>
              </div>
            </Col>
            <Col span={8}>
              <div className={style.info}>
                <span className={style.span}>本周任务平均处理时间</span>
                <p style={{ fontSize: "24px", color: "rgba(0, 0, 0, 0.65)" }}>
                  30分钟
                </p>
              </div>
            </Col>
            <Col span={8}>
              <div className={style.info}>
                <span className={style.span}>本周对接学员数</span>
                <p style={{ fontSize: "24px", color: "rgba(0, 0, 0, 0.65)" }}>
                  33个
                </p>
              </div>
            </Col>
          </Row>
        </Card>

        <Row>
          <Col span={18}>
            <Card className="mt">
              <Calendar cellRender={cellRender} />
            </Card>
          </Col>

          <Col span={6}>
            <Card title="操作面板" className="ml" style={{ marginTop: "10px" }}>
              <Card.Grid className={style.gridstyle}>操作一</Card.Grid>
              <Card.Grid hoverable={false} className={style.gridstyle}>
                操作二
              </Card.Grid>
              <Card.Grid className={style.gridstyle}>操作三</Card.Grid>
              <Card.Grid className={style.gridstyle}>操作四</Card.Grid>
              <Card.Grid className={style.gridstyle}>操作五</Card.Grid>
              <Card.Grid className={style.gridstyle}>操作六</Card.Grid>
            </Card>

            <Card className="mt" style={{marginLeft:"10px"}}>
              <List
                itemLayout="horizontal"
                dataSource={dataList}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                        />
                      }
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    res: state,
  }),
  loginAction
)(Index);
