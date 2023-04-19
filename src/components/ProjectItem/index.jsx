import React, { useReducer, useRef } from "react";
import "./style.scss";
import Title from "./Title";
import Image from "./Image";
import { Hash } from "react-feather";
import animate from "./animate";
import cn from "classnames";

const initialState = {
  opacity: 0,
  parallaxPosition: { x: 0, y: -20 },
  scale: 0.8,
  rotationPosition: 0,
  active: false,
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
    case "SCALE": {
      return {
        ...state,
        scale: action.payload,
      };
    }
    case "ROTATION": {
      return {
        ...state,
        rotationPosition: action.payload,
      };
    }
    case "ACTIVE": {
      return {
        ...state,
        active: true,
      };
    }
    case "INACTIVE": {
      return {
        ...state,
        active: false,
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

  const handleScale = (initialScale, newScale, duration) => {
    animate({
      fromValue: initialScale,
      toValue: newScale,
      onUpdate: (newScale, callback) => {
        dispatch({ type: "SCALE", payload: newScale });
        callback();
      },
      onComplete: () => {},
      duration: duration,
      easeMethod: easeMethod,
    });
  };

  const handleRotation = (initialRotation, duration) => {
    const newRotation = Math.random() * 15 * (Math.round(Math.random()) ? 1 : -1);
    animate({
      fromValue: initialRotation,
      toValue: newRotation,
      onUpdate: (newRotation, callback) => {
        dispatch({ type: "ROTATION", payload: newRotation });
        callback();
      },
      onComplete: () => {},
      duration: duration,
      easeMethod: easeMethod,
    });
  };

  const handleMouseEnter = () => {
    handleRotation(state.rotationPosition, 500);
    handleScale(0.8, 1, 500);
    handleOpacity(0, 1, 500);
    listRef.current.addEventListener("mousemove", handleParallax);
    dispatch({ type: "ACTIVE" });
  };

  const handleMouseLeave = () => {
    listRef.current.removeEventListener("mousemove", handleParallax);
    handleRotation(state.rotationPosition, 500);
    handleScale(1, initialState.scale, 500);
    handleOpacity(1, 0, 800);
    dispatch({ type: "PARALLAX", payload: initialState.parallaxPosition });
    dispatch({ type: "INACTIVE" });
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
        scale={state.scale}
        rotation={state.rotationPosition}
      />

      <div className={cn("info-block", {"as-active": state.active})}>
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
