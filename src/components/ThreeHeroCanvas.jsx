import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeHeroCanvas
 * Interactive WebGL 3D Gyroscope and Constellation Orb
 * Built with Three.js for CONVERGIA 2026
 * Features:
 * - Nested rotating wireframe rings & icosahedron core (representing converging disciplines: VLSI, Energy, AI, Rehab)
 * - 600+ floating stardust particle cloud with depth
 * - Smooth lerped cursor responsiveness (camera & rotation parallax)
 * - Optimized WebGL cleanup on unmount
 */
export default function ThreeHeroCanvas({ mouseNorm = { x: 0, y: 0 } }) {
  const containerRef = useRef(null);
  const mouseNormRef = useRef(mouseNorm);

  // Keep mouseNormRef fresh without triggering re-renders
  useEffect(() => {
    mouseNormRef.current = mouseNorm;
  }, [mouseNorm]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    // 2. WebGL Renderer with Alpha & Antialiasing
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Central Pivot Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Inner Glowing Core (Icosahedron wireframe + translucent inner sphere)
    const coreGeometry = new THREE.IcosahedronGeometry(1.3, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x244b3c,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
      roughness: 0.3,
      metalness: 0.8
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    masterGroup.add(coreMesh);

    // Inner Solid Orb with Fresnel-like warm glow
    const innerOrbGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const innerOrbMat = new THREE.MeshStandardMaterial({
      color: 0xc76d42,
      emissive: 0x8a3818,
      emissiveIntensity: 0.35,
      roughness: 0.4,
      metalness: 0.6,
      transparent: true,
      opacity: 0.75
    });
    const innerOrb = new THREE.Mesh(innerOrbGeo, innerOrbMat);
    masterGroup.add(innerOrb);

    // Gyroscope Ring 1 (Equatorial - VLSI & Silicon)
    const ring1Geo = new THREE.TorusGeometry(2.1, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x1d342a,
      roughness: 0.2,
      metalness: 0.9
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    masterGroup.add(ring1);

    // Gyroscope Ring 2 (Polar - Energy & Systems)
    const ring2Geo = new THREE.TorusGeometry(2.5, 0.022, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xc76d42,
      roughness: 0.3,
      metalness: 0.8
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    masterGroup.add(ring2);

    // Gyroscope Ring 3 (Diagonal - Health & Intelligence)
    const ring3Geo = new THREE.TorusGeometry(2.9, 0.018, 16, 120);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x6e7868,
      roughness: 0.2,
      metalness: 0.7
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 5;
    ring3.rotation.x = Math.PI / 6;
    masterGroup.add(ring3);

    // 4. Floating Particle Cloud (Constellation of 650 nodes)
    const particleCount = 650;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x244b3c);
    const c2 = new THREE.Color(0xc76d42);
    const c3 = new THREE.Color(0xe07a5f);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Distribute particles in spherical shell
      const r = 2.4 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      posArray[i] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = r * Math.cos(phi);

      const chosenColor = Math.random() > 0.5 ? (Math.random() > 0.5 ? c1 : c2) : c3;
      colorArray[i] = chosenColor.r;
      colorArray[i + 1] = chosenColor.g;
      colorArray[i + 2] = chosenColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.NormalBlending
    });

    const particleCloud = new THREE.Points(particleGeometry, particleMaterial);
    masterGroup.add(particleCloud);

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLightEmerald = new THREE.PointLight(0x244b3c, 3.5, 15);
    pointLightEmerald.position.set(4, 3, 5);
    scene.add(pointLightEmerald);

    const pointLightCopper = new THREE.PointLight(0xc76d42, 4.0, 15);
    pointLightCopper.position.set(-4, -3, 4);
    scene.add(pointLightCopper);

    const topSoftLight = new THREE.DirectionalLight(0xfff8ee, 1.2);
    topSoftLight.position.set(0, 6, 4);
    scene.add(topSoftLight);

    // 6. Animation Loop with Smooth Lerping
    let animationFrameId;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Read latest mouse normalized coordinates (-1 to 1)
      const { normX = 0, normY = 0 } = mouseNormRef.current || {};

      targetRotationY = normX * 0.45;
      targetRotationX = -normY * 0.45;

      // Lerp for cinematic organic dampening
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      masterGroup.rotation.y = currentRotationY + elapsedTime * 0.12;
      masterGroup.rotation.x = currentRotationX + Math.sin(elapsedTime * 0.3) * 0.08;

      // Independent ring rotations for authentic gyroscopic kinetic motion
      ring1.rotation.x += 0.008;
      ring1.rotation.y += 0.005;

      ring2.rotation.y += 0.009;
      ring2.rotation.z += 0.006;

      ring3.rotation.z -= 0.007;
      ring3.rotation.x += 0.004;

      // Subtle breathing pulse on the core
      const pulse = 1 + Math.sin(elapsedTime * 2.2) * 0.04;
      coreMesh.scale.set(pulse, pulse, pulse);
      innerOrb.scale.set(pulse * 0.98, pulse * 0.98, pulse * 0.98);

      // Particle cloud slow drift
      particleCloud.rotation.y = -elapsedTime * 0.04;
      particleCloud.rotation.x = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize Observer for flawless responsiveness
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeometry.dispose();
      coreMaterial.dispose();
      innerOrbGeo.dispose();
      innerOrbMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="three-canvas-wrapper"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2
      }}
    />
  );
}

