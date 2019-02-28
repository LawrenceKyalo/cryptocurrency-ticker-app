import React, { Component } from 'react';
import axios from 'axios';
import './Tickers.css';
import Cryptocurrency from './Cryptocurrency';


class Tickers extends Component{

	constructor(props) {
		super(props);
		this.state = {
			data: [
				{
					id: "bitcoin",
					name: "Bitcoin",
					symbol: "BTC",
					price_usd: "1",
					percent_change_1h: " ",
					percent_change_24h: " ",
					percent_change_7d: " ",
				},
				{
					id: "ethereum",
					name: "Ethereum",
					symbol: "ETH",
					price_usd: "1",
					percent_change_1h: " ",
					percent_change_24h: " ",
					percent_change_7d: " ",
				},
				{
					id: "litecoin",
					name: "Litecoin",
					symbol: "LTC",
					price_usd: "1",
					percent_change_1h: " ",
					percent_change_24h: " ",
					percent_change_7d: " ",

				}
			]
		};
	}

	componentDidMount() {
		this.fetchCryptocurrencyData();
		this.interval = setInterval(() => this.fetchCryptocurrencyData(), 60 * 1000);
	}

	fetchCryptocurrencyData() {
		axios.get("https://api.coinmarketcap.com/v1/ticker/?limit=10")
		.then(response => {
			var wanted = ["bitcoin", "ethereum", "litecoin"];
			var result = response.data.filter(currency => wanted.includes(currency.id));
			this.setState({ data: result });
		})
		.catch(err => console.log(err));
	}

	render(){
	var tickers = this.state.data.map((currency) =>
			< Cryptocurrency data={currency} key={currency.id} />
		);

		return (
			<div className="tickers-container">
				<ul className="tickers"> {tickers} </ul>
				<p> Information updated every minute courtesy of <b><a href="https://coinmarketcap.com/" target="_blank" rel="noopener noreferrer"> coinmarketcap.com </a></b> </p>
			</div>
		);
}


}

export default Tickers;
