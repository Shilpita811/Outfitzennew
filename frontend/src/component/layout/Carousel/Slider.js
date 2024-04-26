import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const carouselData = [
    { text: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d3a2f1f5dfa35719.png?q=20", bg: "f5f5f5", label: "First slide label", content: "Nulla vitae elit libero, a pharetra augue mollis interdum." },
    { text: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/97c710b1b8b764df.png?q=20", bg: "eee", label: "Second slide label", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    // { text: "Third slide", bg: "e5e5e5", label: "Third slide label", content: "Praesent commodo cursus magna, vel scelerisque nisl consectetur." }
];

const Slider = () => {
    return (
        <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d3a2f1f5dfa35719.png?q=20"
          alt="First slide"
        />
        {/* <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/97c710b1b8b764df.png?q=20"
          alt="Second slide"
        />
        {/* <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=e5e5e5"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
    )
}

export default Slider