import React from 'react';
import './Aboutus.css';

const Aboutus = () => {
  return (
    <div>
      <section className="section_all bg-light" id="about">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section_title_all text-center">
                            <h3 className="font-weight-bold">About Us</h3>
                            {/* <p className="section_subtitle mx-auto text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br/>Lorem Ipsum has been the industry's standard dummy text.</p> */}
                            <div className="">
                                <i className=""></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row vertical_content_manage mt-5">
                    <div className="col-lg-6">
                        <div className="about_header_main mt-3">
                            {/* <div className="about_icon_box">
                                <p className="text_custom font-weight-bold">Lorem Ipsum is simply dummy text</p>
                            </div> */}
                            <h4 className="about_heading text-capitalize font-weight-bold mt-4"></h4>
                            <p className="text-muted mt-3">Our mission is to be a strategic partner for businesses seeking innovative and reliable technology solutions. We strive to understand the unique challenges our clients face and leverage our expertise to deliver tailored, future-proof solutions that drive growth and efficiency..</p>

                            <p className="text-muted mt-3"> Our mission is to be a strategic partner for businesses seeking innovative and reliable technology solutions. We strive to understand the unique challenges our clients face and leverage our expertise to deliver tailored, future-proof solutions that drive growth and efficiency..</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="img_about mt-3">
                            <img src="https://i.ibb.co/qpz1hvM/About-us.jpg" alt="" className="img-fluid mx-auto d-block"/>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-lg-4">
                        <div className="about_content_box_all mt-3">
                            <div className="about_detail text-center">
                                <div className="about_icon">
                                    <i className="fas fa-pencil-alt"></i>
                                </div>
                                <h5 className="text-dark text-capitalize mt-3 font-weight-bold">Creative Design</h5>
                                <p className="edu_desc mt-3 mb-0 text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="about_content_box_all mt-3">
                            <div className="about_detail text-center">
                                <div className="about_icon">
                                    <i className="fab fa-angellist"></i>
                                </div>
                                <h5 className="text-dark text-capitalize mt-3 font-weight-bold">We make Best Result</h5>
                                <p className="edu_desc mb-0 mt-3 text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="about_content_box_all mt-3">
                            <div className="about_detail text-center">
                                <div className="about_icon">
                                    <i className="fas fa-paper-plane"></i>
                                </div>
                                <h5 className="text-dark text-capitalize mt-3 font-weight-bold">best platform </h5>
                                <p className="edu_desc mb-0 mt-3 text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </div>
  )
}

export default Aboutus