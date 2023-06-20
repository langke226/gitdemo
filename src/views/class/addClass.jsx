import React, { Component } from "react";
import { Card, Avatar, message} from "antd";
import style from "./class.module.css";
import AddModal from "./addModal"
import {deleteClass} from "../../api/class"


export default class addClass extends Component {

    state = {
      visible:false,
      title:"",
    }

    addModal=()=>{
        // console.log(123455)
        this.setState({
          visible:true,
          title:"新增排课"
        })
    }

    changeModal=(visible)=>{
      this.setState({
        visible
      })
    }

    // deleteClass=(id)=>{
    //   deleteClass({id}).then(res=>{
    //     if(res.code===0){
    //       message.success(res.msg)
    //       this.loadData()
    //     }
    //   })
    // }
   


  render() {
    const { Meta } = Card;
    const { classroom, teacher, subject, type, time} = this.props;
    const {visible,title} = this.state
    return (
      <div>
        <Card
          className="mt"
          style={{
            width: 500,
          }}
          actions={[<span onClick={this.addModal}>新增排课</span>,<span >删除排课</span>]}
          hoverable={true}
        >
          <Meta
            avatar={
              <Avatar src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F21%2F20150921173512_PehaH.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632629214&t=9306e40f281e43dc65e80566c3bc8bd3" />
            }
            title={
              <div className={style.title}>
                {"教室：" + classroom}
                <span className={style.span}>{time}</span>
              </div>
            }
          />

          <p className={style.font} style={{ marginLeft: "48px" }}>
            {"老师：" + teacher}
          </p>
          <p className={style.font} style={{ marginLeft: "48px" }}>
            {"学科：" + subject}
          </p>
          <p className={style.font} style={{ marginLeft: "48px" }}>
            {"班型：" + type}
          </p>
        </Card>
        
        <AddModal
          visible={visible}
          title={title}
          changeModal={this.changeModal}
        />

      </div>
    );
  }
}
