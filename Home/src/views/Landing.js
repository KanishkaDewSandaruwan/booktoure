import React from "react";

// components

import Navbar from "components/Navbars/IndexNavbar";
import Footer from "components/Footers/Footer.js";
import { useEffect, useState } from 'react';

import Axios from 'axios';
import { useHistory } from "react-router-dom";
import { message, Divider, Typography } from "antd";

export default function Landing() {
  const history = useHistory();
  const [category, setCategory] = useState([]);
  const [header, setHeader] = useState([]);
  const { Title } = Typography;

  const [messages, setMessage] = useState();
  const [fullname, setFullName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    loadData();
  })

  const loadData = () => {
    getHeader();
    getCategory();
  }

  const getHeader = () => {
    Axios.get('http://localhost:3001/settings/viewHeader').then((respons) => {
      setHeader(respons.data);
    })
  }

  const getCategory = () => {
    Axios.get('http://localhost:3001/category/view').then((respons) => {
      setCategory(respons.data);
    })
  }

  const sendMessage = (e) => {
    const data = {
      'email': email,
      'fullname': fullname,
      'message': messages,
    }

    Axios.post("http://localhost:3001/contact/create", data)
      .then((respons) => {
        message.success('Your Message sent Success!');
        window.location.href = '/';
      }).catch((err) => {
        console.log(err);
      })
  }

  return (
    <>
      <Navbar transparent />
      <main onLoad={loadData}>
        {header.map((val, key) => {
          const ImageURL = 'http://localhost:3001/settings/' + val.header_image;
          return (<>
            <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
              <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    `url("${ImageURL}")`,
                }}
              >
                <span
                  id="blackOverlay"
                  className="w-full h-full absolute opacity-75 bg-black"
                ></span>
              </div>
              <div className="container relative mx-auto">
                <div className="items-center flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                    <div className="pr-12">
                      <h1 className="text-white font-semibold text-5xl">
                        {val.title}
                      </h1>
                      <p className="mt-4 text-lg text-blueGray-200">
                        {val.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                style={{ transform: "translateZ(0)" }}
              >
                <svg
                  className="absolute bottom-0 overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="text-blueGray-200 fill-current"
                    points="2560 0 2560 100 0 100"
                  ></polygon>
                </svg>
              </div>
            </div>
          </>
          )
        })}



        <section style={{ marginTop: '10px' }} className="pb-10 bg-teal-900 ">
          {header.map((val, key) => {
            const ImageURL = 'http://localhost:3001/settings/' + val.header_image;
            return (<>
              <div className="p-5 container mx-auto px-4">
                <div className="flex flex-wrap items-center mt-32">
                  <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                    {/* <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-user-friends text-xl"></i>
                </div> */}
                    <h3 className="text-3xl mb-2 font-semibold leading-normal">
                      Our Service
                    </h3>
                    <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                     {val.service_description}
                    </p>
 
                  </div>

                  <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-bluegray-500">
                      <img
                        alt="..."
                        src={ImageURL}
                      />

                    </div>
                  </div>
                </div>
              </div>
            </>
            )
          })}
        </section>


        <section>
          <div className="flex flex-wrap items-center mt-32" style={{ marginLeft: '12%' }}>

            <h3 className="text-3xl mb-2 font-semibold leading-normal">
              Our Books Category
            </h3>

          </div>
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {category.map((val, i) => {
                const ImageURL = 'http://localhost:3001/upload/category/' + val.cat_image;
                return (

                  <div onClick={() => { history.push(`/category/${val.cat_id}`) }} style={{ cursor: 'pointer' }} className="lg:pt-8 pt-6 w-full md:w-4/12 px-4 text-center">
                    <div className="relative flex flex-col min-w-0 break-words bg- w-20 mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-white text-center inline-flex items-center justify-center  mb-5 shadow-md">
                          <img alt="Header" style={{ width: '300px', height: '220px' }} src={ImageURL} />
                        </div>
                        <h6 className="text-xl font-semibold">{val.cat_name}</h6>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>


          </div>
        </section>


        <section id="about" className="relative py-20 pb-10">
          {header.map((val, key) => {
            const AboutImageURL = 'http://localhost:3001/settings/' + val.about_image;
            return (<>
              <div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
                style={{ transform: "translateZ(0)" }}
              >
                <svg
                  className="absolute bottom-0 overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="text-white fill-current"
                    points="2560 0 2560 100 0 100"
                  ></polygon>
                </svg>
              </div>

              <div className="container mx-auto px-4">
                <div className="items-center flex flex-wrap">
                  <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                    <img
                      alt="..."
                      className="max-w-full rounded-lg shadow-lg"
                      src={AboutImageURL}
                    />
                  </div>
                  <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                    <div className="md:pr-12">

                      <h3 className="text-3xl font-semibold">About US</h3>
                      <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                        {val.about_description}
                      </p>

                    </div>
                  </div>
                </div>
              </div>
            </>
            )
          })}
        </section>



        <section id="contact" className="pb-20 py-20 relative block bg-blueGray-800">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <Divider >
                  <Title orientationMargin={50}>
                    <h1 style={{ color: 'White' }} class="text-6xl font-normal leading-normal mt-0 mb-2 text-white">
                      CONTACT US
                    </h1>
                  </Title>
                </Divider>
              </div>
            </div>
            <hr style={{ backgroundColor: 'white' }}></hr>

          </div>
        </section>
        <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">
                      If you Want to Contact us?
                    </h4>
                    <form>
                      <div className="relative w-full mb-3 mt-8">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="full-name"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Full Name"
                          onChange={(e) => { setFullName(e.target.value) }}

                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Email"
                          onChange={(e) => { setEmail(e.target.value) }}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="message"
                        >
                          Message
                        </label>
                        <textarea
                          rows="4"
                          cols="80"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Type a message..."
                          onChange={(e) => { setMessage(e.target.value) }}
                        />
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={(e) => { sendMessage(e) }}
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
