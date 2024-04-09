import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Footer() {
  return (
    <footer className="footer m-2">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/Privacypolicy">Privacy Policy</Link></li>
              <li><Link to="/TermsofService">Terms of Service</Link></li>
              {/* <li><Link to="/ReturnPolicy">Return Policy</Link></li> */}
              <li><Link to="/RefundPolicy">Return and Refund Policy</Link></li>
              <li><Link to="/ShippingPolicy">Shipping Policy</Link></li>

            </ul>
          </div>
          
            <div className="col-md-4">
            <p>Email: vinay552022@gmail.com</p>
            <p>#H.No: 1-7-376, Revenue Colony, Subedari, Hanamkonda, Telangana - 506001</p>
            <p>Ph:6305565672</p>
          </div>
          {/* <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled d-flex social-icons">
              <li><a href="#"><i className="fa-brands h3 fa-instagram me-2"></i></a></li>
              <li><a href="#"><i className="fa-brands h3 fa-facebook"></i></a></li>
            </ul>
          </div> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
