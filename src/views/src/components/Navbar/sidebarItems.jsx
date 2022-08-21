import React from 'react'
import { Link } from 'react-router-dom';

const SidebarItems = (props) => {

    // personal - signed in with each user type
    // business - signed in with each user type
    // others - with each user type
    // navbar items - signed and right

    const forAdmin = (item) => {
        return item.user.includes("admin");
    };
    const forClient = (item) => {
        return item.user.includes("client");
    };
    const forConsultant = (item) => {
        return item.user.includes("consultant");
    };
    const forManager = (item) => {
        return item.user.includes("manager");
    };

    const getUserType = () => {
        if(props.getLoginStatus()){
            return props.getUserStore().__t;
        }
    };


    let filterAndMap = (logic, array) => {
        return array.filter(logic).map( item =>
            <li key={item.name}>
                <Link
                    to={item.path} 
                    >{item.name}</Link>
            </li>
        )
    };

    // personalSidebarItems
    let personalSidebarItems = props.sidebarItems.filter((item)=> item.type === "personal");

    // businessSidebarItems
    let businessSidebarItems = props.sidebarItems.filter((item)=> item.type === "business");

    //otherSidebarItems -> no conditions attached
    let otherSidebarItems = props.sidebarItems.filter((item)=> item.type === "other");

    //navItems -> breakpoint, width -> render align-right
    let publicNavItems = props.navbarItems.filter((item)=> item.access === "public" && item.align ==="right");

    let allAccessNavberItems = props.navbarItems.filter((item)=> item.access === "all" && item.align ==="left");

    const getPrivateNavItems = () => {
        return (
                    <>
                        <li>
                            <Link  to="/user" key="Profile">Profile</Link>
                        </li>
                        <li>
                            <Link  to="/logout" key="Logout">Logout</Link>
                        </li>
                    </>
        );
    };


    return ( 
        <ul className='sidebar'>

            {/* personal block */}
            { props.getLoginStatus() && getUserType()==="Client" && filterAndMap(forClient, personalSidebarItems)}
            { props.getLoginStatus() && getUserType()==="Consultant" && filterAndMap(forConsultant, personalSidebarItems)}
            { props.getLoginStatus() && getUserType()==="Manager" && filterAndMap(forManager, personalSidebarItems)}
            { props.getLoginStatus() && getUserType()==="Admin" && filterAndMap(forAdmin, personalSidebarItems)}

            {/* business block */}
            { props.getLoginStatus() && getUserType()==="Client" && filterAndMap(forClient, businessSidebarItems)}
            { props.getLoginStatus() && getUserType()==="Consultant" && filterAndMap(forConsultant, businessSidebarItems)}
            { props.getLoginStatus() && getUserType()==="Manager" && filterAndMap(forManager, businessSidebarItems)}
            { props.getLoginStatus() && getUserType()==="Admin" && filterAndMap(forAdmin, businessSidebarItems)}

            {/* others block */}
            {filterAndMap(()=> true, otherSidebarItems)}

            {/* nav bar item block */}
            {props.viewportWidth < props.breakpoint && !props.getLoginStatus() && filterAndMap(()=>true, allAccessNavberItems)}

            {props.viewportWidth < props.breakpoint && props.getLoginStatus() && getPrivateNavItems()}
            {props.viewportWidth < props.breakpoint && !props.getLoginStatus() && filterAndMap(()=> true, publicNavItems)}

        </ul> 
    );
}
 
export default SidebarItems;