import React, { Component } from 'react';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import {Route} from "./constants";

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      boxes: [],
      route: Route.SIGN_IN
    }
  }

  // componentDidMount() {
  //   fetch("http://localhost:3000")
  //     .then((res) => res.json())
  //     .then(console.log);
  // }

  calculateFaceLocation = (data) => {
    const regions = data.outputs[0].data.regions;
    const img = document.getElementById("inputImg");
    const width = Number(img.width);
    const height = Number(img.height);

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

  onRouteChange = (newRoute) => {
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
          this.displayBoundingBox(this.calculateFaceLocation(response));
        }
      ).catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {route, imageUrl, boxes} = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation />
        {
          route === Route.HOME
            ? <div>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit}/>
                <FaceRecognition imageUrl={imageUrl} boxes={boxes}/>
              </div>
            : (
                route === Route.SIGN_IN
                ? <SignIn onRouteChange={this.onRouteChange} />
                : <div>Register</div>
              )
          
        }
      </div>
    );
  }
}

export default App;
