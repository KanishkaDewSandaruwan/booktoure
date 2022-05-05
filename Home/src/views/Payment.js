import React, { useEffect } from "react";
import { Button, message, PageHeader, Row, Statistic } from "antd";

import {
    Col,
    Card,
    Table,
    Upload,
    Image,
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

import Navbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useState } from "react";
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBookReader, faCreditCard, faDownload, faHighlighter, faLink, faMessage, faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";


export default function Payment() {

    const history = useHistory();
    const [category, setCategory] = useState();
    const [header, setHeader] = useState([]);
    const [payment, setGetPayment] = useState([]);

    const columns = [
        {
            title: "Payment ID",
            key: "payment_id",
            width: "15%",
            render: (recode) => {
                return (
                    <>
                        <h4>#{recode.payment_id}</h4>
                    </>
                );
            },
        },
        {
            title: "Payment",
            dataIndex: "payment",
            key: "payment",
            width: "10%",
        },
        {
            title: "Date",
            dataIndex: "cdate",
            key: "cdate",
            width: "32%",
        },
        {
            title: "Total",
            key: "total",
            width: "40%",
            render: (recode) => {
                return (
                    <>
                        <h4>Rs. {recode.total}</h4>
                    </>
                );
            },
        },

    ];

    useEffect(() => {
        if (!localStorage.getItem('customer')) {
            history.push('/auth/login');
        }
        loadData();
    }, [])


    const loadData = () => {
        getHeader();
        getPayment();
    }

    const getPayment = () => {
        Axios.get(`http://localhost:3001/payment/view/${localStorage.getItem('customer')}`).then((respons) => {
            setGetPayment(respons.data);
        })
    }

    const getHeader = () => {
        Axios.get('http://localhost:3001/settings/viewHeader').then((respons) => {
            setHeader(respons.data);
        })
    }
    const download = () => {

    }

    const routes = [
        {
            path: '/',
            breadcrumbName: 'Account',
            breadcrumbName: 'Home',
        },
        {
            path: '/',
            breadcrumbName: 'Account',
        },
        {
            path: 'Payments',
            breadcrumbName: 'Payments',
        },
    ];
    return (
        <>
            <Navbar onLoad={loadData} transparent />
            <main className="profile-page">
                {header.map((val, key) => {
                    const ImageURL = 'http://localhost:3001/settings/' + val.second_header_image;
                    return (<>
                        <section className="relative block h-500-px">
                            <div
                                className="absolute top-0 w-full h-full bg-center bg-cover"
                                style={{
                                    backgroundImage:
                                        `url("${ImageURL}")`,
                                }}
                            >
                                <span
                                    id="blackOverlay"
                                    className="w-full h-full absolute opacity-50 bg-black"
                                >Payments</span>
                            </div>
                        </section>
                        <section className="relative block h-400-px">
                            <PageHeader
                                onBack={() => window.history.back()}
                                className="site-page-header"
                                title="Payments"
                                breadcrumb={{ routes }}
                                style={{ backgroundColor: '#fff', marginTop: '1%', padding: '3%' }}
                            >
                            </PageHeader>
                        </section>
                    </>
                    )
                })}
                <section className="relative py-16 bg-blueGray-200">
                        <div className="container mx-auto px-4" style={{ marginTop: '20%' }}>
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                <div className="px-6">
                                <Table
                                    columns={columns}
                                    dataSource={payment}
                                    pagination={false}
                                    className="ant-border-space"
                                />
                                </div>
                            </div>
                        </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
