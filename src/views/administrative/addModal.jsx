import React, { Component } from "react";
import { Modal, Radio } from "antd";

export default class addModal extends Component {
    // componentDidUpdate(){
    //     console.log("权限",this.props)
    // }
  render() {
    const {title,visible} = this.props
    const handleCancel = () => {
        this.props.changeModal(false);
      }
    const handleOk = ()=>{
        this.props.changeModal(false)
    }
    return (
      <div>
        <Modal
          title={title}
          width={500}
          open={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Radio.Group value="1">
            <Radio value={1} defaultchecked={true}>管理员/老板</Radio>
            <Radio value={2}>老师/咨询师</Radio>
            <Radio value={3}>部门经理</Radio>
          </Radio.Group>
        </Modal>
      </div>
    );
  }
}
