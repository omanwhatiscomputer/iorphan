import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar/navbar";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import Footer from "./components/Footer/footer";
import Redirect from "./components/Redirect/redirect";
import Organization from './components/Organization/organization';
import CreateOrganization from './components/Organization/createOrganization';
import OrganizationPage from './components/Organization/organizationPage';
import UpdateOrganization from './components/Organization/updateOrganization';
import Logout from "./components/Logout/logout";

import getNavbarItems from "./utils/navbarItems";
import getSidebarItems from "./utils/sidebarItems";
import getUserAttributes from "./utils/getUserAttributes";
import getCleanUserStore from "./utils/getCleanUserStore";

import "./App.css";
import CreateBlogs from "./components/Blogs/createblogs";
import BrowseBlogs from "./components/Blogs/browseBlogs";
import AllOrganizations from "./components/Organization/AllOrganizations";
import Blogs from "./components/Blogs/blogs";
import ViewBlog from "./components/Blogs/viewBlog";


class App extends Component {
  
  state = {
    toggleMobileNavMenu: false,
    toggleDropdownNavMenu: false,
    navbarItems: getNavbarItems(),
    sidebarItems: getSidebarItems(),
    isSignedIn: false,
    userAuthToken: "",
    userStore: {
      __t: "",
      _id: "",
      dateCreated: "",
      profilePhoto: "",
      sex: "",
      nationality: "",
      dateOfBirth: "",
      address: "",
      currency: "",
      bankAccountNo: "",
      mobileNo: "",
      name: "",
      email: "",
      prefix: "",
      blogposts: [],

      // client props
      eligibility: "",
      transactions: [],
      creditCardNumber: "",
      clientId: "",
      isVolunteer: "",
      hasVolunteered: "",
      totalDonated: "",
      volunteeringAt: "",
      blacklisted: "",
      hasAdoptedBefore: "",
      pastOrphans: [],
      inProcessOfAdoption: "",
      currentProceedings: [],

      // consultant and manager props
      organization: "",
      isAssigned: "",

      // consultant
      proceedings: [],

      // admin props
      adminId: "",
    },
  };
  handleResponsiveNavbar = () => {
    let newValue = !this.state.toggleMobileNavMenu;
    this.setState({ toggleMobileNavMenu: newValue });
  };

  handleDropdownMenuClick = () => {
    // console.log("clicked", this.state.toggleDropdownNavMenu)
    let newValue = !this.state.toggleDropdownNavMenu;
    this.setState({ toggleDropdownNavMenu: newValue });
  };

  // Getters and Setters

  updateUserStore = (newUserStore) => {
    this.setState({userStore: newUserStore});
  };

  updateUserAuthToken = (token) => {
    this.setState({userAuthToken: token});
  };
  updateLoginStatus = (boolean) => {
    this.setState({isSignedIn: boolean});
  };

  getUserStore = () => {
    return this.state.userStore;
  };

  getLoginStatus = () => {
    return this.state.isSignedIn;
  };

