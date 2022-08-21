import { Link } from "react-router-dom";

import "./footer.css";
const Footer = () => {
    return ( 
        <footer className="py-3 pt-3 footer mt-5">
    <ul className="nav justify-content-center pb-3 mb-3">
      <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Home</Link></li>
      <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Features</Link></li>
      <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Pricing</Link></li>
      <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">FAQs</Link></li>
      <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">About</Link></li>
    </ul>
    <p className="text-center text-muted">© 2022 iOrphan, Inc</p>
  </footer>
     );
}
 
export default Footer;