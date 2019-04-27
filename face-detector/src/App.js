import React, { Component } from 'react';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import {Route} from "./constants";
import {User} from "./User";


import './App.css';


const clarifaiApp = new Clarifai.App({apiKey: "be4e3a1ff43f448489005089d8fce1e6"});
const particleOptions = {
  particles: {
    number: {
      value: 90,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: Route.SIGN_IN,
  isSignedIn: false,
  user: new User()
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  calculateFaceLocation = (data) => {
    const regions = data.outputs[0].data.regions;
    const img = document.getElementById("inputImg");
    const width = Number(img.width);
    const height = Number(img.height);

    if (!regions) {
      return [];
    }

    return regions.map((info) => {
      const bb = info.region_info.bounding_box;
      return {
        leftCol: bb.left_col * width,
        topRow: bb.top_row * height,
        rightCol: width - (bb.right_col * width),
        bottomRow: height - (bb.bottom_row * height)
      }
    })
  }

  displayBoundingBox = (boxes) => {
    this.setState({boxes: boxes});
  }

  loadUser = (user) => {
    this.setState({user: user});
  }

  onRouteChange = (newRoute) => {
    if (newRoute === Route.SIGN_OUT) {
      this.setState(initialState);
    }
    else if (newRoute === Route.HOME) {
      this.setState({isSignedIn: true});
    }
    this.setState({route: newRoute});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onBtnSubmit = () => {
    const {input} = this.state;
    this.setState({imageUrl: input});
    clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, input)
      .then(
        (response) => {
          const boxes = this.calculateFaceLocation(response);
          this.displayBoundingBox(boxes);

          fetch("http://localhost:3000/image", {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              id: this.state.user.id,
              score: boxes.length
            })
          })
          .then(response => response.json())
          .then((count) => {
            this.setState({user: this.state.user.setEntries(count)});
          })
        }
      ).catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {route, imageUrl, boxes, isSignedIn, user} = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        {
          route === Route.HOME
            ? <div>
                <Logo />
                <Rank user={user}/>
                <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit}/>
                <FaceRecognition imageUrl={imageUrl} boxes={boxes}/>
              </div>
            : (
                route === Route.SIGN_IN || route === Route.SIGN_OUT
                ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                : <Register onRouteChange={this.onRouteChange}/>
              )
          
        }
      </div>
    );
  }
}

export default App;
