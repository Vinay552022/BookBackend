import React from 'react';
function ReturnPolicy() {
  return (
    <div className="return-policy  container shadow-lg rounded mt-4 p-3">
        <div className='d-flex justify-content-center align-items-center'>
            <h1>Return Policy</h1>
        </div>
      
      <p>We have a 14-day return policy, which means you have 30 days after receiving your item to request a return.</p>
      <p>To start a return, you can contact us at <a href="mailto:shiva.methuku@gmail.com">shiva.methuku@gmail.com</a>.</p>
      <p>If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.</p>
      <p>In extreme cases of damaged product delivery (leakage / broken / missing items) due to transit, a refund / exchange can be initiated after a thorough verification of the refund policy.</p>
      <p>Cancellation of orders can be processed before their dispatch from the warehouses only. A gateway charge of 2.5% shall be levied against your order for cancellation. A refund for paid orders shall be credited to the original payment account within 15 days of cancellation acceptance.</p>
      <p>Orders cannot be cancelled once shipped from the warehouses and an amount of 75 will be deducted once the order is shipped and if it is returned back to the seller (prepaid orders).</p>

    </div>
  );
}

export default ReturnPolicy;