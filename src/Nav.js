import React from 'react'
import {Link} from 'react-router-dom'

const Nav = ({search , setSearch}) => {
  return (
    <nav className='Nav'>
        <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
            {/* <label htmlFor='search'>Search Post</label> */}
            <input
                type='text'
                placeholder='Search Posts.....'
                id='search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
        <ul>
        <li><Link style={{textDecoration: 'none'}} to="/">Home</Link> </li>
        <li><Link style={{textDecoration: 'none'}} to="/about">About</Link> </li>
        <li><Link style={{textDecoration: 'none'}} to="/post">Newpost</Link> </li> 
        </ul>

    </nav>
  )
}

export default Nav