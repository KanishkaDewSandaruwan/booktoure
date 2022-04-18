/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import {
    Row,
    Col,
    Card,
    Table,
    Upload,
    message,
    Progress,
    Button,
    Avatar,
    Typography,
    Modal,
  } from "antd";
  import {
    Form,
    Input,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
  } from 'antd';
  
  import { Link } from "react-router-dom";
  import React, { useEffect, useState } from 'react';
  // Images
  import face2 from "../assets/images/face-2.jpg";
  import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
  
  const { Title } = Typography;
  
  const formProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  // table code start
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "32%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  
    {
      title: "Phone Number",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "NIC Number",
      key: "nic",
      dataIndex: "nic",
    },
    {
      title: "Edit",
      key: "edit",
      dataIndex: "edit",
    },
  ];
  
  const data = [
    {
      key: "1",
      name: (
        <>
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={face2}
            ></Avatar>
            <div className="avatar-info">
              <Title level={5}>Michael John</Title>
              <p>michael@mail.com</p>
            </div>
          </Avatar.Group>{" "}
        </>
      ),
      function: (
        <>
          <div className="author-info">
            <Title level={5}>Manager</Title>
            <p>Organization</p>
          </div>
        </>
      ),
  
      status: (
        <>
          <Button type="primary" className="tag-primary">
            ONLINE
          </Button>
        </>
      ),
      edit: (
        <>
          <div className="ant-employed">
            <a href="#pablo">Edit</a>
          </div>
        </>
      ),
    },
  ];
  
  
  function Download() {
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
  
    return (
      <>
        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Download Table"
                extra={
                  <>
                    <Modal title="Add New Book" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                      <Form
                        style={{ borderRadius: '50px' }}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                      >
                        <Form.Item label="Book Title">
                          <Input />
                        </Form.Item>
                        <Form.Item label="Author">
                          <Select>
                            <Select.Option value="demo">Mahagamasekara</Select.Option>
                            <Select.Option value="demo">Sujeewa</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item label="Description">
                          <Input />
                        </Form.Item>
                        <Form.Item label="Price" type="number">
                          <Input />
                        </Form.Item>
                        <Form.Item label="Image">
                          <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                          </Upload>
                        </Form.Item>
                        <Form.Item label="Date">
                          <DatePicker />
                        </Form.Item>
                      </Form>
                    </Modal>
                  </>
                }
              >
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    className="ant-border-space"
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
  
  export default Download;
  