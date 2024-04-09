import React from 'react';

function ShippingAndDelivery() {
  return (
    <div className="return-policy  container shadow-lg rounded mt-4 p-3">
    <div className='d-flex justify-content-center align-items-center'>
        <h1>Shipping Policy</h1>
    </div>
      <p>
      At Haelan Homeopathy, we're committed to making your shopping experience convenient and affordable.

Free Delivery: Enjoy complimentary delivery on orders of 20 books or more within India.

Standard Delivery Charge: For orders below 20 books, a nominal delivery charge of ₹79 per order is applicable within India.

Please note that delivery serviceability is subject to verification based on Pin Code. Ensure to check the serviceability of your area before placing an order.

For any queries or assistance, feel free to reach out to our customer support team.      </p>
      {/* <p>
        In certain cases or locations, additional shipping charges may apply. These charges will be clearly indicated at the time of order placement and when entering the Pin Code before finalizing your payment.
      </p> */}
      <p>
  The delivery time for orders is typically a minimum of 3 business days (excluding Sundays & Public Holidays) from the day your order is booked and payment is completed on haelanhomeopathy.com. Please note that there may be delays in delivery due to stock unavailability or technical issues. The day your order is booked and payment is made is considered as day 0. The maximum time for delivery of any product will depend on the place of delivery.
</p>

      <h3>SHIPMENT CANCELLATION</h3>
      <p>
        Once your order is booked and online payment is completed, we at haelanhomeopathy.com will make every effort to deliver your product within the stipulated delivery time to your specified address.
      </p>
    </div>
  );
}

export default ShippingAndDelivery;
