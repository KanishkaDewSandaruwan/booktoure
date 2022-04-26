import React, { useEffect } from "react";

import Navbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useState } from "react";
import Axios from 'axios';
import { useHistory } from "react-router-dom";

export default function Category(props) {

    const history = useHistory();
    const [category, setCategory] = useState(props.match.params);
    const [header, setHeader] = useState([]);
    const [getBook, setGetBook] = useState([]);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        getHeader();
        loadBook();
    }

    const loadBook = () => {
        Axios.get(`http://localhost:3001/book/view/${category.cat_id}`).then((respons) => {
            setGetBook(respons.data);
        })
    }

    const getHeader = () => {
        Axios.get('http://localhost:3001/settings/viewHeader').then((respons) => {
            setHeader(respons.data);
        })
    }
    return (
        <>
            <Navbar onLoad={loadData} transparent />
            <main className="profile-page">
                {header.map((val, key) => {
                    const ImageURL = 'http://localhost:3001/settings/' + val.header_image;
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
                                ></span>
                            </div>
                        </section>
                    </>
                    )
                })}
                <section className="relative py-16 bg-blueGray-200">
                    {getBook.map((value, key) => (
                        <div className="container mx-auto px-4" style={{ marginTop: '20%' }}>
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
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
                                                    type="button"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                                <div className="mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                        22
                                                    </span>
                                                    <span className="text-sm text-blueGray-400">
                                                        Downloads
                                                    </span>
                                                </div>
                                                <div className="mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                        10
                                                    </span>
                                                    <span className="text-sm text-blueGray-400">
                                                        Author Publications
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                                {value.title}
                                            </h3>
                                            <div style={{color: 'red', fontSize: '20px'}} className=" text-sm leading-normal mt-0 mb-2 text-red-400 font-bold uppercase">
                                               Rs.  {value.price}
                                            </div>
                                            <div className="mb-2 text-blueGray-600 mt-10">
                                                <i className="fas fa-user mr-2 text-lg text-blueGray-400"></i>
                                                {value.name}
                                            </div>
                                            <div className="mb-2 text-blueGray-600">
                                                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                                {value.description}
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">

                                            <div className="mb-2 text-blueGray-600">
                                                <img src={'http://localhost:3001/upload/' + value.image} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                   {value.book_description}
                                                </p>
                                                {/* <a
                                                    href="#pablo"
                                                    className="font-normal text-lightBlue-500"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Show more
                                                </a> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            <Footer />
        </>
    );
}