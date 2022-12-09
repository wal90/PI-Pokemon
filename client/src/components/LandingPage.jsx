import React from "react";
import { Link } from "react-router-dom"
import s from '../styles/landingPage.module.css'
import logo from '../image/logo.png'



class LandingPage extends React.Component {
  
    render() {
      return (
        <div className={s.container}>
          <div className={s.contain}>
            
          <div className={s.text}> 
              <p>Welcome to</p>
              <img src={logo} alt="pokelogo" width='20%' />
              <br></br>
              <Link to='/home'>
             <button>Let's go!</button>
            </Link>
          </div>
           
          </div>
           
        </div>
      )
    }
  }
  
  export default LandingPage;


  