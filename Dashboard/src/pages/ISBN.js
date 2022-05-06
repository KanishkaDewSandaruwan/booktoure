import React, { useState } from "react";
import { useHistory, Link } from 'react-router-dom'
import {
  Layout,
  Select,
  Button,
  message,
  Card,
  Form,
  Input,
  Checkbox,
} from "antd";

import Axios from 'axios';

const { Footer, Content } = Layout;


const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function ISBN() {

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Content className="p-0">
          <div style={{ marginTop: 220 }}>
          </div>
          <Card
            className="card-signup header-solid h-full"
            title={<h5>Welcome! Book Toure Tutorial point</h5>}
            bordered="false"
          >
              <Button onClick={() => window.history.back()}>Back</Button>
           

          </Card>
        </Content>
        <Footer>
          <p className="copyright">
            {" "}
            © 2021. Copyright : Book Tour
          </p>
        </Footer>
      </div >
    </>
  );
}


export default ISBN;
