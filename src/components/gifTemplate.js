import React, { Component } from 'react';

class GifTemplate extends Component {


 render() {
     return (

     	 <div className="gif-container">
            <a href={ "single-gif/"+this.props.gif.id } >
                <img src={ this.props.gif.images.fixed_width_downsampled.url } className="gifImage" alt="" />
            </a>
        </div>

  );
  }

}

export default GifTemplate;