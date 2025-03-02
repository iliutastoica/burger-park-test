

import React from 'react';

import './AnimatedPark.scss';

const AnimatedPark: React.FC = () => {
  return (
    <div className="animated-park">
      <div className="container">   
  <div className="floor"></div>
  <div className="pattern"></div>
  <div className="centerTree">
    <div></div>
  </div>
  <div className="rightTree"></div>
  <div className="Balloons">
    <div className="BalloonLeft"></div>
    <div className="Ballooncenter"></div>
    <div className="BalloonRight"></div>
    <div className="BalloonBase"></div>
    <div className="BalloonBaseShadow"></div>
  </div>
  <div className="booth">
    <div className="ticket"><span>★</span> TICKET <span>★</span></div>
  </div>
  <div className="boothShadow"></div>
  <div className="ferris_wheel">
    <div className="wheel_wrap">
      <div className="wheel">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div className="buckets">
      <div><span></span></div>
      <div><span></span></div>
      <div><span></span></div>
      <div><span></span></div>
      <div><span></span></div>
      <div><span></span></div>
      <div><span></span></div>
      <div><span></span></div>
    </div>
    <div className="stand">
      <div></div>
      <div></div>
    </div>
  </div>
  <div className="sun"></div>
  <div className="cloudLeft"></div>
  <div className="cloudRight"></div>

</div>
    </div>
  );
};

export default AnimatedPark;