import React, { useEffect } from "react";
import { message, Button, Row, Statistic } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faClose, faCreditCard, faDownload } from '@fortawesome/free-solid-svg-icons'

import Navbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useState } from "react";
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import { PageHeader } from 'antd';

export default function Cart() {

    const history = useHistory();
    const [category, setCategory] = useState();
    const [header, setHeader] = useState([]);
    const [getBook, setGetBook] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    var total = 0;
    const [customerEmail, getCustomeremail] = useState();

    useEffect(() => {

        getCustomeremail(localStorage.getItem('customer'));
        loadData();
    }, [])

    const countTotale = () => {

        Axios.get('http://localhost:3001/cart/total').then((respons) => {
            setTotalPrice(respons.data[0]);
            console.log(respons.data)
        })

    }

    const remove = (cart_id) => {
        Axios.delete(`http://localhost:3001/cart/delete/${cart_id}`).then((res) => {
            message.success('Cart Item Removed!');
            loadData();
        })

    }

    const loadData = () => {
        if (!localStorage.getItem('customer')) {
            history.push('/auth/login');
        }
        getHeader();
        loadBook();
        countTotale();
    }

    const loadBook = () => {
        Axios.get(`http://localhost:3001/cart/view/${customerEmail}`).then((respons) => {
            setGetBook(respons.data);
        })
    }

    const getHeader = () => {
        Axios.get('http://localhost:3001/settings/viewHeader').then((respons) => {
            setHeader(respons.data);
        })
    }

    const routes = [
        {
            path: '/',
            breadcrumbName: 'Home',
        },
        {
            path: 'cart',
            breadcrumbName: 'Cart',
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
                                >Cart</span>
                            </div>
                        </section>
                        <section className="relative block h-500-px">
                            <PageHeader
                                onBack={() => window.history.back()}
                                className="site-page-header"
                                title="Cart"
                                breadcrumb={{ routes }}
                                style={{ backgroundColor: '#fff', marginTop: '1%', padding: '3%' }}
                                extra={[
                                    <Button key="3" onClick={() => history.push('/downloads')} size="large"> <FontAwesomeIcon icon={faDownload} size='lg' style={{ paddingRight: '10px' }} /> Downloads</Button>,
                                    <Button key="3" onClick={() => history.push('/')} size="large"> <FontAwesomeIcon icon={faCartShopping} size='lg' style={{ paddingRight: '10px' }} /> Continue Shopping</Button>,
                                    <Button key="1" type="primary" size="large">
                                        <FontAwesomeIcon icon={faCreditCard} size='lg' style={{ paddingRight: '10px' }} /> Checkout
                                    </Button>,
                                ]}
                            >
                                <Row>
                                    <Statistic title="Number of Items" value={totalPrice.count} />
                                    <Statistic

                                        title="Balance"
                                        prefix="Rs"
                                        value={totalPrice.total}
                                        style={{
                                            margin: '0 32px',
                                        }}
                                    />
                                    {/* <Statistic title="Balance" prefix="$" value={total} /> */}
                                </Row>
                            </PageHeader>
                        </section>
                    </>
                    )
                })}
                <section className="relative py-1" style={{ backgroundColor: '#fff', marginTop: '-100px' }}>
                </section>
                <section className="relative py-1" style={{ backgroundColor: '#fff' }}>
                    {getBook.map((value, key) => {

                        return (
                            <div className="container mx-auto px-4" style={{ marginTop: '20%' }}>
                                <div style={{ backgroundColor: '#f0f0f0' }} className="relative flex flex-col min-w py-2-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                    <div className="px-6">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                                <div className="relative">
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                                <div className="py-6 px-3 mt-32 sm:mt-0">
                                                    <button
                                                        className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                        type="primary"
                                                        onClick={() => { remove(value.cart_id) }}
                                                    >
                                                        <FontAwesomeIcon icon={faClose} size='2x' />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap justify-left mb-5">
                                            <div className="w-full lg:w-3/12 px-4 lg:order-1">
                                                <div className="mb-2 text-blueGray-600">
                                                    <img src={'http://localhost:3001/upload/' + value.image} />
                                                </div>
                                            </div>
                                            <div className="w-500 lg:w-5/12 px-4 lg:order-1">
                                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                                    {value.title}
                                                </h3>
                                                <div style={{ color: 'red', fontSize: '20px' }} className=" text-sm leading-normal mt-0 mb-2 text-red-400 font-bold uppercase">
                                                    Rs.  {value.price}
                                                </div>
                                                <div className="mb-2 text-blueGray-600 mt-10">
                                                    <i className="fas fa-user mr-2 text-lg text-blueGray-400"></i>
                                                    {value.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </section>
            </main>
            <Footer />
        </>
    );
}
