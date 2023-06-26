import React from 'react'
import logo from "../Logonetflix.png"
import {Link} from 'react-router-dom'
import {BiSearch} from "react-icons/bi"

const Header = () => {
  return (
    <nav className='header'>
        <img src={logo} alt="" />

        <div>
          <Link to="/tvshows">TV Shows</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/recently">Recently Added</Link>
          <Link to="/mylist">My List</Link>

        </div>

        <BiSearch />
    </nav>
  )
}

export default Header