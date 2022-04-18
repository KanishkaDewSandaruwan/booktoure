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
import { PlusOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';

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


function Book() {

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [author, setAuthor] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [book, setBook] = useState([])

  const [name, setName] = useState([]);

  const [pdfrespons, setPdfResponse] = useState([]);
  const [bookid, setBookID] = useState();
  const [image, setImage] = useState();

  // table code start
  const columns = [
    {
      title: "Book Title",
      dataIndex: "title",
      key: "title",
      width: "32%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Author",
      key: "author",
      render: (recode) => {
        let author = recode.author;
        Axios.get(`http://localhost:3001/author/viewbyid/${author}`).then((res) => {
          setName(res.data);
          return (
            <>
              <p>{res.data[0].name}</p>
            </>
          );
          console.log(res);
        });
      },
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Accept",
      key: "accept",
      dataIndex: "accept",
    },
    {
      title: "Image",
      key: "image",
      render: (recode) => {
        const imageURL = 'http://localhost:3001/upload/' + recode.image;
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
    {
      title: "Book File",
      key: "pdf",
      render: (recode) => {
        const pdfURL = 'http://localhost:3001/pdf/' + recode.pdf_file;
        return (
          <>
            <a href={pdfURL} > Download </a>
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
                setBookID(recode);
              }} type="primary" icon={<DeleteOutlined />}>Delete</Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const confirm = (recode) => {
    deleteBook(bookid)
  }

  const cancel = (e) => {

  }

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  }

  useEffect(() => {
    getBook();
  })

  const deleteBook = (recode) => {
    const book_id = recode.book_id;
    Axios.delete(`http://localhost:3001/book/delete/${book_id}`).then((res) => {
      message.success('Book Delete Success!');
    })
  }

  const getAuthor = () => {
    Axios.get('http://localhost:3001/author/view').then((respons) => {
      setAuthor(respons.data);
    })
  }

  const getBook = () => {
    Axios.get('http://localhost:3001/book/view').then((respons) => {
      setBook(respons.data);
    })
  }

  const showModal = () => {
    getAuthor();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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

  const onFinish = (values) => {
    const data = new FormData();

    data.append('file', fileList[0].originFileObj);
    data.append('title', values.title);
    data.append('author', values.author);
    data.append('description', values.description);
    data.append('price', values.price);
    data.append('pdf', pdfrespons.file.name);

    Axios.post('http://localhost:3001/book/newbook', data)
      .then((respons) => {
        handleCancel();
        message.success('Book Adding Success!');
      }).catch((err) => {
        console.log(err);
      })
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Book Table"
              extra={
                <>
                  <Button type="primary" icon={<PlusOutlined />} onClick={showModal} >Add New</Button>
                  <Modal title="Add New Book" okText="Save Changes" visible={isModalVisible} onOk={form.submit} onCancel={handleCancel}>
                    <Form
                      name="books"
                      onFinish={onFinish}
                      // onFinishFailed={onFinishFailed}
                      form={form}
                    >
                      <Form.Item label="Book Title" name="title"
                        rules={[{ required: true, message: 'Please Enter Book Title' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item label="Author" name="author">
                        <Select>
                          {author.map((val, key) => {
                            return <><Select.Option value={val.author_id}>{val.name}</Select.Option></>
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item label="Description" name="description">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Price" name="price" type="number">
                        <Input />
                      </Form.Item>
                      <Form.Item label="file" name="file">
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
                  </Modal>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={book}
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

export default Book;
