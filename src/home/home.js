import React, { Component } from "react";
import "./home.css";
import GifTemplate from "../components/gifTemplate";
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offset: 0,
			count: 15,
			gifs: [],
			scrolled: false,
			search: "",
			searhActive: false,
			newSearch: false
		};
		this.formSubmit = this.formSubmit.bind(this);
	}
	componentDidMount() {
		this.fetchGifs();
		document.addEventListener("scroll", this.trackScrolling);
	}
	// API TO FETCH DATA  waiting for the api to retun data before making the next request
	fetchGifs = () => {
		const { offset, count, gifs } = this.state;
		fetch(
			"https://api.giphy.com/v1/gifs/trending?offset=" +
				offset +
				"&limit=" +
				count +
				"&api_key=mP17pVxuBhxNTIg9QZqTgDK18hOvgGF5"
		)
			.then(response => response.json())
			.then(res =>
				this.setState({
					gifs: [...gifs, ...res.data],
					scrolled: true
				})
			);
	};

	handleChange(event) {
		this.setState({ search: event.target.value });
	}

	//To Fetch Search Queries
	formSubmit = () => {
		this.setState({
			newSearch: true,
			searhActive: true,
			offset: 0
		});

		this.searchFetch();
	};

	searchFetch = () => {
		let { search, offset, count, gifs, searhActive } = this.state;
		fetch(
			"https://api.giphy.com/v1/gifs/search?q=" +
				search +
				"&limit=" +
				count +
				"&offset=" +
				offset +
				"&api_key=mP17pVxuBhxNTIg9QZqTgDK18hOvgGF5"
		)
			.then(response => response.json())
			.then(res => {
				console.log(this.state);
				if (this.state.newSearch === true) {
					this.setState({
						gifs: res.data,
						scrolled: true,
						newSearch: false
					});
				} else {
					this.setState(prevState => ({
						gifs: [...gifs, ...res.data],
						scrolled: true,
						offset: prevState.offset + 15
					}));
				}
			});
	};

	render() {
		return (
			<div className="container" id="mainContainer">
				<div className="searchContainer">
					<input
						type="text"
						name="search"
						onChange={this.handleChange.bind(this)}
						placeholder="Search Query"
						onKeyDown={this._handleKeyDown}
					/>
					<button className="search" onClick={this.formSubmit}>
						Search
					</button>
				</div>
				<div className="gifhold" id="gifhold">
					{this.state.gifs.length > 0 ? (
						this.state.gifs.map((gif, i) => (
							<GifTemplate gif={gif} />
						))
					) : (
						<p>No GIFs Found OR API CANT BE REACHED</p>
					)}
				</div>
			</div>
		);
	}

	componentWillUnmount() {
		document.removeEventListener("scroll", this.trackScrolling);
	}

	//Handlign Key Press enter while Focused on Search
	_handleKeyDown = e => {
		if (e.key === "Enter") {
			this.formSubmit();
		}
	};

	//Scroll Lodaing Checking for end of
	trackScrolling = () => {
		const wrappedElement = document.getElementById("gifhold");

		if (
			wrappedElement.scrollHeight - wrappedElement.scrollTop ===
			wrappedElement.clientHeight
		) {
			if (this.state.scrolled === true) {
				this.setState({
					scrolled: false
				});
				if (this.state.searhActive === false) {
					this.setState(prevState => ({
						offset: prevState.offset + 15
					}));
					this.fetchGifs();
				} else {
					this.setState(prevState => ({
						offset: prevState.offset + 15
					}));
					this.searchFetch();
				}
			}
		}
	};
}
export default Home;
