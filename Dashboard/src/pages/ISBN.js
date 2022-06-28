import { PlusOutlined } from "@ant-design/icons";
import {
   Layout
} from "antd";

import a from '../assets/images/6.jpeg';
import b from '../assets/images/4.jpeg';
import c from '../assets/images/5.jpeg';
import d from '../assets/images/3.jpeg';
import e from '../assets/images/7.jpeg';
import f from '../assets/images/1.jpeg';
import g from '../assets/images/2.jpeg';

import {
  Button, Card, Col, Form, Image, Input, message, Modal, Popconfirm, Row, Space, Table, Upload
} from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const { Footer, Content } = Layout;

function ISBN() {
  const history = useHistory();

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Tutorial for ISBN Apply"
              extra={
                <>
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => {history.push('/book')}}>Add New Book</Button>
                </>
              }
            >
              <div className="table-responsive" style={{padding : '10px'}}>
                <h1 style={{padding : '30px', fontSize : '30px', fontWeight : 'bold'}}>Guidelines for Apply ISBN number for your book.</h1>
                <p style={{padding: '30px', fontSize : '20px'}}>You can access the National Library website by clicking the following link. then follow to the mentioned instructions.
                <a href="http://www.natlib.lk/">http://www.natlib.lk/</a>
                1.	Click on the ISBN Apply online tab.</p>
                <img style={{padding: '20px'}} src={a}></img>
                <p style={{padding: '30px', fontSize : '20px'}}>2.	Then you can view the following interface. If you need to know about the ISBN number and other details you can Click on the ISBN tab and can read the information. </p>
                <img style={{padding: '20px'}} src={b}></img>
                <p style={{padding: '30px', fontSize : '20px'}}>3.	Click on the Apply Online function and you can apply for  ISBN  </p>
                <img style={{padding: '20px'}} src={c}></img>
                <p style={{padding: '30px', fontSize : '20px'}}>4.	You can see following interface and if you haven’t an account you can select Sign in option. </p>
                <img style={{padding: '20px'}} src={d}></img>
                <p style={{padding: '30px', fontSize : '20px'}}>5.	Then need to select following mentioned option  </p>
                <img style={{padding: '20px'}} src={e}></img>
                <p style={{padding: '30px', fontSize : '20px'}}>6.	Then you need to select the “Self-Author publications” option  </p>
                <img style={{padding: '20px'}} src={f}></img>
                <p style={{padding: '30px', fontSize : '20px'}}>7.	After that you need to fill the provided form with details and can apply ISBN number for your book. In here you need to pay some amount based on your publication.  </p>
                <img style={{padding: '20px'}} src={g}></img>

              
              
              </div>
            </Card>
          </Col>
        </Row>
      </div >
    </>
  );
}


export default ISBN;
