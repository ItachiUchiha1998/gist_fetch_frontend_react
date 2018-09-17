import React, { Component } from 'react';
import { Redirect } from 'react-router';
import logo from './logo.svg';
import Home from './components/Home.jsx';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './App.css';
import classNames from "classnames";
import { Form, Text } from 'informed';
import SweetAlert from "react-bootstrap-sweetalert";

class App extends Component {

   constructor(props){
    super(props);
    this.state = {
      data:[],
      uid:"",
      token: "",
      redirectHome: false,
      username: "",
      password: "",
      newusername: "",
      newpassword: "",
      lname: "",
      fname: "",
      newUser: false,
      error: false
    };
    this.checkPassword = this.checkPassword.bind(this);
    this.register = this.register.bind(this);
    this.Register = this.Register.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }  

  Register() {
    this.setState({newUser: true})
  }

  checkPassword() {
    (async () => {
  const rawResponse = await fetch('http://localhost:7000/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password: this.state.password,username: this.state.username})
  });
  const content = await rawResponse.json();

  if (content.success === true) {
    this.setState({redirectHome: true,token: content.token,uid: content._id})
  } else {
    this.setState({error: true})
  }

})();
  }

register() {
    (async () => {
  const rawResponse = await fetch('http://localhost:7000/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: this.state.newpassword,
      username: this.state.newusername,
      first_name: this.state.fname,
      last_name: this.state.lname
    })
  });
  const content = await rawResponse.json();

  if (content.success === true) {
    this.setState({redirectHome: true,token: content.token,uid: content._id})
  } else {
    this.setState({error: true})
  }

})();
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  hideAlert(){ 
    this.setState({error: false})
  }

  render() {
    const { data } = this.state;
    console.log(this.state);
    const {classes} = this.props;
    
    if (this.state.redirectHome) {
      return <Redirect to={{pathname: "/home", state: { uid: this.state.uid, token: this.state.token }}} />;
   }

  return (
      <div>

      {
        this.state.error? <SweetAlert title="Error!" onConfirm={this.hideAlert} />
 : <p></p> 
      }

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"></link>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous"></link>    

    <div className ="container" >

  <h1>LOGIN</h1>

  <form style={{margin : 'auto'}}>
    <div className="form-group">
      <label htmlFor="exampleInputUsername">Username</label>
      <input type="text" className="form-control" id="username" placeholder="Enter Username"
      onChange={(evt) => { this.setState({username: evt.target.value});}}
      ></input>
     </div>
    <div className="form-group">
      <label htmlFor="exampleInputPassword1">Password</label>
      <input type="password" className="form-control" id="pass" placeholder="Password"
      onChange={(evt) => { this.setState({password: evt.target.value});}}
      ></input>
    </div>
    <button type="submit" className="btn btn-primary"
       onClick={this.checkPassword}
    >Submit</button>
  </form>
</div>

  
  {
    this.state.newUser ? <p></p> : 

    <button className="btn btn-primary"
       onClick={this.Register}
       style={{left: '50%',position: 'relative'}}
    >New User?</button>

  }

  {
    !this.state.newUser ? <p></p> : 

<div className ="container" >
<h1>REGISTER</h1>
  <form style={{margin : 'auto'}}>

    <div className="form-group">
      <label htmlFor="exampleInputUsername">USERNAME</label>
      <input type="text" className="form-control" id="username" placeholder="Enter Username"
      onChange={(evt) => { this.setState({newusername: evt.target.value});}}
      ></input>
     </div>

     <div className="form-group">
      <label htmlFor="exampleInputFname">FIRST NAME</label>
      <input type="text" className="form-control" id="fname" placeholder="Enter First Name"
      onChange={(evt) => { this.setState({fname: evt.target.value});}}
      ></input>
     </div>

    <div className="form-group">
      <label htmlFor="exampleInputLname">LAST NAME</label>
      <input type="text" className="form-control" id="lname" placeholder="Enter Last Name"
      onChange={(evt) => { this.setState({lname: evt.target.value});}}
      ></input>
     </div>
    <div className="form-group">
      <label htmlFor="exampleInputPassword1">Password</label>
      <input type="password" className="form-control" id="pass" placeholder="Password"
      onChange={(evt) => { this.setState({newpassword: evt.target.value});}}
      ></input>
    </div>
    <button type="submit" className="btn btn-primary"
       onClick={this.register}
    >Submit</button>
  </form>
</div> 
  }

  
  </div>
    );
  }
}

export default App;
