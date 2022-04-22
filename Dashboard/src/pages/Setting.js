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
    Space,
} from "antd";
import {
    Form,
    Input,
    Radio,
    Select,
} from 'antd';
import Axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react';
// Images
import face2 from "../assets/images/face-2.jpg";
import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined, FileImageOutlined } from '@ant-design/icons';
import ClearableLabeledInput from "antd/lib/input/ClearableLabeledInput";

const { Title } = Typography;


function Settings() {

    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleImageUpload, setIsModalVisibleImageUpload] = useState(false);

    const [editerData, setEditerData] = useState([]);
    const [catid, setCategoryID] = useState();
    const [header, setHeader] = useState([]);

    const history = useHistory();

    useEffect(() => {
        getHeader();
    })

    const getHeader = () => {
        Axios.get('http://localhost:3001/settings/viewHeader').then((respons) => {
            setHeader(respons.data);
        })
    }

    // const confirm = () => {

    // }

    // const cancel = (e) => {
    //     history.push('/settings');
    // }

    const showModal = () => {
        setIsModalVisible(true);
    };
    const showModalImage = () => {
        setIsModalVisibleImageUpload(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleUpload = ({ fileList }) => {
        setFileList(fileList);
    }

    const editcategoryimage = {
        name: "image",
        action: `http://localhost:3001/category/edit/editimageupload/${catid}`,
        headers: {
            authorization: "authorization-text",
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                setCategoryID("");
                message.success(`${info.file.name} file uploaded successfully`);
                form.resetFields();
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const onFinish = (values) => {
        const data = new FormData();


        if (fileList[0] != null) {

            data.append('header', fileList[0].originFileObj);
            data.append('title', values.title);
            data.append('description', values.description);

            Axios.post('http://localhost:3001/settings/change', data)
                .then((respons) => {
                    handleCancel();
                    history.push('/settings');
                    message.success('Header Change Success!');
                }).catch((err) => {
                    console.log(err);
                })
        } else {
            message.warning('Please Select Image to Change Header!');
        }

    };


    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Settings"
                        >
                            <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                                <Row style={{ padding: '10px' }}>
                                    <Col span={6}>
                                        <Button type="primary" icon={<PlusOutlined />} onClick={showModal} >Change Hompage Header</Button>
                                    </Col>
                                </Row>
                                <Row style={{ padding: '10px' }}>
                                    <Col span={12}>
                                        {header.map((val, key) => (
                                            <>
                                                <Row><h>Header Title : {val.title}</h></Row>
                                                <Row><h>Header Description : {val.description}</h></Row>
                                                <img src={'http://localhost:3001/settings/' + val.header_image} />
                                            </>
                                        ))}
                                    </Col>
                                </Row>
                               
                            </Space>
                            <Modal title="Home Page Manage" okText="Finish" onOk={form.submit} visible={isModalVisible} onCancel={handleCancel}>
                                <Form
                                    name="UploadForm"
                                    onFinish={onFinish}
                                    // onFinishFailed={onFinishFailed}
                                    form={form} >
                                    <Form.Item label="Title" name="title"
                                        rules={[{ required: true, message: 'Please Enter Title' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Description" name="description"
                                        rules={[{ required: true, message: 'Please Enter Description' }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Header Image" name="header">
                                        <Upload
                                            istType="picture-card"
                                            fileList={fileList}
                                            // onPreview={handlePreview}
                                            onChange={handleUpload}
                                            beforeUpload={() => false}
                                        >
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        </Upload>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </Card>
                    </Col>
                </Row>
            </div >
        </>
    );
}

export default Settings;
