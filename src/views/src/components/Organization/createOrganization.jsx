import { Component } from "react";
import countryDropdown from "./../../utils/countryDropdown";
import axios from 'axios';
import redirectHOC from "../../utils/redierectHOC";

import {createOrgan} from "./../../services/allServices"

class CreateOrganization extends Component {

    state = {
        userInput: {
            name: "",
            longitude: "",
            latitude: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            description: "",
            logo: "",
            email: "",
            phoneNumber_1: "",
            phoneNumber_2: "",
            website: "",
            bankAccountNo: ""
        },
    };


    handleChange = (event) => {
        let userInput = {...this.state.userInput};
        userInput[event.target.name] = event.target.value;
        this.setState({userInput: userInput});
    };

    handleSubmit = async (event) => {
        event.preventDefault();

         // http post request
        /**
         * @axios snippet:
         * 
         * // send a POST request
         *      method: 'post',
         *      url: '/login',
         *      data: {
         *          firstName: 'Finn',
         *          lastName: 'Williams'
         *      }
         *      headers: {
         *          header1: content1,
         *          header2: content2
         *      }
         *  
         *    axios.post(url, data, { headers: headers})
         */
         const { email, name, website, bankAccountNo, addressLine1, 
            addressLine2, city, state, zipCode, country, phoneNumber_1, phoneNumber_2, logo, description, latitude, longitude } = this.state.userInput;
        
        const data = {
            name: name,
            location: {latitude: latitude, longitude: longitude},
            address: {
                addressLine1: addressLine1,
                addressLine2: addressLine2, 
                city: city, 
                state: state, 
                zipCode: zipCode, 
                country: country,
           },
            description: description,
            logo: logo,
            contacts: {
                email: email,
                phoneNumber_1: phoneNumber_1,
                phoneNumber_2: phoneNumber_2,
                website: website,
            },
            bankAccountNo: bankAccountNo,
        };

        /**
         * 
         * TODO: HANDLE IMAGE FILEUPLOAD and UPDATE THE LOGO ENTRY IN BODY
         * 
         */

        const url = 'http://localhost:3000/api/organizations/';

        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': `${this.props.getUserAuthToken()}`
        };

        try{
            await createOrgan(url, headers, data);
            
            this.props.navigate('/organizations/');

        }
        catch(err){
            console.log(err);
        }

    };


    render(){
        let { email, name, website, bankAccountNo, addressLine1, 
            addressLine2, city, state, zipCode, country, phoneNumber_1, phoneNumber_2, logo, description, latitude, longitude } = this.state.userInput;
        return ( 
            <div className="container">
                <hr />
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <fieldset>
                        <legend>Basic Information</legend>
                        
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" name="name" value={name} onChange={(event)=> this.handleChange(event)} placeholder="Organization name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" name="description" rows="3" placeholder='Enter a description...' value={description} onChange={(event)=> this.handleChange(event)}></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="bankAccountNo">Bank Account Number</label>
                            <input type="text" className="form-control" name="bankAccountNo" value={bankAccountNo} onChange={(event)=> this.handleChange(event)} placeholder="e.g. 1054871654287"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="logo" className="form-label">Upload logo</label>
                            <input className="form-control" type="file" name="logo" id="logo" value={logo} onChange={(event)=> this.handleChange(event)}/>
                        </div>

                    </fieldset>
                    <hr />

                    <fieldset>
                        <legend>Address</legend>
                        <div className="form-group">
                            <label htmlFor="addressLine1">Address Line 1*</label>
                            <input type="text" className="form-control" name="addressLine1" value={addressLine1} onChange={(event)=> this.handleChange(event)} placeholder="Address line 1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="addressLine2">Address Line 2</label>
                            <input type="text" className="form-control" name="addressLine2" value={addressLine2} onChange={(event)=> this.handleChange(event)} placeholder="Address line 2"/>
                        </div>
                        <small>*Use comma ( , ) to seperate each segment</small><br />

                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input type="text" className="form-control" name="city" value={city} onChange={(event)=> this.handleChange(event)} placeholder="City"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <input type="text" className="form-control" name="state" value={state} onChange={(event)=> this.handleChange(event)} placeholder="State"/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="zipCode">Zip Code</label>
                            <input type="number" className="form-control" name="zipCode" value={zipCode} onChange={(event)=> this.handleChange(event)} placeholder="Zip Code"/>
                        </div>

                        <div className="form-group">
                        <label htmlFor="country">Country</label>      
        
                            <select name="country" value={country} onChange={(event)=> this.handleChange(event)} className="form-control">
                                {countryDropdown()}
                            </select>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="latitude">Latitude</label>
                                    <input type="number" className="form-control" name="latitude" value={latitude} onChange={(event)=> this.handleChange(event)} placeholder="Latitude"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="longitude">Longitude</label>
                                    <input type="number" className="form-control" name="longitude" value={longitude} onChange={(event)=> this.handleChange(event)} placeholder="Longitude"/>
                                </div>
                            </div>
                        </div>

                    </fieldset>


                    <hr />
                    <fieldset>
                        <legend>Contact</legend>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={(event)=> this.handleChange(event)} placeholder="Enter email"/>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="phoneNumber_1">Phone Number 1</label>
                                    <input type="text" className="form-control" name="phoneNumber_1" value={phoneNumber_1} onChange={(event)=> this.handleChange(event)} placeholder="e.g. +0322 215 2454"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="phoneNumber_2">Phone Number 2</label>
                                    <input type="text" className="form-control" name="phoneNumber_2" value={phoneNumber_2} onChange={(event)=> this.handleChange(event)} placeholder="Optional"/>
                                </div>
                            </div>
                        </div>
                        

                        <div className="form-group">
                            <label htmlFor="website">Website:</label>
                            <input type="text" className="form-control" name="website" value={website} onChange={(event)=> this.handleChange(event)}></input>
                        </div>

                    </fieldset>
                    

                    

                    <hr />


                    <center>
                        <button type="submit" className="btn btn-primary">Create Organization</button>
                    </center>
                </form>
            </div>
        );
    }
}
 
export default redirectHOC(CreateOrganization);