import { Component } from "react";
import getCleanUserStore from "../../utils/getCleanUserStore";

class Logout extends Component{
    componentDidMount(){
        
        if(!this.props.getLoginStatus || !this.props.getUserAuthToken){
            window.location = "/"
        }
    
        const newUserStore = getCleanUserStore();
        this.props.updateUserStore(newUserStore);
        this.props.updateLoginStatus(false);
        this.props.updateUserAuthToken("");
    
        localStorage.removeItem("token");
        window.location = "/"
    }

    
    render(){
        return null;
    }
}
 
export default Logout;