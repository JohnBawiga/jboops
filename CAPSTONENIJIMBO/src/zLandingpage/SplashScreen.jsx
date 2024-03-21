import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../zComponents/images/logo.png'
import './splashScreen.css';

const AdminStudent = () => {    
      return (
        <div className='AdminStudent__section'>
              <div className='AdminStudent__container'>
                <div>
                  <img className='AdminStudent__logo' src={Logo} alt="CIT-U NSTP Logo" />
                </div>

                <div className='AdminStudent__btn'>
                  <Link to="/Student/Login">Login as Student</Link>
                  <Link to="/Admin/Login">Login as Admin</Link>
                </div>
          </div>
        </div>
        
      );
    };

export default AdminStudent