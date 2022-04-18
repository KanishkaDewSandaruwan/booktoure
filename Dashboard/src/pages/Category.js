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
import Axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
// Images
import face2 from "../assets/images/face-2.jpg";
import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ClearableLabeledInput from "antd/lib/input/ClearableLabeledInput";

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

function Category() {

    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [category, setCategory] = useState([]);
    const [isedit, setIsEdit] = useState(true);

    const [editerData, setEditerData] = useState([]);

    const [cat_id, setCatID] = useState();
    const [image, setImage] = useState();

    // table code start
    const columns = [
        {
            title: "Category Name",
            dataIndex: "cat_name",
            key: "cat_name",
            width: "32%",
        },
        {
            title: "Image",
            key: "cat_image",
            render: (recode) => {
                const imageURL = 'http://localhost:3001/upload/category/' + recode.cat_image;
                return (
                    <>
                        <Image
                            width={200}
                            src={imageURL}
                        />
                    </>
                );
            },
        },
        ,
        {
            title: "Edit Name",
            key: "edit",
            render: (recode) => {
                return (
                    <>
                        <Button onClick={() => {
                            showModal();
                            setIsEdit(false);
                            editCategory(recode);
                        }} type="primary" icon={<EditOutlined />}>Edit</Button>
                    </>
                );
            },
        },

        ,
        {
            title: "Change Image",
            key: "changeimage",
            render: (recode) => {
                return (
                    <>
                        <Button onClick={() => {
                            showModal();
                            setIsEdit(false);
                            editCategory(recode);
                        }} type="primary" icon={<EditOutlined />}>Edit</Button>
                    </>
                );
            },
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
                                setCatID(recode);
                            }} type="primary" icon={<DeleteOutlined />}>Delete</Button>
                        </Popconfirm>
                    </>
                );
            },
        },
    ];

    const confirm = (recode) => {
        deleteCategory(cat_id);
    }

    const cancel = (e) => {

    }

    const deleteCategory = (cat_id) => {
        Axios.delete(`http://localhost:3001/category/delete/${cat_id}`).then((res) => {
            message.success('Category Delete Success!');
        })
    }

    const handleUpload = ({ fileList }) => {
        setFileList(fileList);
    }

    useEffect(() => {
        getCategory();
    })

    const getCategory = () => {
        Axios.get('http://localhost:3001/category/view').then((respons) => {
            setCategory(respons.data);
        })
    }

    const showModal = () => {
        getCategory();
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsEdit(true);
        form.resetFields();
    };

    const onFinish = (values) => {
        const data = new FormData();

        data.append('file', fileList[0].originFileObj);
        data.append('cat_name', values.cat_name);

        Axios.post('http://localhost:3001/category/new', data)
            .then((respons) => {
                handleCancel();
                message.success('Category Adding Success!');
            }).catch((err) => {
                console.log(err);
            })
            
    };

    const editCategory = (recode) => {
        setEditerData(recode)
    }

    const onFinishEdit = (values) => {
        const data = new FormData();
        const data2 = new FormData();

        data.append('file', fileList[0].originFileObj);
        data.append('cat_id', editerData.cat_id);

        data2.append('cat_name', values.cat_name);
        data2.append('cat_id', editerData.cat_id);

        if (values.cat_name) {
            Axios.put('http://localhost:3001/category/edit', data2
            ).then((respons) => {
                handleCancel();
                message.success('Category Name Save Success!');
            })
        }
        if (values.file) {
            Axios.put('http://localhost:3001/category/edit/imageupload', data
            ).then((respons) => {
                handleCancel();
                message.success('Category Image Upload Success!');
            })
        }

    }

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Category Table"
                            extra={
                                <>
                                    <Button type="primary" icon={<PlusOutlined />} onClick={showModal} >Add New</Button>
                                    <Modal title="Category" okText="Save Changes" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                                        {isedit ? <Form
                                            name="basic_edit"
                                            onFinish={onFinish}
                                            form={form}
                                        >
                                            <Form.Item label="Category Name" name="cat_name"
                                                rules={[{ required: true, message: 'Please Enter Category Name' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label="Image" name="file">
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

                                            :

                                            <Form
                                                name="basic"
                                                onFinish={onFinishEdit}
                                                // onFinishFailed={onFinishFailed}
                                                form={form} >

                                                <Form.Item label="Edit Category Name" name="cat_name">
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item label="Image" name="file">
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
                                            </Form>}
                                    </Modal>
                                </>
                            }
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={category}
                                    pagination={false}
                                    className="ant-border-space"
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div >
        </>
    );
}

export default Category;
