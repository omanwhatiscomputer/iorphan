import { NavLink, Outlet } from "react-router-dom";

const Blogs = (props) => {
    const topbarItems = [
        {name: "Browse", path: "/blogs"},
        {name: "Create a new post", path: "/blogs/create"},
    ];
    return ( 
        <div className="container col-md-7 col-lg-6">
                {props.getLoginStatus() && 
                <ul className="nav nav-tabs">
                    {topbarItems.map(item=> 
                    <li className="nav-item" key={item.name}>
                        <NavLink className="nav-link" activeclassname="active"  to={item.path}>{item.name}</NavLink>
                    </li>
                    )}
                </ul>}
                <Outlet/>
        </div>
     );
}
 
export default Blogs;