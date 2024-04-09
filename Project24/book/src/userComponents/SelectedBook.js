import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Book_Cover1 from '../components/Images/Book_Cover1.jpg';
import Book_Cover2 from '../components/Images/Book_Cover2.jpg';
import Book_Cover3 from '../components/Images/Book_Cover3.jpg';
import { useUser } from '../App';

const SelectedBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, setUserData, cart, setCart } = useUser();
  const bookData = location.state.bookData;
  const [count, setCount] = useState(0);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [cartIndex, setCartIndex] = useState(-1);
  function scrollToSection() {
    const section = document.getElementById('sectionId'); // Replace 'sectionId' with the ID of the section you want to scroll to
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  useEffect(() => {
    if (location.state && location.state.bookData) {
      const k = userData.cart.findIndex(item => item.bookId === bookData.bookId);
      console.log(k);
      setCartIndex(k);
      if (k !== -1) {
        setCount(userData.cart[k].quantity);
      } else {
        setCount(1);
      }
    }
  }, []);

  const add_to_cart = async (e) => {
    const userType = userData.userType;
    const email = userData.email;
    const bookId = bookData.bookId;

    try {
      const response = await axios.put(`https://bookbackend-4.onrender.com/add_to_cart/${bookId}`, {
        userType,
        email,
        count,
      });
      const updatedUserData = { ...userData };
      var c = [...cart];
      if (cartIndex === -1) {
        updatedUserData.cart.push({
          bookId: bookData.bookId,
          quantity: count
        })
        bookData.quantity = count;
        c.push(bookData);
        console.log(c);
        const p = cart.length;
        setCartIndex(p);
        setCart(c);
      }
      else {
        updatedUserData.cart[cartIndex].quantity = count;
        const f = [...cart];
        cart[cartIndex].quantity = count;
        setCart(f);
      }

      setUserData(updatedUserData);
      console.log(response);
      toast.success(e.target.value, {
        autoClose: 1500,
        pauseOnFocusLoss: false,
      });
    } catch (error) {
      console.log("Error occurred while adding to cart");
      console.error(error);
    }
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const buyNow = async () => {
    add_to_cart();
    bookData.quantity = count;
    const d = [bookData]
    console.log(d)

    navigate('/placeOrder', { state: { orderData: d, t: count * bookData.price } });
  }

  const incrementCount = () => {
    setCount((prevCount) => Math.min(prevCount + 1, 100)); // Limit to 100 for example
  };

  const decrementCount = () => {
    if (count > 1) setCount((prevCount) => Math.max(prevCount - 1, 0)); // Prevent negative values
  };

  const handleImageHover = (image) => {
    setHoveredImage(image);
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-md-5">
          <img
            src={hoveredImage ? hoveredImage : Book_Cover2}
            className="rounded-start img-fluid img-thumbnail"
            alt="Book Cover"
          />
          <div className="d-flex justify-content-center">
            <div className=" me-3">
              <img
                src={Book_Cover1}
                className={`img-thumbnail float-end rounded-start ${hoveredImage === Book_Cover1 ? ' border-primary' : ''}`}
                alt="Book Cover 1" style={{ "maxHeight": "70px" }}
                onMouseEnter={() => handleImageHover(Book_Cover1)}
              />
            </div>
            <div className="me-3">
              <img
                src={Book_Cover2}
                className={`img-thumbnail justify-content-center rounded-start ${hoveredImage === Book_Cover2 ? 'border border-primary' : ''}`}
                alt="Book Cover 2" style={{ "maxHeight": "70px" }}
                onMouseEnter={() => handleImageHover(Book_Cover2)}
              />
            </div>
            <div className=" ">
              <img
                src={Book_Cover3}
                className={`img-thumbnail float-start rounded-start ${hoveredImage === Book_Cover3 ? 'border border-primary' : ''}`}
                alt="Book Cover 3" style={{ "maxHeight": "70px" }}
                onMouseEnter={() => handleImageHover(Book_Cover3)}
              />
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <h2 className="mb-3">{bookData.bookTitle} </h2>
          <div className="row mb-2">
            <div className="me-3 fs-5"> by {bookData.author}</div>
          </div>
          <div className="row mb-2">
            <div className="me-3 col-2 card-text fs-5"><del>800₹</del> {bookData.price}₹</div>
          </div>
          <div className="d-flex align-items-center mb-3">
            <div className="me-2 fs-5">Quantity:</div>
            <button className="btn border-dark me-2" onClick={decrementCount}>-</button>
            <span className="display mx-2">{count}</span>
            <button className="btn btn-dark" onClick={incrementCount}>+</button>
          </div>
          <div className="row  mb-3">
            <div className='col-6 '>
              {cartIndex === -1 && (
                <button className="btn btn-dark px-5 " value="Item added to cart successfully" onClick={add_to_cart}>Add to Cart</button>
              )}
              {cartIndex != -1 && userData.cart[cartIndex].quantity === count && (
                <button className="btn btn-dark px-5 " onClick={goToCart}>Go to Cart</button>
              )}
              {cartIndex != -1 && userData.cart[cartIndex].quantity !== count && (
                <button className="btn btn-dark px-5 " value="Cart updated successfully" onClick={add_to_cart}>Update Cart</button>
              )}
            </div>
            <div className='col-6'>
              <button className="btn border-dark px-5 " onClick={buyNow}>Buy now</button>
            </div>
          </div>
          <div>
            <hr />
            <div className="truncate-multiline" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {bookData.description}
            </div>
            <button className="btn text-decoration-underline text-primary" onClick={scrollToSection}>Read More</button>
            <hr />
            <div id="carouselExample" className="carousel slide border border-2" style={{ "height": "80px" }}>
              <div className="carousel-inner p-3">
                <div className="carousel-item active p-1">
                  <div className="row">
                    <div className="col text-center">
                      <h5>ISBN 13   <i class="fa-solid fa-book"></i></h5>
                      <div className="item">{bookData.bookId}</div>
                    </div>
                    <div className="col text-center">
                      <h5>Pages  <i class="fa-regular fa-file"></i>

                      </h5>
                      <div className="item">{bookData.numPages}</div>
                    </div>
                    <div className="col text-center">
                      <h5>Weight   <i class="fa-solid fa-weight-scale"></i></h5>
                      <div className="item">{bookData.weight}</div>
                    </div>

                  </div>
                </div>
                <div className="carousel-item p-1">
                  <div className="row">
                    <div className="col text-center">
                      <h5 className=''>Dimensions <i class="fa-brands fa-unity"></i></h5>
                      <div className="item">{bookData.dimensions}</div>
                    </div>
                    <div className="col text-center">
                      <h5>Publication Date   <i class="fa-regular fa-calendar"></i></h5>

                      <div className="item">{bookData.publicationDate}</div>
                    </div>

                    <div className="col text-center">
                      <div className="item">See more</div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon bg-dark" aria-hidden="true" ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div id='sectionId'>
        <h3>About book</h3>
        {bookData.description}
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default SelectedBook;