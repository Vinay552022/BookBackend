import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Book_Cover2 from '../components/Images/Book_Cover2.jpg';
import axios from 'axios';
import './Dashboard.css';
import { useUser } from '../App';
import { useNavigate } from 'react-router-dom';
import emptyCart from '../components/Images/emptyCart.avif';
export default function Cart() {
  const {userData,setUserData,cart,setCart} = useUser();
  console.log(cart);
  const [total, setTotal] = useState(0);
  const [updateIndices, setUpdateIndices] = useState([]);
  const navigate = useNavigate();
  const changeQuantity = (e, index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = parseInt(e.target.value, 10);
    setCart(updatedCart);
    if (!updateIndices.includes(index)) {
      setUpdateIndices([...updateIndices, index]);
    }
  };
  const handleBookClick = (card) => {
    console.log(card);
    navigate('/SelectedBook', { state: { bookData: card} }); 
};
  const handleUpdate = async (index) => {
    const item = cart[index];
    const userType = userData.userType;
    const email = userData.email;
    const bookId = item.bookId;
    const count = item.quantity;

    try {
      const response = await axios.put(`http://localhost:4000/add_to_cart/${bookId}`, {
        userType,
        email,
        count,
      });

      const updatedCart = [...cart];
      updatedCart[index].quantity = count;
      setCart(updatedCart);
      setTotal(calculateTotal(updatedCart));
      setUpdateIndices(updateIndices.filter(i => i !== index));

      // Update the userData in context
      const updatedUserData = { ...userData };
      updatedUserData.cart = updatedUserData.cart.map(item => {
        if (item.bookId === bookId) {
          return { ...item, quantity: count };
        }
        return item;
      });
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Error occurred while updating cart:", error);
    }
  };
  const placeOrder=()=>{
    navigate('/placeOrder', { state: { orderData: cart,t:total} }); 
  }
  const buyNow=(card)=>{
    const d=[card]
    console.log(d)
    navigate('/placeOrder', { state: { orderData: d,t:card.price} }); 
  }
  const removeObject = async (card, index) => {
    try {
      const userType = userData.userType;
      const email = userData.email;
      const response = await axios.delete(`http://localhost:4000/delete_cart/${email}/${userType}/${card.bookId}`);

      const updatedCart = [...cart];
      const item_price = cart[index].quantity * cart[index].price;
      updatedCart.splice(index, 1);
      setTotal(total - item_price);
      setCart(updatedCart);

      // Update the userData in context
      const updatedUserData = { ...userData };
      updatedUserData.cart = updatedUserData.cart.filter(item => item.bookId !== card.bookId);
      setUserData(updatedUserData);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 0)), 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
      //   const userType = userData.userType;
      //   const email = userData.email;
      //   const response = await axios.get(`http://localhost:4000/getCart/${email}/${userType}`);
        // console.log(response.data);
        const cart_temp = cart
        const totalCost = calculateTotal(cart_temp);
        // setCart(response.data.booksInCart);
        setTotal(totalCost);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // Fetch data when userData changes

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Container className='mt-4 flex-grow-1'>
        {(cart.length>0)?
          <div>

            <h1 className='text-center'>Cart</h1>
            {cart.map((card, index) => (
              <div key={index} className="card mb-3 mt-4 border-0 shadow" >
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={Book_Cover2} className="img-fluid object-fit-scale p-3" alt="..." />
                  </div>
                  <div className="col-md-8 mt-5">
                    <div className="card-body">
                      <h3 className="card-title">{card.bookTitle}</h3>
                      <div className='card-text fs-5'>{card.author}</div>
                      <div className='card-text'><b className="fs-4">{'\u20B9'}</b>{card.price}</div>
                      <div className='card-text'>{card.bookId}</div>
                      <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-md-2 form-label"><b>Quantity</b></label>
                        <div className="col-md-3">
                          <input type="number" min={1} className="form-control" value={card.quantity} onChange={(e) => changeQuantity(e, index)} />
                        </div>
                        {updateIndices.includes(index) && (
                          <div className="col-md-3">
                            <button className="btn btn-outline-info px-3" onClick={() => handleUpdate(index)}>Update</button>
                          </div>
                        )}
                      </div>
                      <div className="row mb-3">
                        <div className='col-4'>
                          <button className="btn btn-dark px-4 " onClick={() => removeObject(card, index)}>Remove</button>
                        </div>
                        <div className='col-4'>
                          <button className="btn btn-outline-secondary px-3" onClick={(e)=>buyNow(card)}>Buy now</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        :<div>
         <img src={emptyCart} className=" card-img-top rounded-start" alt="..." />
         <h4 className='mt-3 d-flex align-items-center justify-content-center '>Your cart is Empty</h4>
        </div>
        }
      </Container>

      <div className=' container mt-4 bg-light py-2'>
        <Container>
          <div className='row'>
            <div className='col-sm-5 col-md-3 text-center'><b>Total</b> ( {cart.length} items )</div>
            <div className='col-sm-3 col-md-3 text-center'><b  className=""><span className='fs-4'>{'\u20B9'}</span>{total}</b></div>
            <div className='col-sm-4 col-md-6 text-center'>
              <Button variant='dark' className='px-5' disabled={!(cart.length>0)} onClick={placeOrder}>Place order</Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
