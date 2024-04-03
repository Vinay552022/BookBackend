import React from 'react';

const Summary = () => {
  return (
    <div className="container-fluid p-0">
      {/* Image covering the entire page */}
      <img
        src="https://img.freepik.com/free-vector/flat-design-autumnal-background-with-book-glasses_52683-43404.jpg?w=996&t=st=1709834174~exp=1709834774~hmac=34947c54348749ae933af135b4ec8bd44c4e933f7e4f9f4f205aaa3a1bd1dd4ehttps://img.freepik.com/free-photo/books-assortment-with-dark-background_23-2148898297.jpg?size=626&ext=jpg&ga=GA1.1.1851987392.1709834015&semt=ais"
        alt="Book Cover"
        className="img-fluid w-100 vh-100 position-absolute top-0 start-0"
        style={{ opacity: 0.3 }}
      />
      <div className="container text-dark h-100 d-flex flex-column justify-content-center align-items-center">
        <div id="summary" className="content-section text-center">
          <h1 className="display-4 mb-4">Book Summary</h1>
          <p className="lead">
            Explore the essence of this captivating journey as we delve into the heart of the narrative, unveiling key
            moments and themes that define the soul of the book. Let's embark on a brief exploration.
          </p>

          <h2 className="m-5">Key Insights</h2>
          <ul className="list-group list-group-flush mt-2 rounded">
            <li className="list-group-item d-flex justify-content-center align-items-center rounded-pill">1. Unveiling the Central Mystery</li>
            <li className="list-group-item d-flex justify-content-center align-items-center rounded-pill">2. Character Dynamics and Transformations</li>
            <li className="list-group-item d-flex justify-content-center align-items-center rounded-pill">3. Symbolism and Imagery Exploration</li>
            {/* Add more list items as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Summary;
