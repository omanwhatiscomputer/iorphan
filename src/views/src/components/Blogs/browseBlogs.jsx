import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import {getAllBlogs, getAllImages} from "./../../services/allServices";


class BrowseBlogs extends Component {


    state = {
        allPosts: [],
    }

    componentDidMount(){
        this.getAllPosts();
    }

    getData = async (url, id, filename, headers) => {
        console.log("Making request to fileId ", id);

        const downloadUrl = url + id + "/"+ filename;
        
        // TODO
        const res = await axios.get(downloadUrl, { headers });
        console.log(downloadUrl);
        return res.data;
    };

    getAllPosts = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': `${this.props.getUserAuthToken()}`
        };
        const url = 'http://localhost:3000/api/blogPosts/all';
    
    
            const res = await getAllBlogs(url, headers);
            this.setState({allPosts: res.data});
            const files = res.data;
            const url_fileDownload = "http://localhost:3000/api/imgUploads/";
            getAllImages(files, url_fileDownload, headers);
    }
    render(){
        // console.log(this.state.allPosts);
        return ( 
            <div>
                

                {this.state.allPosts.map( post =>

                        <div className="card" style={{width: "100%"}} key={post._id}>
                            <img className="card-img-top" src={require(`./../../../../../cache/${post.photo.filename}`)} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.subHeading}</p>
                                <Link to={`/blogs/${post._id}`} className="btn btn-primary">View</Link>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}
 
export default BrowseBlogs;