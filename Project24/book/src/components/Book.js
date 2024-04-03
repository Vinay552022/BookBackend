import React from 'react';
import { Link } from 'react-router-dom';
import '../Book.css'; // Assuming this is the file where you define your styles

const Book = () => {
  return (
    <div className="container-fluid p-0 ">
      {/* Image covering the entire page */}
      <img
        src="https://img.freepik.com/free-vector/flat-design-autumnal-background-with-book-glasses_52683-43404.jpg?w=996&t=st=1709834174~exp=1709834774~hmac=34947c54348749ae933af135b4ec8bd44c4e933f7e4f9f4f205aaa3a1bd1dd4ehttps://img.freepik.com/free-photo/books-assortment-with-dark-background_23-2148898297.jpg?size=626&ext=jpg&ga=GA1.1.1851987392.1709834015&semt=ais"
        alt="Book Cover"
        className="img-fluid w-100 vh-100 position-absolute top-0 start-0"
        style={{ opacity: 0.3 }}
      />

      <div className="container-fluid makeappear">
        {/* Content - Title and description */}
        <div className="row mt-5">
          <div className="col">
            <div className="content-left text-center" style={{ maxWidth: '80%', margin: '0 auto', paddingTop: '70px' }}>
              <h1 className="display-4">Book</h1>
              <p className="lead">
                Java is a versatile and widely-used programming language known for its platform independence, strong
                object-oriented features, and extensive standard library. Developed by Sun Microsystems (now owned by
                Oracle Corporation) in the mid-1990s, Java has become a cornerstone in the software development industry.
                Here are some key aspects:
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="row mt-3">
          <div className="col-md-6 offset-md-3 text-center">
            <Link to="/Summary" className="text-decoration-none">
              <button className="btn btn-light ms-4 integrated-btn">Summary</button>
            </Link>
            <Link to="/Content" className="text-decoration-none">
              <button className="btn btn-light ms-4 integrated-btn">Content</button>
            </Link>
            <Link to="/Author" className="text-decoration-none">
              <button className="btn btn-light ms-4 integrated-btn">Author</button>
            </Link>
            {/* Add more buttons as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
