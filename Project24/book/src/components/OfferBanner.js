import React from 'react';
import { Link } from 'react-router-dom';

const OfferBanner = () => {
  return (
    <div className="offer-banner bg-light pt-2 bg-d">
      <div className="container text-center">
        <p className="offer-text">
          <strong>Exclusive Offer:</strong> Get <strong>10%</strong> off on your first purchase! Use code: <strong>OFFER10</strong>
          <Link className="btn btn-dark btn-sm ms-3 mb-1" to="/form">
            Claim Now
          </Link>
        </p>
      </div>
    </div>
  );
};
export default OfferBanner;
