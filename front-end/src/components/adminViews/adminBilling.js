import React, { Component } from 'react';
import './../../assets/css/dashboardComp.css';
import './../../assets/css/general.css';
import axios from 'axios';
import Image from '../../assets/images/blue-on-dark.png';
// import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
// import PropertyCard from '../properties/addProperty';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import '../../assets/css/general.css'
// const url = process.env.properties || 'http://localhost:9000/properties';
const url = `https://tenantly-back.herokuapp.com/properties`;
const url2 = `http://localhost:9000/billing`


export default class Billing extends Component {
	state = {
		 properties: [],
		 billing: []
	};

	handleInputChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	  };

	setBilling = () => {
		axios.get(url2).then((response) => this.setState({ billing: response.data }, function () {
			console.log(this.state.billing);
		})).catch((err) => {
			console.error('Server Error', err);
		})
	}

	componentDidMount() {
		axios.get(url).then((response) => this.setState({ properties: response.data } , function () {
			console.log(this.state.billing);
			this.setBilling();
		})).catch((err) => {
			console.error('Server Error', err);
		});
	}




	// {this.state.billing.map( (bill, key) => <ul><li key={bill.id}>{bill.amount}</li></ul>)}

	render() {
		return (
			<div className="Billing">
				<div className="billingColumn1">
					<Card>
						<FormControl>
						<InputLabel htmlFor="property-native-required">
							Select a property to view payment history
						</InputLabel>
						<Select
							native
							value={this.state.house_id}
							onChange={this.handleInputChange('house_id')}
							name="Property"
							inputProps={{
							id: 'property-native-required',
							}}
						>
							<option value={0} />
							{this.state.properties.map((property, index) => (
							<option key={index} value={property.propertyName}>
								{property.propertyName}
							</option>
							))}
						</Select>
						<FormHelperText>Required</FormHelperText>
						</FormControl>
                  </Card>			
				  <Card>
					<a href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_Eh0R1RXhYNXEq9z56aVKr04CVDrJvxMc&scope=read_write">
						<img src={Image} alt="Logo"/>
					</a>
				  </Card>
			</div>

			<div>
				<Card>
					<p>Billing History</p>
					{this.state.billing.map((property) =>
						<li>{property.propertyID}</li>
						)}
					

					{this.state.billing.map((bill) =>
					<ul>
						<li>{bill.propertyName}</li>
						<li>{bill.amount}</li>
					</ul>
					)}
				</Card>
			</div>
			</div>
		);
	}
}
