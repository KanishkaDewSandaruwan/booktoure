import {
  Row,
  Col,
  Card,
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

import { Layout } from 'antd';

import {
  Form,
  Input,
  Pagination,
  Radio,
  Select,
} from 'antd';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react';
// Images
import face2 from "../assets/images/face-2.jpg";
import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined, RetweetOutlined, CheckOutlined } from '@ant-design/icons';
import Item from "antd/lib/list/Item";

const { Title } = Typography;

function Book() {

  const { Header, Footer, Sider, Content } = Layout;
  const history = useHistory();

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [author, setAuthor] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [book, setBook] = useState([])
  const [category, setCategory] = useState([]);

  const [pdfrespons, setPdfResponse] = useState([]);
  const [bookid, setBookID] = useState();
  const [isedit, setIsEdit] = useState(true);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [uploadbookid, setUploadBookID] = useState();

  const confirm = () => {
    deleteBook(bookid)
  }

  const confirmAccept = () => {
    if (bookid) {
      Axios.put(`http://localhost:3001/book/accept/${bookid}`
      ).then((respons) => {
        message.success('Book Accept is Success!');
        setBookID("");
      })
    }
  }

  const confirmReject = () => {
    if (bookid) {
      Axios.put(`http://localhost:3001/book/reject/${bookid}`
      ).then((respons) => {
        message.success('Book Reject is Success!');
        setBookID("");
      })
    }
  }

  const cancel = (e) => {
    setBookID("");
  }

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  }

  const handleUploadEdit = ({ fileList }) => {
    setFileList(fileList);
  }

  useEffect(() => {
    getBook();
  })

  const deleteBook = (bookid) => {
    Axios.delete(`http://localhost:3001/book/delete/${bookid}`).then((res) => {
      message.success('Book Delete Success!');
      setBookID("");
    })
  }

  const getAuthor = () => {
    Axios.get('http://localhost:3001/author/view').then((respons) => {
      setAuthor(respons.data);
    })
  }

  const getCategory = () => {
    Axios.get('http://localhost:3001/category/view').then((respons) => {
      setCategory(respons.data);
    })
  }

  const getBook = () => {
    Axios.get('http://localhost:3001/book/view').then((respons) => {
      setBook(respons.data);
    })
  }

  const showModal = () => {
    getAuthor();
    getCategory();
    setIsModalVisible(true);
  };
  const showUploadModal = () => {
    setIsUploadModalVisible(true);
    form.resetFields();
  };

  const handleCancelUpload = () => {
    setIsUploadModalVisible(false);
    form.resetFields();
  }

  const handleOk = () => {
    setIsUploadModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEdit(true)
  };

  const uploadPDFformProps = {
    name: "book",
    action: `http://localhost:3001/book/editpdf/${uploadbookid}`,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        bookid("");
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const uploadImageformProps = {
    name: "image",
    action: `http://localhost:3001/book/editimage/${uploadbookid}`,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        setUploadBookID("");
        message.success(`${info.file.name} file uploaded successfully`);
        form.resetFields();
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const props = {
    name: 'book',
    action: 'http://localhost:3001/book/pdf',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {

      setPdfResponse(info);

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
  const onFinishEdit = (values) => {
    console.log(bookid);

    Axios.put(`http://localhost:3001/book/edit/${bookid}`, values)
      .then((respons) => {
        handleCancel();
        message.success('Book Editing is Success!');
        form.resetFields();
        history.push('/book');
      }).catch((err) => {
        console.log(err);
      })
  }
  const onFinish = (values) => {
    let data = new FormData();

    if (fileList[0] != null) {

      data.append('file', fileList[0].originFileObj);
      data.append('title', values.title);
      data.append('author', values.author);
      data.append('description', values.description);
      data.append('price', values.price);
      data.append('pdf', pdfrespons.file.name);
      data.append('category', values.category);

      Axios.post('http://localhost:3001/book/newbook', data)
        .then((respons) => {
          handleCancel();
          message.success('Book Adding Success!');
          history.push('/book');
        }).catch((err) => {
          console.log(err);
        })
    }else{
      message.warning('Please Select Image');
    }
  };

  const onFinishUpload = () => {
    history.push('/book');
    handleCancelUpload();
  }

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Book Details"
              style={{ minWidth: '100px' }}
              extra={
                <>
                  <Button type="primary" icon={<PlusOutlined />} onClick={showModal} >Add New</Button>
                  <Modal title="Book Changers" okText="Save Changes" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>

                    {isedit ? <Form
                      name="basic_edit"
                      onFinish={onFinish}
                      form={form}
                    >
                      <Form.Item label="Book Title" name="title"
                        rules={[{ required: true, message: 'Please Enter Book Title' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item onClick={getAuthor} label="Author" name="author">
                        <Select>
                          {author.map((val, key) => {
                            return <><Select.Option value={val.author_id}>{val.name}</Select.Option></>
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item label="Category" name="category">
                        <Select>
                          {category.map((val, key) => {
                            return <><Select.Option value={val.cat_id}>{val.cat_name}</Select.Option></>
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item label="Description" name="description">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Price" name="price" type="number">
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
                      <Form.Item label="Book" name="book">
                        <Upload
                          {...props}
                          accept=".pdf"
                        >
                          <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                      </Form.Item>
                    </Form>

                      :

                      <Form
                        name="basic"
                        onFinish={onFinishEdit}
                        // onFinishFailed={onFinishFailed}
                        form={form} >

                        <Form.Item label="Edit Book Title" name="title">
                          <Input />
                        </Form.Item>
                        <Form.Item onClick={getAuthor} label="Author" name="author">
                          <Select>
                            {author.map((val, key) => {
                              return <><Select.Option value={val.author_id}>{val.name}</Select.Option></>
                            })}
                          </Select>
                        </Form.Item>
                        <Form.Item label="Category" name="category">
                          <Select>
                            {category.map((val, key) => {
                              return <><Select.Option value={val.cat_id}>{val.cat_name}</Select.Option></>
                            })}
                          </Select>
                        </Form.Item>
                        <Form.Item label="Description" name="description">
                          <Input />
                        </Form.Item>
                        <Form.Item label="Price" name="price" type="number">
                          <Input />
                        </Form.Item>
                      </Form>}
                  </Modal>




                  <Modal title="Edit Upload Image and Book" okText="Finish" onOk={form.submit} visible={isUploadModalVisible} onCancel={handleCancelUpload}>
                    <Form
                      name="UploadForm"
                      onFinish={onFinishUpload}
                      // onFinishFailed={onFinishFailed}
                      form={form} >
                      <Form.Item label="Image" name="image">
                        <Upload
                          {...uploadImageformProps}
                        >
                          <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                      </Form.Item>
                      <Form.Item label="Book" name="book">
                        <Upload
                          {...uploadPDFformProps}
                          accept=".pdf"
                        >
                          <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                      </Form.Item>
                    </Form>
                  </Modal>
                </>
              }
            >

              {/* <Table
                  columns={columns}
                  dataSource={book}
                  pagination={false}
                  className="ant-border-space"
                /> */}
            </Card>
          </Col>
        </Row>
        <Row>
        </Row>
        {book.map((val, key) => (
          <Row style={{ padding: '20px', border: '2px solid gray', marginTop: '1%', backgroundColor: 'white', borderRadius: '10px' }}>
            <Col span={14}>
              <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                <Row>
                  <Col span={6}>
                    <h1>Title :</h1>
                  </Col>
                  <Col span={12}>
                    <h1> {val.title}</h1>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <h1>Description : </h1>
                  </Col>
                  <Col span={12}>
                    <h1>{val.book_description}</h1>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <h1>Price : </h1>
                  </Col>
                  <Col span={12}>
                    <h1> <span style={{ color: 'red' }}>Rs. {val.price}</span> </h1>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <h1>Accept : </h1>
                  </Col>
                  <Col span={12}>
                    <h1> {val.accept_book}</h1>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <h1>Book File : </h1>
                  </Col>
                  <Col span={12}>
                    <h1> {val.pdf_file}</h1>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <h1>Category : </h1>
                  </Col>
                  <Col span={12}>
                    <h1>{val.cat_name}</h1>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <h1>Author :</h1>
                  </Col>
                  <Col span={12}>
                    <h1>{val.name} <br />{val.address} <br />{val.phone} <br />{val.email}</h1>
                  </Col>
                </Row>
                {localStorage.getItem('author') == 'admin' ?
                  <Row>
                    <Col span={7}>
                      <>
                        <Popconfirm
                          title="Do you want to Accept this Book?"
                          onConfirm={(confirmAccept)}
                          onCancel={cancel}
                          okText="Accept this Book"
                          cancelText="No"
                        >
                          <Button onClick={() => {
                            setBookID(val.book_id);
                          }} type="primary" icon={<CheckOutlined />}>Accept Book</Button>
                        </Popconfirm>
                      </>
                    </Col>
                    <Col span={12}>
                      <>
                        <Popconfirm
                          title="Do you want to Reject this Book?"
                          onConfirm={(confirmReject)}
                          onCancel={cancel}
                          okText="Reject this Book"
                          cancelText="No"
                        >
                          <Button onClick={() => {
                            setBookID(val.book_id);
                          }} type="danger" icon={<CheckOutlined />}>Reject Book</Button>
                        </Popconfirm>
                      </>
                    </Col>
                  </Row>

                  : <></>}
                <Row>
                  <Col span={7}>
                    <>

                      <Button onClick={() => {
                        setBookID(val.book_id);
                        showModal()
                        setIsEdit(false)
                      }} type="primary" icon={<EditOutlined />}>Edit Details</Button>
                    </>
                  </Col>
                  <Col span={12}>
                    <>

                      <Button onClick={() => {
                        setUploadBookID(val.book_id)
                        showUploadModal()
                        setIsEdit(false)
                      }} type="primary" icon={<EditOutlined />}>Edit Image and File</Button>
                    </>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <>
                      <Popconfirm
                        title="Are you sure to delete this Book?"
                        onConfirm={(confirm)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button onClick={() => {
                          setBookID(val.book_id);
                        }} type="primary" icon={<DeleteOutlined />}>Delete</Button>
                      </Popconfirm>
                    </>
                  </Col>
                </Row>
              </Space>
            </Col>
            <Col span={10}>
              <img src={'http://localhost:3001/upload/' + val.image} />
            </Col>
          </Row>
        ))}
      </div >

    </>
  );
}

export default Book;
