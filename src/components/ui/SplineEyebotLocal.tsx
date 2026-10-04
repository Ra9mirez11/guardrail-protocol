'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SplineEyebotLocal = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const size = 56;

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 2. Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const redGlowLight = new THREE.PointLight(0xff0044, 2.5, 6);
    redGlowLight.position.set(0, 0, 1.5);
    scene.add(redGlowLight);

    // 3. Eyebot Main Drone Head (Rotates directly to cursor)
    const botHead = new THREE.Group();
    scene.add(botHead);

    // Outer Dark Metal Chassis (The spherical drone body)
    const chassisGeo = new THREE.SphereGeometry(1.2, 36, 36);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x16181d,
      metalness: 0.9,
      roughness: 0.25,
    });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    botHead.add(chassis);

    // Recessed Black Core Socket (Inner cavity)
    const cavityGeo = new THREE.CylinderGeometry(0.85, 0.8, 0.6, 32);
    cavityGeo.rotateX(Math.PI / 2);
    const cavityMat = new THREE.MeshStandardMaterial({
      color: 0x05070a,
      metalness: 0.95,
      roughness: 0.1,
    });
    const cavity = new THREE.Mesh(cavityGeo, cavityMat);
    cavity.position.z = 0.8;
    botHead.add(cavity);

    // Red LED Dot Matrix Ring (Exact replica of the Spline screenshot)
    const ledMat = new THREE.MeshStandardMaterial({
      color: 0xff0033,
      emissive: 0xff0033,
      emissiveIntensity: 1.8,
      roughness: 0.2,
    });

    const ledDotGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const innerRadius = 0.52;
    const outerRadius = 0.68;
    const dotCountRing1 = 26;
    const dotCountRing2 = 32;

    // Inner LED ring
    for (let i = 0; i < dotCountRing1; i++) {
      const angle = (i / dotCountRing1) * Math.PI * 2;
      const dot = new THREE.Mesh(ledDotGeo, ledMat);
      dot.position.set(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius, 1.05);
      botHead.add(dot);
    }

    // Outer LED ring
    for (let i = 0; i < dotCountRing2; i++) {
      const angle = (i / dotCountRing2) * Math.PI * 2;
      const dot = new THREE.Mesh(ledDotGeo, ledMat);
      dot.position.set(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius, 1.05);
      botHead.add(dot);
    }

    // Central Mechanical Pupil Lens
    const lensGeo = new THREE.SphereGeometry(0.38, 24, 24);
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0x020408,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.6,
      thickness: 0.5,
    });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.position.z = 1.0;
    botHead.add(lens);

    // Center Pupil Core
    const pupilGeo = new THREE.CircleGeometry(0.18, 32);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const pupil = new THREE.Mesh(pupilGeo, pupilMat);
    pupil.position.z = 1.25;
    botHead.add(pupil);

    // Specular Highlight Dot on Lens
    const specGeo = new THREE.CircleGeometry(0.05, 16);
    const specMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const spec = new THREE.Mesh(specGeo, specMat);
    spec.position.set(0.09, 0.09, 1.26);
    botHead.add(spec);

    // Blue Targeting Triangle on Top (From your Spline screenshot)
    const triangleShape = new THREE.Shape();
    triangleShape.moveTo(0, 0.15);
    triangleShape.lineTo(-0.15, -0.1);
    triangleShape.lineTo(0.15, -0.1);
    triangleShape.closePath();

    const triangleGeo = new THREE.ShapeGeometry(triangleShape);
    const triangleMat = new THREE.MeshBasicMaterial({
      color: 0x00aaff,
      side: THREE.DoubleSide,
    });
    const triangle = new THREE.Mesh(triangleGeo, triangleMat);
    triangle.position.set(0, 0.88, 1.02);
    botHead.add(triangle);

    // 4. Cursor Tracking Physics (Follows cursor smoothly across entire screen)
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Max head rotation range
      targetX = -y * 0.55;
      targetY = x * 0.55;
    };

    window.addEventListener('mousemove', onMouseMove);

    // 5. Render Loop with Smooth Damping (Lerp)
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      botHead.rotation.x += (targetX - botHead.rotation.x) * 0.08;
      botHead.rotation.y += (targetY - botHead.rotation.y) * 0.08;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hud-capsule select-none inline-flex items-center gap-4 pr-6 pl-2.5 py-2 shadow-[0_0_30px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(0,255,170,0.25)] border border-[#00ffaa]/40 bg-[#020d09]/90 backdrop-blur-xl rounded-full">
      {/* 3D Eyebot Socket Container */}
      <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
        {/* Rotating outer HUD scanner ring */}
        <div className="eye-scanner-ring pointer-events-none scale-110" />

        {/* 3D Canvas Mount */}
        <div 
          ref={mountRef}
          className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center border-2 border-[#00ffaa] shadow-[0_0_25px_rgba(0,255,170,0.6)] bg-[#05080f]" 
        />
      </div>

      {/* High-tech HUD text */}
      <span className="hud-text text-xs sm:text-sm tracking-wider font-mono font-bold text-white drop-shadow-[0_0_8px_rgba(0,255,170,0.8)]">
        Next-Gen Token-2022 Honeypot & Transfer Hook Sentinel
      </span>
    </div>
  );
};
