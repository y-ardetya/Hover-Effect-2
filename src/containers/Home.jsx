import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { sampleData } from "../utils/sampleData";
import ProjectItem from "../components/ProjectItem";

const Home = () => {
 

  useEffect(() => {
    
  }, []);
  return (
    <div>
      <Header />
      <div className="main-container" id="main-container">
        <ul>
          {sampleData.map((project, index) => (
            <ProjectItem key={index} project={project} itemIndex={index} />
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
