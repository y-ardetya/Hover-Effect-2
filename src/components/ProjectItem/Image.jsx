import React from 'react'

const Image = ({url, opacity, parallaxPosition}) => {
  return (
    <img
        src={url}

        style={{
          opacity: opacity,
          transform: `translate3d(${parallaxPosition.x}px, ${parallaxPosition.y}px, 0px)`
        }}
    />
  )
}

export default Image