import React from "react";

import {Route} from "../../constants";

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registerEmail: "",
			registerPassword: "",
			registerName: ""
		}
	}

	onNameChange = (event) => {
		this.setState({registerName: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value})
	}

	onSubmitRegister = () => {
		// this.props.onRouteChange(Route.HOME);

		fetch("http://localhost:3000/register", {
			method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				name: this.state.registerName,
				email: this.state.registerEmail,
				password: this.state.registerPassword
			})
		})
		.then(response => response.json())
		.then((data) => {
			console.log(data);
			if (data.id) {
				this.props.onRouteChange(Route.SIGN_IN);
				alert("Successfully registered. Please sign in!");
			} else {
				alert("Failed to register. Please try again!");
			}
		})
	}

	render() {
		const {onRouteChange} = this.props;

		return (
			<article className="br3 ba shadow-5 dark-gray b--black-10 mv4 w-100 w-75-m w-50-l mw6 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f2 fw6 ph0 mh0">Register</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
								<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="text" 
									name="name"  
									id="name"
									onChange={this.onNameChange}
								/>
							</div>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
								<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="email" 
									name="email-address"  
									id="email-address"
									onChange={this.onEmailChange}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
								<input 
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="password" 
									name="password"  
									id="password"
									onChange={this.onPasswordChange}
								/>
							</div>
						</fieldset>
						<div className="">
							<input 
								onClick={this.onSubmitRegister} 
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
								type="button" 
								value="Register"
							/>
						</div>
						<div className="lh-copy mt3">
							<p 
								onClick={() => onRouteChange(Route.SIGN_IN)} 
								className="f6 link dim black db pointer">
								Already registered? Sign in
							</p>
						</div>
					</div>
				</main>
			</article>
		);
	}
}
export default Register