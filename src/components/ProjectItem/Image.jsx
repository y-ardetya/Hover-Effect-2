import React from "react";

const Image = ({ url, opacity, parallaxPosition, scale, rotation }) => {
  return (
    <img
      src={url}
      style={{
        opacity: opacity,
        width: "400px",
        height: "500px",
        transform: `translate3d(${parallaxPosition.x}px, ${parallaxPosition.y}px, 0px) rotate(${rotation}deg) scale(${scale})`,
      }}
    />
  );
};

export default Image;
