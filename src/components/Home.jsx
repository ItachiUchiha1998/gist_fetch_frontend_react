import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Route, NavLink, HashRouter } from "react-router-dom";
import { Button } from 'react-bootstrap';
import '../App.css';
import classNames from "classnames";
import Flexbox from 'flexbox-react';
import axios from 'axios';
import StickyFooter from 'react-sticky-footer';

class App extends Component {

   constructor(props){
    super(props);
    this.state = {
      data:[{
        
        files: {
          log: {
            language: "",
            content: "",
          }
        },
        description: "",
        url: "",
        owner: {
          login: ""
        }
        
      }],
      uid: this.props.location.state.uid,
      token: this.props.location.state.token,
      redirectmyBucket: false
    };
        this.myBucket = this.myBucket.bind(this);

  }

  Star = (param,name,owner,desc,language) => (e) => {
    
    const BASE_URL = 'http://localhost:7000/star';
    fetch(BASE_URL,{
      method : 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      uid: this.state.uid,
      _id: this.state.uid, 
      gist_url: param,
      owner: owner,
      desc: desc,
      filename: name,
      language: language,
      token: this.state.token
    })
    }).then( response => {return response.json();}).then( json => { 

      console.log(json)

    });
  }

  myBucket() {
    this.setState({redirectmyBucket: true})
  }


  componentWillMount(){
    this.CallReadApi();
  }

   CallReadApi = () => {
    const BASE_URL = 'http://localhost:7000/getGists';
    fetch(BASE_URL,{
      method : 'POST'
    }).then( response => {return response.json();}).then( json => { 

      this.setState({data: json.data.data })

    });
  
  }

  render() {
    const { data } = this.state;
    console.log(this.state);
    const {classes} = this.props;

    if (this.state.redirectmyBucket) {
      return <Redirect to={{pathname: "/mybucket", state: { uid: this.state.uid, token: this.state.token }}} />;
   }

  return (

     <div className="container">

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"></link>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous"></link>    

  <Flexbox flexDirection="column" minHeight="100vh">
    <Flexbox element="header" height="60px">
            
      <h1 style={{float:'left',margin:'auto'}}>GISTS </h1>

            <Button bsStyle="info" type='button' style={{position:'relative',padding:10,margin:'auto'}}
             onClick={this.myBucket}
            >
            <i className="fab fa-bitbucket"></i>My Bucket
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

            <div>
                Filename:
                    {
                       JSON.stringify(a.files).split("{")[1]
                   }
              <br></br>
              Owner: {
                a.owner.login
              }
            </div>
            <div style={{float: "right"}}>
              <Button bsStyle="info" type='button' onClick={this.Star(a.url,JSON.stringify(a.files).split("{")[1],
                      a.owner.login,a.description,
                      JSON.stringify(a.files).split("{")[2].split(",")[2])
                } >
                      <i className="fas fa-star" ></i>Star
              </Button> 
            </div>
          </div>
          <div>
              Description: {
                a.description==""?"No Description": a.description
              }
            </div>
            <div>
              {
                JSON.stringify(a.files).split("{")[2].split(",")[2] 
              }
            </div>
            
          </div>       
    
          </Flexbox>

    )} 
   

        </Flexbox>
      
      </div>
    );
  }
}

export default App;
