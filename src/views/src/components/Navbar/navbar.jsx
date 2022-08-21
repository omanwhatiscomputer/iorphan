import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom"
import useWindowDimensions from '../../utils/getViewportDims';
import NavItems from './navbarItems';
import SidebarItems from './sidebarItems';

import "./navbar.css";
import "./sidebar.css";

const Navbar = (props) => {

    // dynamic sidebar width
    const { width } = useWindowDimensions();


    const location = useLocation();
    let { toggleMobileNavMenu, toggleDropdownNavMenu, handleResponsiveNavbar, handleDropdownMenuClick } = props;
    useEffect(() => {
        if(toggleMobileNavMenu) handleResponsiveNavbar();
        if (toggleDropdownNavMenu) handleDropdownMenuClick();
    }, [location]);

    

    
    const navMenuToggler = (resposiveNavbarWidth, boolean) => {
        if (boolean ) {
            return {
            height: "100%",
            width: `${resposiveNavbarWidth}%`,
            background: 'linear-gradient(270deg, rgba(33,37,41,1) 62%, rgba(51,61,70,1) 100%)',
            display: "flex",
            zIndex: "5",
            position:'fixed',
            right: `${100 - resposiveNavbarWidth}%`,
            transition: "0.5s",
            paddingTop: "15px",
            boxShadow: "-7px 0px 5px 0px rgba(0,0,0,0.75)",
        };
        }else{
            return {
            height: "100%",
            width: `${resposiveNavbarWidth}%`,
            background: 'linear-gradient(270deg, rgba(33,37,41,1) 62%, rgba(51,61,70,1) 100%)',
            display: "flex",
            zIndex: "5",
            position:'fixed',
            right: `${100}%`,
            transition: "0.5s",
            visibility: "hidden",
            paddingTop: "15px",
            boxShadow: "-7px 0px 5px 0px rgba(0,0,0,0.75)",};
        }
    };

    const breakpoint = 768; //MD
    let viewportWidth = width;

    let responsiveNavbarWidth = 0;
    if (viewportWidth < 576){
        responsiveNavbarWidth = 40;
    }else if (viewportWidth < 768){
        responsiveNavbarWidth = 30;
    }else{
        responsiveNavbarWidth = 20;
    }

    return (

        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                
                <button className='HamburgerMenu'  type="button" 
                    onClick={() => handleResponsiveNavbar()}
                    style={toggleMobileNavMenu ? 
                    {
                        transform: "rotate(450deg)",
                        transition: "0.5s",
                        color: "red",
                    } : {transition: "0.5s",}}>
                    
                    <i className={toggleMobileNavMenu ? "fa-solid fa-arrow-down" :"fas fa-bars" }></i>
                </button>

                <Link className="navbar-brand" to="/">iorphan</Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    
                    
                    <NavItems 
                    getLoginStatus={props.getLoginStatus}
                    navbarItems={props.navbarItems}
                    toggleDropdownNavMenu={toggleDropdownNavMenu}
                    handleDropdownMenuClick={handleDropdownMenuClick}
                    />

                </div>
            </nav>

            <div className='hamburgerMenu'
                    style={navMenuToggler(responsiveNavbarWidth, toggleMobileNavMenu)}>
                    <div className='sidebar-parent' style={{position:'fixed',}}>
                        <SidebarItems 
                            getLoginStatus={props.getLoginStatus}
                            navbarItems={props.navbarItems}
                            sidebarItems={props.sidebarItems}
                            breakpoint={breakpoint}
                            viewportWidth={viewportWidth}
                            getUserStore={props.getUserStore}
                        />
                    </div>
            </div>
        </div>

    );
}

export default Navbar;

