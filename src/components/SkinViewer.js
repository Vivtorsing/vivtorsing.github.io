import React, { useEffect, useRef } from 'react';
import * as skinview3d from 'skinview3d';

const SkinViewer = ({
  width = 300,
  height = 400,
  skinUrl,
  capeUrl = null,
  autoRotate = false,
}) => {
  const canvasRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    if(!canvasRef.current) return;

    //start the model
    const viewer = new skinview3d.SkinViewer({
      canvas: canvasRef.current,
      width,
      height,
      skin: skinUrl,
      animation: (new skinview3d.CrouchAnimation),
    });

    //add other properties
    viewer.autoRotate = autoRotate;
    viewer.animation.speed = .1;

    if(capeUrl) {
      viewer.loadCape(capeUrl);
    }

    //store to refer later
    viewerRef.current = viewer;

    //cleanup
    return () => {
      viewerRef.current = null;
    };
    //run when loads
  }, [width, height, skinUrl, capeUrl, autoRotate]);

  //check if property changes
  useEffect(() => {
    const viewer = viewerRef.current;
    if(!viewer) return;
    viewer.loadSkin(skinUrl);
  }, [skinUrl]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if(!viewer) return;
    if(capeUrl) {
      viewer.loadCape(capeUrl);
    } else {
      viewer.loadCape(null);
    }
  }, [capeUrl]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if(!viewer) return;
    viewer.autoRotate = autoRotate;
  }, [autoRotate]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: width + 'px',
        height: height + 'px',
      }}
    />
  );
};

export default SkinViewer;