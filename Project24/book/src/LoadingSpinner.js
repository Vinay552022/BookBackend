import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border"  style={{width: "3rem", height: "3rem",}}role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow" style={{width: "3rem", height: "3rem",}} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}

export default LoadingSpinner
