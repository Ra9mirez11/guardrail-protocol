'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeEyebot = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = 42;
    const height = 42;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ffaa, 3.5, 10);
    pointLight.position.set(2, 2, 3);
    scene.add(pointLight);

    const rimLight = new THREE.PointLight(0x00ffff, 1.5, 10);
    rimLight.position.set(-2, -2, 2);
    scene.add(rimLight);

    // 3. Eyeball Group (Rotates in 3D to look at mouse)
    const eyeGroup = new THREE.Group();
    scene.add(eyeGroup);

    // Outer Eyeball Sphere (Dark titanium/obsidian gloss)
    const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x05080c,
      metalness: 0.85,
      roughness: 0.2,
    });
    const eyeball = new THREE.Mesh(sphereGeo, sphereMat);
    eyeGroup.add(eyeball);

    // Iris Ring (Glowing neon emerald)
    const irisGeo = new THREE.RingGeometry(0.3, 0.6, 32);
    const irisMat = new THREE.MeshBasicMaterial({
      color: 0x00ffaa,
      side: THREE.DoubleSide,
    });
    const iris = new THREE.Mesh(irisGeo, irisMat);
    iris.position.z = 0.99;
    eyeGroup.add(iris);

    // Pupil (Center core)
    const pupilGeo = new THREE.CircleGeometry(0.25, 32);
    const pupilMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const pupil = new THREE.Mesh(pupilGeo, pupilMat);
    pupil.position.z = 1.0;
    eyeGroup.add(pupil);

    // Inner Specular Glare Dot
    const glareGeo = new THREE.CircleGeometry(0.08, 16);
    const glareMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const glare = new THREE.Mesh(glareGeo, glareMat);
    glare.position.set(0.12, 0.12, 1.01);
    eyeGroup.add(glare);

    // 4. Mouse Tracking Interpolation
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Max rotation angles in radians
      targetRotY = Math.max(-0.7, Math.min(0.7, deltaX * 0.9));
      targetRotX = Math.max(-0.7, Math.min(0.7, deltaY * 0.9));
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 5. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth damping interpolation (lerp)
      eyeGroup.rotation.y += (targetRotY - eyeGroup.rotation.y) * 0.12;
      eyeGroup.rotation.x += (targetRotX - eyeGroup.rotation.x) * 0.12;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hud-capsule select-none inline-flex items-center gap-3.5 pr-6 pl-2 py-1.5 shadow-[0_0_25px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(0,255,170,0.2)]">
      {/* 3D Eyebot Socket Container */}
      <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
        {/* Rotating outer HUD scanner ring */}
        <div className="eye-scanner-ring pointer-events-none" />
        
        {/* WebGL 3D Canvas Mount */}
        <div 
          ref={mountRef} 
          className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border border-[#00ffaa]/50 shadow-[0_0_15px_rgba(0,255,170,0.4)] bg-black/80" 
        />
      </div>

      {/* High-tech HUD text */}
      <span className="hud-text text-xs sm:text-sm tracking-wide">
        Next-Gen Token-2022 Honeypot & Transfer Hook Sentinel
      </span>
    </div>
  );
};
