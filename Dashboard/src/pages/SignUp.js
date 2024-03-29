import {
  Button, Card, Checkbox, Form,
  Input, Layout, message, Select
} from "antd";
import Axios from 'axios';
import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';


const { Footer, Content } = Layout;
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function SignUp() {

  const [form] = Form.useForm();
  let history = useHistory();
  const [next, setNext] = useState(true);
  const [enable, setEnable] = useState(true);
  const [email, setEmail] = useState();

  const onFinish = (values) => {
    Axios.post('http://localhost:3001/author/create', values
    ).then(() => {
      setEmail(values.email)
      form.resetFields();
      setNext(false);
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishAgree = (values) => {
    Object.assign(values, { email: email })
    console.log(email);

    Axios.put('http://localhost:3001/author/accept', values
    ).then(() => {
      message.success('Your Registration is Success!');
      history.push("/sign-in");
    })
  }

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Content className="p-0">
          <div style={{ marginTop: 220 }}>
          </div>
          <Card
            className="card-signup header-solid h-full"
            title={<h5>Welcome! Author Register With your Details</h5>}
            bordered="false"
          >
            {next ?
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="row-col"
              >
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>

                <Form.Item
                  name="description"
                  rules={[
                    { required: true, message: "Please input your Description!" },
                  ]}
                >
                  <Input placeholder="Description" />
                </Form.Item>

                <Form.Item
                  name="address"
                  rules={[
                    { required: true, message: "Please input your Address!" },
                  ]}
                >
                  <Input placeholder="Address" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: "Please input your Phone Number!" },
                  ]}
                >
                  <Input placeholder="Phone Number" />
                </Form.Item>

                <Form.Item
                  name="facebook"
                  rules={[
                    { required: true, message: "Please Add Your Facebook Link!" },
                  ]}
                >
                  <Input placeholder="Facebook Link" />
                </Form.Item>

                <Form.Item
                  name="twitter"
                  rules={[
                    { required: true, message: "Please Add Your Twitter Link!" },
                  ]}
                >
                  <Input placeholder="Twitter Link" />
                </Form.Item>

                <Form.Item
                  name="gender"
                  rules={[
                    { required: true, message: "Please Select Gender" },
                  ]}
                >
                  <Select placeholder="Please Select Gender" style={{ width: 320 }} onChange={handleChange}>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>


                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>


                <Form.Item
                  name="password"
                  placeholder="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  placeholder="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    NEXT
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Do you have an account?{" "}
                  <Link to="/sign-in" className="text-dark font-bold">
                      Sign In
                  </Link>
                </p>
              </Form>

              :
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinishAgree}
                onFinishFailed={onFinishFailed}
                className="row-col"
              >
                <h6>Accounts and membership</h6>
                <p>
You must be at least 12 years of age to use this Mobile Application. By using this Mobile Application and by agreeing to this Agreement you warrant and represent that you are at least 12 years of age. If you create an account in the Mobile Application, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill.


You shall pay all fees or charges to your account in accordance with the fees, charges, and billing terms in effect at the time a fee or charge is due and payable. If, in our judgment, your purchase constitutes a high-risk transaction, we will require you to provide us with a copy of your valid government-issued photo identification, and possibly a copy of a recent bank statement for the credit or debit card used for the purchase. We reserve the right to change products and product pricing at any time. We also reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. 

Accuracy of information</p>
                <h6>Billing and payments</h6>
                <p> You shall pay all fees or charges to your account in accordance with the fees, charges, and billing terms in effect at the time a fee or charge is due and payable. If, in our judgment, your purchase constitutes a high-risk transaction, we will require you to provide us with a copy of your valid government-issued photo identification, and possibly a copy of a recent bank statement for the credit or debit card used for the purchase. We reserve the right to change products and product pricing at any time. We also reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. 
</p>
                <h6>Accuracy of information</h6>
                <p>
You must be at least 12 years of age to use this Mobile Application. By using this Mobile Application and by agreeing to this Agreement you warrant and represent that you are at least 12 years of age. If you create an account in the Mobile Application, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill.


You shall pay all fees or charges to your account in accordance with the fees, charges, and billing terms in effect at the time a fee or charge is due and payable. If, in our judgment, your purchase constitutes a high-risk transaction, we will require you to provide us with a copy of your valid government-issued photo identification, and possibly a copy of a recent bank statement for the credit or debit card used for the purchase. We reserve the right to change products and product pricing at any time. We also reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. 

</p>


                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value ?
                          Promise.resolve(setEnable(false)) :
                          Promise.reject(new Error('Should accept agreement'), setEnable(true)),
                    },
                  ]}
                >
                  <Checkbox>
                    I have read the agreement
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                    disabled={enable}
                  >
                    Finish Registration
                  </Button>
                </Form.Item>
              </Form>


            }



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


export default SignUp;
