import React from 'react';
import "../../css/homepage.css";

const ContactUs = () => {
    return (
        <div className="container p-3 pb-3 m-3 text-center">
            <div className="row">
                <div className="col-md-7">
                    <h4>Get in touch</h4>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contact" className="form-label">Contact Number</label>
                        <input type="text" className="form-control" id="contact" placeholder="Enter your number" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea className="form-control" id="message" rows="3"></textarea>
                    </div>
                    <button className="btn btn-primary rounded-pill main-btn">Submit</button>
                    <br />
                </div>
                <div className="col-md-5">
                    <h4>Contact us</h4>
                    <hr />
                    <div className="mt-4">
                        <div className="d-flex">
                            <i className="bi bi-geo-alt-fill"></i>
                            <p>Address: 78 Makrab Ebied, Madint Nasr</p>
                        </div>
                        <hr />
                        <div className="d-flex">
                            <i className="bi bi-telephone-fill"></i>
                            <p>Contact: 022486554</p>
                        </div>
                        <hr />
                        <div className="d-flex">
                            <i className="bi bi-envelope-fill"></i>
                            <p>Email: drmohamed@gmail.com</p>
                        </div>
                        <hr />
                        <div className="d-flex">
                            <i className="bi bi-browser-chrome"></i>
                            <p>Website: www.drmohameddpharmacy.com</p>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
