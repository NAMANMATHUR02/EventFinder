import React from "react";
import {Link} from 'react-router-dom';
import ContactForm from '../ContactForm/ContactForm';

let NavBar = ()=>{
    return (
        <React.Fragment>
        <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
            <div className="container">
                <Link to={'/'} className="navbar-brand">
                    <i className="fa fa-mobile text-warning"/> Events <span className="text-warning">Manager</span></Link>
                <Link to={'/ContactForm'} className="navbar-brand">InvitationForm</Link>
            </div>
        </nav>
        </React.Fragment>
    )
};
export default NavBar;  