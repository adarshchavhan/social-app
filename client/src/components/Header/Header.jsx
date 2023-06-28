import React from 'react'
import './Header.scss'
import { Link, useLocation } from 'react-router-dom'
import {Avatar, Create, CreateOutlined, Explore, ExploreOutlined, Home, HomeOutlined, Instagram, Search, SearchOutlined, Messenger as MessangerIcon, MessengerOutlined} from 'react-ig-icons'
import Messanger from '../../pages/Messanger/Messanger'

const Header = () => {
    const path = useLocation().pathname;

  return (
    <div className="header" style={{position : path === '/messages'? 'static':'sticky'}}>
        <div className="wrapper">
            <Link to='/' className='logo'>
                <Instagram w='120px'/>
            </Link>

            <div className="nav">
                <Link to='/' className='btn'>
                    {path==='/' ? <Home w='22px'/> : <HomeOutlined w='22px'/> }
                </Link>  
                <Link to='/explore' className='btn'>
                    {path==='/explore' ? <Explore w='22px'/> : <ExploreOutlined w='22px'/> }
                </Link>  
                <Link to='/search' className='btn'>
                    {path==='/search' ? <Search w='22px'/> : <SearchOutlined w='22px'/> }
                </Link>  
                <Link to='/new' className='btn'>
                    {path==='/new' ? <Create w='22px'/> : <CreateOutlined w='22px'/> }
                </Link>      
                <Link to='/messages' className='btn'>
                    {path==='/messages' ? <MessangerIcon w='22px'/> : <MessengerOutlined w='22px'/> }
                </Link>        
                <Link to='/account' className='btn'>
                    <Avatar/>
                </Link>  
            </div>
        </div>
    </div>
  )
}

export default Header