import React, { Component } from "react";
import { Col, Row, Card, Form, Input, Button,Select,Table,Pagination,message } from "antd";
import { getTeacherList,deletes,batchDelete } from "../../api/teacher";
import AddModal from "./addModal";
import moment from "moment"

export default class Index extends Component {
  formRef = React.createRef();
  state = {
    disabled :true,
    data:[],
    formData:{},
    pageData:{
      page:1,
      pageSize:10
    },
    loading:false,
    visible:false,
    total:0,
    record:{},
    title:"",
    selectedRowKeys:[]
  }
  //封装一个获取表单数据的函数（因为页面中有很多需要用到数据的操作）
  loadData = ()=>{
    this.setState({
      loading:true
    })
    getTeacherList({...this.state.pageData,...this.state.formData}).then(res=>{
      this.setState({
        data:res.data,
        loading:false,
        total:res.total,
        disabled:true
      })
    })
  }
  componentDidMount(){
    // getTeacherList(this.state.pageData).then(res=>{
    //   // console.log(res)
    //   this.setState({
    //     data:res.data
    //   })
    // })
    this.loadData()
  }
  //查询
  search = ()=>{
    // console.log(this.formRef)
    // this.formRef.current.validateFields().then(res=>{
    //   console.log(res)
    // })
    const formData = this.formRef.current.getFieldsValue(true)
    this.setState({
      formData
    },function(){
      this.loadData()
    })
  }
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
  showModal=()=>{
    this.setState({
      visible:true,
      title:"新增教师"
    },function(){
      this.myRef.teaRef.resetFields()
    })
  }
  changeModal=(visible)=>{
    this.setState({
      visible
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
  edit=(record)=>{
    this.setState({
      record,
      visible:true,
      title:"编辑教师"
    },function(){
      // console.log(this.teaRef)
      this.myRef.teaRef.setFieldsValue({
        ...record,
        birth:moment(record.birth),
        date:moment(record.date),
      })
    })
  }

  deletes=(id)=>{
    deletes({id}).then(res=>{
      if(res.code===0){
        message.success(res.msg)
        this.loadData()
      }
    })
  }
  batchDelete=()=>{
    batchDelete=({ids:this.state.selectedRowKeys}).then(res=>{
      // console.log(res)
      if(res.code===0){
        message.success(res.msg)
        this.loadData()
      }
    })

  }
  selectChange=(selectedRowKeys)=>{
    this.setState({
      selectedRowKeys,
      disabled:selectedRowKeys.length ? true:false
    })
    console.log("111",selectedRowKeys)
  }

  render() {
    const {disabled,data,loading,visible,total,record,title} = this.state
   
    const columns = [
      {
        title: '序号',
        dataIndex: '',
        key: '',
        align:"center",
        render:(text,record,index)=>index+1,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        align:"center"
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        align:"center",
        render:(text)=>text==1?"男":"女"
      },
      {
        title: '级别',
        dataIndex: 'grade',
        key: 'grade',
        align:"center",
        render:(text)=>{
          if(text==1){
            return "初级教师"
          }else if(text==2){
            return "中级教师"
          }else if(text==3){
            return "高级教师"
          }else{
            return "特级教师"
          }
        }
      },
      {
        title: '科目',
        dataIndex: 'subject',
        key: 'subject',
        align:"center"
      },
      {
        title: '入职日期',
        dataIndex: 'date',
        key: 'date',
        align:"center"
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        align:"center",
        render:(text)=>text==1?"全职":"兼职"
      },
      {
        title: '手机号码',
        dataIndex: 'tel',
        key: 'tel',
        align:"center"
      },
      {
        title: '毕业院校',
        dataIndex: 'school',
        key: 'school',
        align:"center"
      },
      {
        title: '出生年月',
        dataIndex: 'birth',
        key: 'birth',
        align:"center"
      },
      {
        title: '家庭住址',
        dataIndex: 'address',
        key: 'address',
        align:"center"
      },
      {
        title: '学历',
        dataIndex: 'education',
        key: 'education',
        align:"center"
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        fixed:"right",
        align:"center",
        render:(text,record)=>{
          return <div>
                      <Button type="primary" size="small" onClick={()=>this.edit(record)}>编辑</Button>
                      <Button danger size="small" className="mt" onClick={()=>this.deletes(record.id)}>删除</Button>
                </div>
        }
      },
    ];
    return (
      <div>
      {/* 顶部搜索 */}
      <Card>
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              ref={this.formRef}
            >
        <Row gutter={16}>
          <Col span={6}>
              <Form.Item label="姓名" name="name">
                <Input />
              </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="科目" name="subject">
              <Select>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="语文">语文</Select.Option>
                <Select.Option value="数学">数学</Select.Option>
                <Select.Option value="英语">英语</Select.Option>
                <Select.Option value="物理">物理</Select.Option>
                <Select.Option value="化学">化学</Select.Option>
                <Select.Option value="生物">生物</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="手机号" name="tel">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Button type="primary" onClick={this.search}>
              查询
            </Button>
            <Button className="ml" onClick={this.reset}>重置</Button>
          </Col>
        </Row>
      </Form>
      </Card>
      {/* 增加删除 */}
      <Card className="mt">
        <Button type="primary" onClick={this.showModal}>新建员工</Button>
        <Button danger disabled={disabled} className="ml" onClick={this.batchDelete}>批量删除</Button>
      </Card>
      {/* 表格 */}
      <Card className="mt">
        <Table 
        columns={columns} 
        dataSource={data} 
        scroll={{x:1400}}
        loading={loading}
        pagination={false}
        rowSelection={{
          type: "checkbox",
          selectedRowKeys:this.state.selectedRowKeys,
          onChange:this.selectChange
        }}
        />

        <Pagination 
        size="small" 
        total={total} 
        showSizeChanger 
        showQuickJumper 
        onChange={this.pageChange}
        className="mt"
        style={{textAlign:"right"}}/>
      </Card>

      <AddModal 
      visible={visible} 
      changeModal={this.changeModal}
      reload={this.loadData}
      record={record}
      ref={a=>this.myRef=a}
      title={title}
      />
      </div>
    );
  }
}
