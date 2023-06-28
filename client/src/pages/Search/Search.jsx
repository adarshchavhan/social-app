import React, { useState } from 'react'
import './Search.scss'
import { Avatar, Loader, SearchOutlined } from 'react-ig-icons'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers } from '../../redux/actions/userActions'
import { Link } from 'react-router-dom'
import User from './User'

const Search = () => {
    const [text, setText] = useState('');

    const {mloading, error, message, users} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(allUsers({q:text}));
    }

  return (
    <div className="search__page">
        <div className="wrapper">
            <div className="search__bar">
                <input type="text" placeholder='Search Users...' value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key==='Enter' && handleSearch()} />
                <button onClick={handleSearch}>
                    <SearchOutlined w='16px' h='16px'/>
                </button>
            </div>

            <div className="users">
                {users?.length <= 0 ? <p className="error__msg">No users found.</p>
                : <>
                    {users?.map(user => <User key={user._id} user={user}/>)}
                </>}
            </div> 
        </div>
    </div>
  )
}

export default Search