import axios from 'axios';
import React, { Component } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './organization.css';

class Organization extends Component {
    constructor(props){
        super(props);
        this.topbarItems = [
            {name: "All Organizations", path: "/organizations/"},
            {name: "Create Organization", path: "/organizations/create"},
        ];
    }
    
    state = {  };
    
    

    render() { 
        return (
            <div className='container'>
                <ul className="nav nav-tabs">
                    {this.topbarItems.map(item=> 
                    <li className="nav-item" key={item.name}>
                        <NavLink className="nav-link" activeclassname="active"  to={item.path}>{item.name}</NavLink>
                    </li>
                    )}
                </ul>
                <Outlet />


                
            </div>
        );
    }
}
 
export default Organization;