  getUserAuthToken = () => {
    return this.state.userAuthToken || localStorage.getItem('token');
  };
// Renderer
  render(){

    // in case of a hard refresh
    if(localStorage.getItem('token') && !this.state.isSignedIn){
      const url = 'http://localhost:3000/api/users/me'
      const headers = {
        'x-auth-token': localStorage.getItem('token')
      };
      axios.get(url, {headers: headers})
      .then(res=>{
        this.updateLoginStatus(true);
        this.updateUserAuthToken(localStorage.getItem('token'));
        const attributes = getUserAttributes(res.data["__t"]);

        const newUserStore = JSON.parse(JSON.stringify({ ...this.getUserStore() }));
        attributes.forEach((attribute)=> newUserStore[attribute] = res.data[attribute]);
        this.updateUserStore(newUserStore);
      })
      .catch(err=>{
        console.log(err);
        const newUserStore = getCleanUserStore();
        this.updateUserStore(newUserStore);
        this.updateLoginStatus(false);
        this.updateUserAuthToken("");
        localStorage.removeItem('token');
      });
    }
    
    return (
      <div>
        {/* Navbar */}
        <Navbar 
          toggleMobileNavMenu={this.state.toggleMobileNavMenu}
          toggleDropdownNavMenu={this.state.toggleDropdownNavMenu}
          handleDropdownMenuClick={this.handleDropdownMenuClick}
          handleResponsiveNavbar={this.handleResponsiveNavbar}
          navbarItems={this.state.navbarItems}
          sidebarItems={this.state.sidebarItems}
          getLoginStatus={this.getLoginStatus}
          getUserStore={this.getUserStore}
          />
        {/* Routes */}
        <main className="main">
          <Routes>
            <Route path="/" element={<h1>Home</h1>}/>

            <Route path="/organizations" element={<Organization getUserAuthToken={this.getUserAuthToken} />}>
              <Route index element={<AllOrganizations  getUserAuthToken={this.getUserAuthToken}/>}/>
              <Route path=":id" element={<OrganizationPage getUserAuthToken={this.getUserAuthToken}/>}/>
              <Route path="create" element={<CreateOrganization getUserAuthToken={this.getUserAuthToken}/>}/>
            </Route>
            <Route path="/myOrganization/update" element={<UpdateOrganization />}/>
            

            <Route path="/blogs" element={<Blogs 
              getUserAuthToken={this.getUserAuthToken}
              getLoginStatus={this.getLoginStatus} />}>
              
              <Route index element={<BrowseBlogs 
                  getUserAuthToken={this.getUserAuthToken}/>}/>

              <Route path=":id" element={<ViewBlog />}/>
              <Route path="create" element={<CreateBlogs
                getUserStore={this.getUserStore}
                getUserAuthToken={this.getUserAuthToken}
                updateUserStore={this.updateUserStore}
              />}/>

            </Route>
            <Route path="/blogs/update/:id" element={<h1>Stories</h1>}/>

            <Route path="/about" element={<h1>About</h1>}/>
            <Route path="/contact" element={<h1>Contact Us</h1>}/>
            <Route path="/login" element={<Login 
              updateLoginStatus={this.updateLoginStatus}
              updateUserAuthToken={this.updateUserAuthToken}
            />}/>
            <Route path="/login/redirect/:type" element={<Redirect 
              getUserStore={this.getUserStore}
              getUserAuthToken={this.getUserAuthToken}
              getLoginStatus={this.getLoginStatus}
              updateUserStore={this.updateUserStore}
              updateLoginStatus={this.updateLoginStatus}
              updateUserAuthToken={this.updateUserAuthToken}
            />}/>


            <Route path="/register" element={<Register 
              
              // base props
              getUserStore={this.getUserStore}
              updateUserStore={this.updateUserStore}
              updateUserAuthToken={this.updateUserAuthToken}
              updateLoginStatus={this.updateLoginStatus}
              
              />}/>
            <Route path="/user" element={<h1>My Account</h1>}/>
            <Route path="/user/update" element={<h1>My Account</h1>}/>
            <Route path="/user/dashboard" element={<h1>Dashboard</h1>}/>
            <Route path="/user/myblogs" element={<h1>Dashboard</h1>}/>

            <Route path="/client" element={<h1>My Account</h1>}/>
            <Route path="/client/:id" element={<h1>My Account</h1>}/>
            <Route path="/client/create" element={<h1>My Account</h1>}/>
            <Route path="/client/update/:id" element={<h1>My Account</h1>}/>

            <Route path="/logout" element={<Logout 
              updateUserStore={this.updateUserStore}
              updateLoginStatus={this.updateLoginStatus}
              updateUserAuthToken={this.updateUserAuthToken}
              getUserAuthToken={this.getUserAuthToken}
              getLoginStatus={this.getLoginStatus}
              />}/>
            
            <Route path="/volunteer" element={<h1>Volunteer</h1>}/>
            <Route path="/volunteer/create" element={<h1>Volunteer</h1>}/>
            <Route path="/volunteer/update/:id" element={<h1>Volunteer</h1>}/>

            <Route path="/orphan" element={<h1>Agencies</h1>}/>
            <Route path="/orphan/create" element={<h1>Agencies</h1>}/>
            <Route path="/orphan/update/:id" element={<h1>Agencies</h1>}/>

            <Route path="/proceedings" element={<h1>Agencies</h1>}/>
            <Route path="/proceedings/create" element={<h1>Agencies</h1>}/>
            <Route path="/proceedings/update/:id" element={<h1>Agencies</h1>}/>

            <Route path="/managers" element={<h1>Agencies</h1>}/>
            <Route path="/managers/:id" element={<h1>Agencies</h1>}/>
            <Route path="/managers/create" element={<h1>Agencies</h1>}/>
            <Route path="/managers/update/:id" element={<h1>Agencies</h1>}/>

            <Route path="/consultants" element={<h1>Agencies</h1>}/>
            <Route path="/consultants/create" element={<h1>Agencies</h1>}/>
            <Route path="/consultants/update/:id" element={<h1>Agencies</h1>}/>

            <Route path="/transactions" element={<h1>Agencies</h1>}/>
            <Route path="/transactions/create" element={<h1>Agencies</h1>}/>

            <Route path="/toc" element={<h1>Terms and Conditions of Use</h1>}/>
            <Route path="/fatalError" element={<center className="mt-5"> <h5>FATAL ERROR: Please report to customer care at +565 454 6545 545 (free of charge)</h5></center>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
