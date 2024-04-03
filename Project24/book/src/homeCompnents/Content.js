import React from 'react';

const Content = () => {
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
        <h1 className="display-4 m-4">Java Content</h1>
        <div id="introduction" className="content-section text-center">
          <h2 className='m-3'>Introduction</h2>
          <p>
            Java is a versatile and widely-used programming language known for its platform independence, strong
            object-oriented features, and an extensive standard library. The Java Tutorials have been written for JDK 8.
            Examples and practices described in this page don't take advantage of improvements introduced in later releases
            and might use technology no longer available.
            See Java Language Changes for a summary of updated language features in Java SE 9 and subsequent releases.
            See JDK Release Notes for information about new features, enhancements, and removed or deprecated options for all JDK releases.
          </p>

          <h2 className="m-4">Concepts Covered</h2>
          <ul className="list-group list-group-flush mt-2 rounded">
            <li className="list-group-item d-flex justify-content-center align-items-center rounded-pill">1. Platform Independence</li>
            <li className="list-group-item d-flex justify-content-center align-items-center rounded-pill">2. Object-Oriented Paradigm</li>
            <li className="list-group-item d-flex justify-content-center align-items-center rounded-pill">3. Multi-threading Support</li>
            {/* Add more list items as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Content;
