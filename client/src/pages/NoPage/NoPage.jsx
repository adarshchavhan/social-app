import React from 'react'
import './NoPage.scss'
import { Link } from 'react-router-dom'

const NoPage = () => {
  return (
    <div className="no__page">
        <div className="wrapper">
            <h1>404</h1>
            <p>No page found.</p>
            <Link to='/'>Back to Home</Link>
        </div>
    </div>
  )
}

export default NoPage