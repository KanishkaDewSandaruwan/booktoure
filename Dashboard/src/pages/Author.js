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



function Author() {

    // table code start
const columns = [
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
                            setAuthoeID(recode);
                        }} type="primary" icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                </>
            );
        },
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "32%",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: "32%",
    },

    {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: "5%",
    },

    {
        title: "Phone Number",
        key: "phone",
        dataIndex: "phone",
    },
    {
        title: "Gender",
        key: "gender",
        dataIndex: "gender",
    },
    {
        title: "Email",
        key: "email",
        dataIndex: "email",
    },
    {
        title: "Accept",
        key: "accept",
        dataIndex: "accept",
    },
    {
        title: "Reg. Date",
        key: "cdate",
        dataIndex: "cdate",
    },
    {
        title: "Facebook",
        key: "facebook",
        width: "32%",
        render: (recode) => {
            return (
                <>
                   <a href={recode.facebook}>{recode.facebook}</a>
                </>
            );
        },
    },
    {
        title: "Twitter",
        key: "twitter",
        width: "32%",
        render: (recode) => {
            return (
                <>
                   <a href={recode.twitter}>{recode.twitter}</a>
                </>
            );
        },
    },
];

    const [data, setData] = useState([]);
    const [author_id, setAuthoeID] = useState();

    const confirm = (recode) => {
        deleteAuthor(author_id);
        deleteBooks(author_id);
    }

    const cancel = (e) => {

    }

    useEffect(() => {
        loadCustomer();
    })

    const deleteAuthor = (recode) => {
        const author_id = recode.author_id;
        Axios.delete(`http://localhost:3001/author/delete/${author_id}`).then((res) => {
            message.success('Author Delete Success!');
        })
    }

    const deleteBooks = (recode) => {
        const author_id = recode.author_id;
        Axios.delete(`http://localhost:3001/author/delete/book/${author_id}`).then((res) => {
        })
    }

    

    const loadCustomer = () => {
        Axios.get('http://localhost:3001/author/view').then((respons) => {
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
                            title="Author Details"
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

export default Author;
