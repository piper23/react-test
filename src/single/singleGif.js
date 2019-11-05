import React, { Component } from "react";

class SingleGif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagaeUrl: "",
      name: "",
      author: ""
    };
  }

  getSingleGif() {
    fetch(
      "https://api.giphy.com/v1/gifs/" +
        this.props.match.params.id +
        "?api_key=mP17pVxuBhxNTIg9QZqTgDK18hOvgGF5"
    )
      .then(response => response.json())
      .then(res => {
        console.log(res);
        this.setState({
          imagaeUrl: res.data.images.original.url,
          name: res.data.title,
          author: res.data.username
        });
      });
  }
  componentDidMount() {
    this.getSingleGif();
  }
  render() {
    return (
      <div className="container">
        <div>
          <h1 className="title">{this.state.name}</h1>
          <img src={this.state.imagaeUrl} alt="" />
          <h4 className="title">
            {this.state.author ? "by - " + this.state.author : ""}
          </h4>
        </div>
      </div>
    );
  }
}
export default SingleGif;
