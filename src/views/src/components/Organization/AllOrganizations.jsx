import axios from 'axios';
import React, { Component } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {getAllOrgans, handleOrganDelete} from './../../services/allServices';

class AllOrganizations extends Component {
    constructor(props){
        super(props);
        this.topbarItems = [
            {name: "All Organizations", path: "/agencies/"},
            {name: "Create Organization", path: "/agencies/create"},
        ];
    }
    state = {
        allOrganizations: [],
        userInput: {
            toggler: "idle"
        }
    };

    handleChange = (event) => {
        let userInput = {...this.state.userInput};
        userInput[event.target.name] = event.target.value;
        this.setState({userInput: userInput});
    };

    getAllOrgs(){
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': `${this.props.getUserAuthToken()}`
        };
        const url = 'http://localhost:3000/api/organizations/all';


        try{

            const res = getAllOrgans(url, headers);
            this.setState({allOrganizations: res.data});
        }catch(err){
            console.log(err);
        }

    }



    componentDidMount(){
        this.getAllOrgs();
    }

    handleDelete = async (_id) => {
        console.log(_id);
        const url = 'http://localhost:3000/api/organizations';
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': `${this.props.getUserAuthToken()}`
        };
        const data = {
            _id : _id
        };

        try{
            await handleOrganDelete(url, headers, data);
            this.getAllOrgs();

        }
        catch(err){
            console.log(err)
        }


    }

    renderTableHeader = () =>{
        if(this.state.userInput.toggler ==="idle"){
            return (
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Country</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
        );
        }else{
            /** number, name, country, manager, button dismiss, button delete */
            return (
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Country</th>
                        <th scope="col">Manager</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
            );
        }
    }

    render() { 
        return (
                <>
                    <div className='mt-3 mb-2'>
                        <div className='toggler'>
                            <label className='toggler-label' htmlFor="toggler">Filter:</label>
                            <select className='toggler-menu' name="toggler" id="toggler" onChange={(event)=> this.handleChange(event)} value={this.state.userInput.toggler}>
                                <option value="idle">Idle</option>
                                <option value="assigned">Assigned</option>
                            </select>
                        </div>
                    </div>

                    <div className='table-container'>

                        <table className="table">
                            {this.renderTableHeader()}
                            
                            <tbody>
                                {this.state.allOrganizations && (this.state.userInput.toggler==="idle") && this.state.allOrganizations.filter((object)=> !object.hasManager).map((value, i)=> 
                                    <tr key={value._id}>
                                        <th scope="row">{i+1}</th>
                                        <td><NavLink to={`/organizations/update/${value._id}`}>{value.name}</NavLink></td>
                                        <td>{value.address.country}</td>
                                        <td><button className='btn btn-warning'>Designate</button></td>
                                        <td><button className='btn btn-danger' onClick={()=> {this.handleDelete(value._id)}}>Delete</button></td>
                                    </tr>
                                )}
                                {this.state.allOrganizations && (this.state.userInput.toggler==="assigned") && this.state.allOrganizations.filter((object)=> object.hasManager).map((value, i)=> 
                                    <tr key={value._id}>
                                        <th scope="row">{i+1}</th>
                                        <td><NavLink to={`/organizations/:id/${value._id}`}>{value.name}</NavLink></td>
                                        <td>{value.address.country}</td>
                                        <td><button className='btn btn-warning'>Designate</button></td>
                                        <td><button className='btn btn-danger' onClick={()=> {this.handleDelete(value._id)}}>Delete</button></td>
                                    </tr>
                                )}
                                
                            </tbody>
                        </table>
                    </div>
                </>
            
        );
    }
}
 
export default AllOrganizations;