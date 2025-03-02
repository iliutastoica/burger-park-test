import React from 'react';

import './HomeIntro.scss';

const HomeIntro: React.FC<{title?: string;}> = ({title}) => {
  const text = title ?? 'Welcome to Burger Land';

  return (
    <div className="home-container home-intro">
        <h1 className="MuiTypography-h2 h1-intro clipped">
        <svg id="text" viewBox="0 0 1200 150" width="100%" height="150px">
          <defs>
            <filter id="f1" x="0" y="0" width="200%" height="200%">
              <feOffset result="offOut" in="SourceGraphic" dx="10" dy="10" />
              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
            <filter id="f4" x="0" y="0" width="200%" height="200%">
              <feOffset result="offOut" in="SourceGraphic" dx="15" dy="15" />
              <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
              <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
            <filter id="goo">
              <feOffset result="offOut" in="SourceGraphic" dx="10" dy="10" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
          <symbol id="s-text" filter="url(#f1)">
            <text text-anchor="middle" x="50%" y="70%">{text}</text>
          </symbol>
          <symbol id="s-text2" filter="url(#f4)">
            <text text-anchor="middle" x="50%" y="70%">{text}</text>
          </symbol>

          <g className="g-ants">
            <use xlinkHref="#s-text2" className="text-show"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
            <use xlinkHref="#s-text" className="text-copy"></use>
          </g>
        </svg>
        </h1>
        <h5 className="MuiTypography-h5 subtitle clippednot">
          Experience the most delicious adventure of your life!
        </h5>
    </div>
  );
};

export default HomeIntro;