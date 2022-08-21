import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import "./navbar.css";



const NavItems = (props) => {

    const privateAccess = function (item){
        return item.access==="private";
    };

    const publicAccess = function (item){
        return item.access==="public";
    };

    const allAccess = function (item){
        return item.access==="all";
    };

    const colorActive = "red";
    const colorInactive = "#A6B1AC";

    let filterAndMap = (logic, array) => {
        return array.filter(logic).map( item =>
            <li className={"nav-item "+ item.align} key={item.name}>
                <NavLink className="nav-link" 
                    to={item.path} 
                    style={({ isActive }) => {
                                return {
                                    color: isActive ? colorActive : colorInactive,
                                };
                                    }}>{item.name}</NavLink>
            </li>
        )
    };

    // rendering logic
    if (props.getLoginStatus()){
        return ( 
            <>
                <ul className="navbar-nav me-auto">
                    {filterAndMap(allAccess, props.navbarItems)}
                </ul>
                <ul className="navbar-nav ms-auto">
                    {/* {filterAndMap(privateAccess, props.navbarItems)} */}

                    <li className="nav-item dropdown">
                        <span className="nav-link dropdown-toggle" onClick={()=> props.handleDropdownMenuClick()}>
                        My Account
                        </span>
                        
                        <div className="dropdown-menu"
                                style={props.toggleDropdownNavMenu ? 
                                {visibility: "visible", opacity: "1", transition: "0.15s ease-in",} :
                                {visibility: "hidden", opacity: "0", transition: "0.05s",}}>
                                    
                            <Link className="dropdown-item" to="/user">Profile</Link>
                            <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/logout">Logout</Link>
                        </div>
                    </li>

                </ul>
            </>
        );
    }else{
        return ( 
            <>
                <ul className="navbar-nav me-auto">
                    {filterAndMap(allAccess, props.navbarItems)}
                </ul>
                <ul className="navbar-nav ms-auto">
                    {filterAndMap(publicAccess, props.navbarItems)}
                </ul>
            </>
        );
    }
}
 
export default NavItems;