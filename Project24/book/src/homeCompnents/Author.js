import React from 'react';

const Author = () => {
  return (
    <div className="container-fluid p-0 ">
      {/* Image covering the entire page */}
      <img
        src="https://img.freepik.com/free-vector/flat-design-autumnal-background-with-book-glasses_52683-43404.jpg?w=996&t=st=1709834174~exp=1709834774~hmac=34947c54348749ae933af135b4ec8bd44c4e933f7e4f9f4f205aaa3a1bd1dd4ehttps://img.freepik.com/free-photo/books-assortment-with-dark-background_23-2148898297.jpg?size=626&ext=jpg&ga=GA1.1.1851987392.1709834015&semt=ais"
        alt="Book Cover"
        className="img-fluid w-100 vh-100 position-absolute top-0 start-0"
        style={{ opacity: 0.3 }}
      />
      <div className="container-fluid text-dark h-100 d-flex flex-column justify-content-center align-items-center position-relative">
        <div id="author" className="content-section text-center">
          <div className="p-3 mt-5  text-center">
            <div className="row">
              <h2 className="display-4 p-2">Author</h2>
              <div className="col-md-4">
                <img
                  src="https://media.gettyimages.com/id/1235861009/photo/cheltenham-england-tim-marshall-writer-of-the-best-selling-prisoners-of-geography-at-the.jpg?s=612x612&w=0&k=20&c=K17tbynaorQUvZTd8OedQSQaFwdoxjib57YXFYNe9SI="
                  className="rounded img-fluid w-75"
                  alt="Author"
                />
              </div>

              <div className="col-md-8 col-sm-12 text-md-start text-lg-start text-sm-center p-3 ">
                <p>
                  <b>Name:</b> John Doe
                </p>
                <p>
                  <b>DOB:</b> January 15, 1980
                </p>
                <p>
                  <b>Alma mater:</b> University of XYZ
                </p>
                <p>
                  <b>Awards:</b> Nobel Prize in Literature
                </p>
                <p>
                  <b>Description:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  <b>Notable Works:</b> "The Great Novel," "Epic Journey," "Poems of the Heart"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
