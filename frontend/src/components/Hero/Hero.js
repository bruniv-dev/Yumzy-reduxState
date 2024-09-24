import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <>
      <div className="hero" id="hero">
        <div className="hero-contents">
          <h2>Order Your favorite food here</h2>
          <p>
            Craving something tasty? Yumzy has you covered. Browse our menu
            online and get your favorite dishes delivered straight to you.
            Quick, easy, and delicious—order now!
          </p>
          <a href="#explore-menu">
            <button>view menu</button>
          </a>
        </div>
        <img
          className="hero-bg-img"
          src={`${process.env.PUBLIC_URL}/Banner2.jpg`}
          alt=""
        />
      </div>
    </>
  );
};

export default Hero;
