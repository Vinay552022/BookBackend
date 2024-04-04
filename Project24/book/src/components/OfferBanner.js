import React from 'react';
import { Link } from 'react-router-dom';

const OfferBanner = () => {
  return (
    <div className="offer-banner bg-light pt-2 bg-d m-0">
      <div className="container text-center">
        <p className="offer-text mb-0">
          <strong>Exclusive Offer:</strong> Get <strong>10%</strong> off on your first purchase! Use code: <strong>OFFER10</strong>
          <Link className="btn btn-dark btn-sm ms-3" to="/form">
            Claim Now
          </Link>
        </p>
      </div>
    </div>
  );
};
export default OfferBanner;
