import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Route, NavLink, HashRouter } from "react-router-dom";
import { Button } from 'react-bootstrap';
import '../App.css';
import classNames from "classnames";
import Flexbox from 'flexbox-react';
import StickyFooter from 'react-sticky-footer';

class App extends Component {

   constructor(props){
    super(props);
    this.state = {
      data:[{
      	gist: "",
      	owner: "",
		desc: "",
		filename: "",
		language: ""
      }],
      star: [{

      }],
      uid:this.props.location.state.uid,
      token: this.props.location.state.token,
      print: true,
      redirectHome: false
    };
    this.Home = this.Home.bind(this);
  }

  Home() {
    this.setState({redirectHome: true})
  }

  componentWillMount(){
    this.CallReadApi();
  }

   CallReadApi = () => {
    const BASE_URL = 'http://localhost:7000/mybucket';
    fetch(BASE_URL,{
    	headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
    	body: JSON.stringify({
      		uid: this.state.uid,
          _id: this.state.uid,
          token: this.state.token 
     }),
      method : 'POST'
    }).then( response => {return response.json();}).then( json => { 
    	console.log(json)
      this.setState({data: json.stars })

    });
  
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    const { data } = this.state;
    console.log(this.state);
    const {classes} = this.props;

    if (this.state.redirectHome) {
      return <Redirect to={{pathname: "/home", state: { uid: this.state.uid, token: this.state.token }}} />;
   }

  return (

     <div className="container">

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"></link>

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous"></link>    

       <Flexbox flexDirection="column" minHeight="100vh">
          <Flexbox element="header" height="60px">
            
            <h1 style={{float:'left',margin:'auto'}}>Bucket List </h1>

            <Button bsStyle="info" type='button' style={{position:'relative',padding:10,margin:'auto'}}
            onClick={this.Home}>
            <i className="fa fa-home"></i>Back to Home
      </Button>

          </Flexbox>
         
          {data.map(a => 

       <Flexbox flexGrow={1} alignSelf="center" margin="1em" width="100%"
                padding='1em' 
                style={{borderBottom: '6px solid red',
                        backgroundColor: 'lightgrey',
                        borderRadius: '20px'
                      }} >
          <div className="container">
            <div>

                Filename:
                    {
                       a.filename
                   }
              <br></br>
              Owner: {
                a.owner
              } 
          </div>
          <div>
              Description: {
                a.desc==""?"No Description": a.desc
              }
            </div>
            <div>
              {
                a.language 
              }
            </div>
            
          </div>       
    
          </Flexbox>

    )}
         <StickyFooter
    bottomThreshold={50}
    normalStyles={{
    backgroundColor: "black",
    padding: "2rem"
    }}
    stickyStyles={{
    backgroundColor: "rgba(255,255,255,.8)",
    padding: "2rem"
    }}
>
    <p style={{color: 'white'}} >Made By: Vinayak Shrivastava </p>
</StickyFooter>

        </Flexbox>
      
      </div>
    );
  }
}

export default App;
