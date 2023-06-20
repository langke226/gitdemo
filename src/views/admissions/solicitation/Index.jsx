import React, { Component } from "react";
import { Breadcrumb, Card, Button, Descriptions, Steps } from "antd";

export default class Index extends Component {
  backWard = () => {
    this.props.history.push("/index/admissions/intentional");
  };

  render() {
    const description = "This is a description.";
    return (
      <div>
        {/* 面包屑导航 */}
        <Breadcrumb
          items={[
            {
              title: "招生管理",
            },
            {
              title: "邀约查询",
            },
          ]}
        />

        {/* 返回上一页 */}
        <Card className="mt">
          <Button
            type="primary"
            style={{ float: "right" }}
            onClick={this.backWard}
          >
            返回
          </Button>
        </Card>

        <Card className="mt">
          <Descriptions title="家长信息">
            <Descriptions.Item label="姓名">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="电话">1810000000</Descriptions.Item>
            <Descriptions.Item label="家庭住址">
              Hangzhou, Zhejiang
            </Descriptions.Item>
            <Descriptions.Item label="咨询课程">empty</Descriptions.Item>
            <Descriptions.Item label="年龄">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
            <Descriptions.Item label="文化程度">1810000000</Descriptions.Item>
            <Descriptions.Item label="关系">1810000000</Descriptions.Item>
            <Descriptions.Item label="意向程度">1810000000</Descriptions.Item>
            <Descriptions.Item label="满意因素">1810000000</Descriptions.Item>
            <Descriptions.Item label="不满意因素">1810000000</Descriptions.Item>
            <Descriptions.Item label="其他意向机构">
              1810000000
            </Descriptions.Item>
            <Descriptions.Item label="备注">1810000000</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card className="mt">
          <Descriptions title="学生信息">
            <Descriptions.Item label="姓名">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="电话">1810000000</Descriptions.Item>
            <Descriptions.Item label="家庭住址">
              Hangzhou, Zhejiang
            </Descriptions.Item>
            <Descriptions.Item label="咨询课程">empty</Descriptions.Item>
            <Descriptions.Item label="年龄">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
            <Descriptions.Item label="文化程度">1810000000</Descriptions.Item>
            <Descriptions.Item label="关系">1810000000</Descriptions.Item>
            <Descriptions.Item label="意向程度">1810000000</Descriptions.Item>
            <Descriptions.Item label="满意因素">1810000000</Descriptions.Item>
            <Descriptions.Item label="不满意因素">1810000000</Descriptions.Item>
            <Descriptions.Item label="其他意向机构">
              1810000000
            </Descriptions.Item>
            <Descriptions.Item label="备注">1810000000</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card className="mt">
          <Descriptions title="课程咨询师信息">
            <Descriptions.Item label="姓名">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="电话">1810000000</Descriptions.Item>
            <Descriptions.Item label="家庭住址">
              Hangzhou, Zhejiang
            </Descriptions.Item>
            <Descriptions.Item label="咨询课程">empty</Descriptions.Item>
            <Descriptions.Item label="年龄">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
            <Descriptions.Item label="文化程度">1810000000</Descriptions.Item>
            <Descriptions.Item label="关系">1810000000</Descriptions.Item>
            <Descriptions.Item label="意向程度">1810000000</Descriptions.Item>
            <Descriptions.Item label="满意因素">1810000000</Descriptions.Item>
            <Descriptions.Item label="不满意因素">1810000000</Descriptions.Item>
            <Descriptions.Item label="其他意向机构">
              1810000000
            </Descriptions.Item>
            <Descriptions.Item label="备注">1810000000</Descriptions.Item>
          </Descriptions>
        </Card>

        {/* 进度条 */}
        <Card className="mt">
          <Steps
            current={2}
            items={[
              {
                title: "报名咨询",
                description:"线上对接预约"
              },
              {
                title: "门店咨询",
                description:"课程顾问李老师接待"
              },
              {
                title: "办理入学",
                description:"安排校区及开课时间"
              },
              {
                title: "开课",
                description:"安排班级"
              },
            ]}
          />
        </Card>
      </div>
    );
  }
}
