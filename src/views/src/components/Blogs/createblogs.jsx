import React, { Component } from 'react';
import axios from 'axios';
import redirectHOC from '../../utils/redierectHOC';
import getUserAttributes from '../../utils/getUserAttributes';
import {createBlog, updateList} from './../../services/allServices';

class CreateBlogs extends Component{

    state = {
        userInput: {
            title: "",
            subHeading: "",
            body: "",
            author: "",
            photo: null
        },
    };

    handleChange = (event) => {
        let userInput = {...this.state.userInput};
        userInput[event.target.name] = event.target.value;
        this.setState({userInput: userInput});
    };

    handleFileInputChange = (event) => {
        const file = event.target.files[0];
        this.setState({photo: file},() => console.log(this.state.photo));
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        /** TODO: validate errors and if no errors continue */      

        const url_fileUpload = 'http://localhost:3000/api/imgUploads';

        const headers_fileUpload = {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': this.props.getUserAuthToken()
        };

        const form_data = new FormData();
        form_data.append("file", this.state.photo);

        
        const fileInfo = await axios.post(url_fileUpload, form_data, {headers: headers_fileUpload})
            .then(res => res.data.fileInfo)
            .catch((err)=> console.log(err));
        
        
        // return console.log(fileInfo);



        let data = {
            author: this.props.getUserStore()._id,
            title: this.state.userInput.title,
            subHeading: this.state.userInput.subHeading,
            body: this.state.userInput.body,
            photo: fileInfo.id
        };

        const url = 'http://localhost:3000/api/blogPosts/';

        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': this.props.getUserAuthToken()
        };

        let res = await createBlog(url, data, headers);

        if (this.props.getUserStore().blogPosts){
            data = {_id: data.author, blogPosts: [...(this.props.getUserStore().blogPosts), res.data._id]};
        }else{
            data = {_id: data.author, blogPosts: [ res.data._id]};
        }

        res = await updateList(data, headers);

        const attributes = getUserAttributes(this.props.getUserStore().__t);
        const newUserStore = JSON.parse(JSON.stringify({ ...this.props.getUserStore() }));
        attributes.forEach((attribute)=> newUserStore[attribute] = res.data[attribute]);
        this.props.updateUserStore(newUserStore);
        setTimeout(() => {
            this.props.navigate("/blogs");
        }, 2000);
        
    };

    render(){
        return ( 
            <div className="container">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <fieldset>
                        <legend>Create a new post</legend>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" name="title" value={this.state.userInput.title} onChange={(event)=> this.handleChange(event)} placeholder="Title"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subHeading">Sub-heading</label>
                            <input type="text" className="form-control" name="subHeading" value={this.state.userInput.subHeading} onChange={(event)=> this.handleChange(event)} placeholder="Sub-heading"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Body text</label>
                            <textarea className="form-control" name="body" rows="3" placeholder='Type your text here...' value={this.state.userInput.body} onChange={(event)=> this.handleChange(event)}></textarea>
                        </div>

                        {/* <div className="mb-3">
                            <label htmlFor="photo" className="form-label">Upload photo</label>
                            <input className="form-control" type="file" name="photo" id="photo" value={this.state.userInput.photo} onChange={(event)=> this.handleChange(event)}/>
                        </div> */}

                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">Upload photo</label>
                            <input className="form-control" type="file" name="photo" id="photo" onChange={(event => this.handleFileInputChange(event))}/>
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </fieldset>
                </form>
            </div> 
        );
    }
}
 
export default redirectHOC(CreateBlogs);