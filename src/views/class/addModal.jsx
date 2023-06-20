import React, { Component } from "react";
import { Modal, Form, Input, DatePicker, Select, message } from "antd";
import { addClass } from "../../api/class";
import moment from "moment";


export default class addModal extends Component {
  handleCancel = () => {
    this.props.changeModal(false);
  };

  handleOk = () => {
    // this.props.changeModal(false);
    this.classRef.validateFields().then((res) => {
        console.log("111",res)
      const time = moment(res.time).format("YYYY-MM-DD HH:mm:ss")
      const fn = addClass({ ...res,time });
      fn.then((data) => {
        // console.log("eda",data)
        if (data.code == 0) {
          message.success(data.msg);
          this.props.changeModal(false);
          this.classRef.resetFields();
        }
      });
    });
  };

  render() {
    const { visible, title } = this.props;
    return (
      <div>
        <Modal
          title={title}
          open={visible}
          width={520}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          cancelText="取消"
          okText="确定"
        >
          <Form
            name="basic"
            style={{
              maxWidth: 472,
              maxHeight: 296,
              marginTop: 20,
            }}
            ref={(a) => (this.classRef = a)}
          >
            <Form.Item
              label="教室："
              name="classroom"
              rules={[
                {
                  required: true,
                  message: "Please input classroom!",
                },
              ]}
            >
              <Input placeholder="如A教101室" />
            </Form.Item>

            <Form.Item
              label="老师："
              name="teacher"
              rules={[
                {
                  required: true,
                  message: "Please input teacher!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="学科："
              name="subject"
              rules={[
                {
                  required: true,
                  message: "Please input subject!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="上课时间："
              name="time"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker placeholder="请选择日期" />
            </Form.Item>

            <Form.Item
              label="班型："
              name="type"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="一对一">
                <Select.Option value="1">一对一</Select.Option>
                <Select.Option value="2">小班</Select.Option>
                <Select.Option value="3">大班</Select.Option>
                <Select.Option value="4">精英版</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
