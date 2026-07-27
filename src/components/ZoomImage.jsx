import React, { useRef, useState } from 'react';

const ZoomImage = ({ src, zoomLevel = 1, width = 100, height = 100 }) => {
  const containerRef = useRef(null);
  const [bgPos, setBgPos] = useState('50% 50%');
  const [zoom, setZoom] = useState(zoomLevel);
  const [overlayImg, setOverlayImg] = useState(false);
  const handleMouseMove = (e) => {
    const { left, top, width: w, height: h } = containerRef.current.getBoundingClientRect();
    // calculate mouse position as percentage of container
    const xPct = ((e.clientX - left) / w) * 100;
    const yPct = ((e.clientY - top) / h) * 100;
    setBgPos(`${xPct}% ${yPct}%`);
    setZoom(1.5);
  };

  const handleMouseLeave = () => {
    setBgPos('50% 50%');
    setZoom(1);
  };

  return (
    <div className="zoom-outer-container">
      <div className={`overlay-img ${overlayImg ? "active" : ""}`} onClick={() => {
          setOverlayImg(false)
          document.documentElement.style.overflow = "auto";
        }}>
        <button type="button" className="modal__close" onClick={() => {
          setOverlayImg(false)
          document.documentElement.style.overflow = "auto";
        }} aria-label="Modal Close">&times;</button>
        <img src={src} alt="Product" onClick={(e) => {e.stopPropagation(); }} />
      </div>
      <div
        ref={containerRef}
        className="zoom-container"
        style={{
          width: `${width}%`,
          height: `${height}%`,
          backgroundImage: `url(${src})`,
          backgroundSize: `${zoom * 75}% auto`,  // zoomLevel × 100%
          backgroundPosition: bgPos,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick = {() => {
          document.documentElement.style.overflow = "hidden";
          setOverlayImg(true)
        }}
      >
        {/* keep the img for accessibility, but hide it */}
        <img src={src} alt="Product" />
      </div>
    </div>
  );
};

export default ZoomImage;
