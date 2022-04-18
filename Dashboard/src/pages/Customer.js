import {
  Row,
  Col,
  Card,
  Table,
  Upload,
  message,
  Image,
  Button,
  Avatar,
  Typography,
  Popconfirm,
  Modal,
} from "antd";
import {
  Form,
  Input,
  Radio,
  Select,
} from 'antd';
  
  import React, { useEffect, useState } from 'react';
  // Images
  import face2 from "../assets/images/face-2.jpg";
  import { PlusOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
  import Axios from 'axios';

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
  

  
  function Customer() {

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
      title: "Reg. Date",
      key: "cdate",
      dataIndex: "cdate",
    },
    {
      title: "Delete",
      key: "delete",
      render: (recode) => {
        return (
          <>
            <Popconfirm
              title="Are you sure to delete this Book?"
              onConfirm={(confirm)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button onClick={() => {
                setCustomerID(recode);
              }} type="primary" icon={<DeleteOutlined />}>Delete</Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

    const [data, setData] = useState([]);
    const [customer_id, setCustomerID] = useState();

    const confirm = (recode) => {
      deleteCustomer(customer_id)
    }
    const cancel = (e) => {

    }
    
    useEffect(() => {
      loadCustomer();
    })

    const deleteCustomer = (recode) => {
      const customer_id = recode.customer_id;
      Axios.delete(`http://localhost:3001/customer/delete/${customer_id}`).then((res) => {
        message.success('Customer Delete Success!');
      })
    }

    const loadCustomer = () => {
      Axios.get('http://localhost:3001/customer/view').then((respons) => {
        setData(respons.data)
      })
    }
  
    return (
      <>
        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Customer Table"
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
  
  export default Customer;
  