import { NavLink, useParams } from "react-router-dom";

const ViewBlog = (props) => {
    let params = useParams();


    
    return ( 
        <div>


            <h1>HELLO WORLD:: {params.id}</h1>

            <NavLink to="/blogs">Back</NavLink>

        </div>
     );
}
 
export default ViewBlog;