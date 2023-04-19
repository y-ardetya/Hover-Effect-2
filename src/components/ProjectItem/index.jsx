import React, { useCallback, useReducer, useRef } from "react";
import "./style.scss";
import Title from "./Title";
import Image from "./Image";
import { Hash } from "react-feather";
import animate from "./animate";

const initialState = {
  opacity: 0,
  parallaxPosition: { x: 0, y: -20 },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "OPACITY": {
      return {
        ...state,
        opacity: action.payload,
      };
    }
    case "PARALLAX": {
      return {
        ...state,
        parallaxPosition: action.payload,
      };
    }
    default: {
      throw new Error();
    }
  }
};

const ProjectItem = ({ project, itemIndex }) => {
  const easeMethod = "easeInOutCubic";
  const listRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleParallax = (event) => {
    const speed = 5;
    const x = (window.innerWidth - event.pageX * speed) / 100;
    const y = (window.innerHeight - event.pageY * speed) / 100;

    dispatch({ type: "PARALLAX", payload: { x, y } });
  };

  const handleOpacity = (initialOpacity, newOpacity, duration) => {
    animate({
      fromValue: initialOpacity,
      toValue: newOpacity,
      onUpdate: (newOpacity, callback) => {
        dispatch({ type: "OPACITY", payload: newOpacity });
        callback();
      },
      onComplete: () => {},
      duration: duration,
      easeMethod: easeMethod,
    });
  };

  const handleMouseEnter = () => {
    handleOpacity(0, 1, 400);
    listRef.current.addEventListener("mousemove", handleParallax);
  };

  const handleMouseLeave = () => {
    listRef.current.removeEventListener("mousemove", handleParallax);
    handleOpacity(1, 0, 400);
    dispatch({ type: "PARALLAX", payload: initialState.parallaxPosition });
  };

  return (
    <li className="project-item-container" ref={listRef}>
      <Title
        title={project.title}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <Image
        url={project.url}
        opacity={state.opacity}
        parallaxPosition={state.parallaxPosition}
      />

      <div className="info-block">
        <p className="info-block-header">
          <span>
            <Hash />0{itemIndex}
          </span>
        </p>
        {project.info.map((element) => (
          <p key={element}>
            <span>{element}</span>
          </p>
        ))}
      </div>
    </li>
  );
};

export default ProjectItem;
