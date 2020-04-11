import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

function NavBar({title}){
    return(
        <nav className= "navbar-nav navbar-expand-lg navbar-dark bg-dark mb-3 p-3">
        <a href ="/" className = "navbar-brand">{title}</a>
        <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
        <Link to="/" className="nav-link"> Home</Link>
        </li>
        <li className="nav-item active">
        <Link to="/adduser" className="nav-link"> Add User</Link>
        </li>
        <li className="nav-item active">
        <Link to="/githup" className="nav-link"> Project Files</Link>
        </li>
        </ul>
        </nav>
    )

}

NavBar.propTypes = {
 title: PropTypes.string.isRequired
}

NavBar.defaultProps = {
    title: "Default App"
}
export default NavBar;

/*<div>
            <h3>{title}</h3>
            <ul>
            <li><Link to = "/"> Anasayfa</Link></li>
            <li><Link to = "/adduser"> Add User</Link></li>
            <li><Link to = "/githup"> Project Files</Link></li>
            </ul>
        </div>*/