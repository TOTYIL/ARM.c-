import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function MinimalistGimbal() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [telemetry, setTelemetry] = useState({ yaw: 0, pitch: 0, roll: 0 });
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const momentumRef = useRef({ x: 0, y: 0.003 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root Group for interactive rotation
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Subtle coordinate plane grid in background
    const gridHelper = new THREE.GridHelper(12, 24, 0xe5e7eb, 0xf3f4f6);
    gridHelper.position.y = -2.8;
    scene.add(gridHelper);

    // Materials - crisp minimalist black & zinc tones
    const primaryLineMat = new THREE.LineBasicMaterial({
      color: 0x18181b,
      transparent: true,
      opacity: 0.85,
      linewidth: 1
    });

    const secondaryLineMat = new THREE.LineBasicMaterial({
      color: 0x71717a,
      transparent: true,
      opacity: 0.6,
      linewidth: 1
    });

    const accentMat = new THREE.LineBasicMaterial({
      color: 0x09090b,
      transparent: true,
      opacity: 0.95
    });

    const dashedMat = new THREE.LineDashedMaterial({
      color: 0xa1a1aa,
      dashSize: 0.15,
      gapSize: 0.1,
      transparent: true,
      opacity: 0.5
    });

    // 1. Outer Ring (Azimuth Gimbal)
    const ringGeo1 = new THREE.RingGeometry(2.35, 2.37, 64);
    const ringEdges1 = new THREE.EdgesGeometry(ringGeo1);
    const outerRing = new THREE.LineSegments(ringEdges1, primaryLineMat);
    rootGroup.add(outerRing);

    // Ticks on Outer Ring (Precision measurement marks)
    const tickGroup = new THREE.Group();
    for (let i = 0; i < 36; i++) {
      const angle = (i * Math.PI * 2) / 36;
      const r1 = 2.37;
      const r2 = i % 3 === 0 ? 2.52 : 2.44;
      const points = [
        new THREE.Vector3(Math.cos(angle) * r1, Math.sin(angle) * r1, 0),
        new THREE.Vector3(Math.cos(angle) * r2, Math.sin(angle) * r2, 0)
      ];
      const tickGeo = new THREE.BufferGeometry().setFromPoints(points);
      const tick = new THREE.Line(tickGeo, secondaryLineMat);
      tickGroup.add(tick);
    }
    rootGroup.add(tickGroup);

    // 2. Middle Gimbal (Pitch Ring)
    const midGroup = new THREE.Group();
    const ringGeo2 = new THREE.RingGeometry(1.85, 1.87, 48);
    const ringEdges2 = new THREE.EdgesGeometry(ringGeo2);
    const midRing = new THREE.LineSegments(ringEdges2, secondaryLineMat);
    midRing.rotation.x = Math.PI / 2;
    midGroup.add(midRing);
    rootGroup.add(midGroup);

    // 3. Inner Orbital Ring (Roll Gimbal)
    const innerGroup = new THREE.Group();
    const ringGeo3 = new THREE.RingGeometry(1.4, 1.42, 48);
    const ringEdges3 = new THREE.EdgesGeometry(ringGeo3);
    const innerRing = new THREE.LineSegments(ringEdges3, dashedMat);
    innerRing.computeLineDistances();
    innerRing.rotation.y = Math.PI / 3;
    innerGroup.add(innerRing);
    rootGroup.add(innerGroup);

    // 4. Central Geometric Robotics Core (Wireframe Icosahedron & Octahedron)
    const coreGeo = new THREE.IcosahedronGeometry(0.9, 1);
    const coreEdges = new THREE.EdgesGeometry(coreGeo);
    const coreWireframe = new THREE.LineSegments(coreEdges, accentMat);
    rootGroup.add(coreWireframe);

    const innerCoreGeo = new THREE.OctahedronGeometry(0.45, 0);
    const innerCoreEdges = new THREE.EdgesGeometry(innerCoreGeo);
    const innerCoreWireframe = new THREE.LineSegments(innerCoreEdges, primaryLineMat);
    rootGroup.add(innerCoreWireframe);

    // 5. Subtle Axis Crosshairs (Precision alignment lines)
    const axisPoints = [
      new THREE.Vector3(-2.8, 0, 0), new THREE.Vector3(2.8, 0, 0),
      new THREE.Vector3(0, -2.8, 0), new THREE.Vector3(0, 2.8, 0),
      new THREE.Vector3(0, 0, -2.8), new THREE.Vector3(0, 0, 2.8),
    ];
    const axisGeo = new THREE.BufferGeometry().setFromPoints(axisPoints);
    const axisLines = new THREE.LineSegments(axisGeo, secondaryLineMat);
    rootGroup.add(axisLines);

    // Mouse & Touch Interaction
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      momentumRef.current = {
        x: deltaY * 0.005,
        y: deltaX * 0.005
      };

      rootGroup.rotation.y += momentumRef.current.y;
      rootGroup.rotation.x += momentumRef.current.x;

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch Support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      momentumRef.current = {
        x: deltaY * 0.005,
        y: deltaX * 0.005
      };

      rootGroup.rotation.y += momentumRef.current.y;
      rootGroup.rotation.x += momentumRef.current.x;

      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let tickCounter = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const currentSpeed = speedMultiplier;

      // Harmonic rotations
      midGroup.rotation.x += 0.4 * delta * currentSpeed;
      midGroup.rotation.y += 0.2 * delta * currentSpeed;
      innerGroup.rotation.y += 0.6 * delta * currentSpeed;
      innerGroup.rotation.z += 0.3 * delta * currentSpeed;
      coreWireframe.rotation.y += 0.8 * delta * currentSpeed;
      coreWireframe.rotation.x += 0.5 * delta * currentSpeed;
      innerCoreWireframe.rotation.y -= 1.2 * delta * currentSpeed;

      // Dampen manual drag momentum or keep base idle spin
      if (!isDraggingRef.current) {
        rootGroup.rotation.y += (0.0025 * currentSpeed) + momentumRef.current.y;
        rootGroup.rotation.x += momentumRef.current.x;

        momentumRef.current.x *= 0.94;
        momentumRef.current.y *= 0.94;
      }

      // Update telemetry display at throttled intervals
      tickCounter++;
      if (tickCounter % 6 === 0) {
        setTelemetry({
          yaw: Math.round(((rootGroup.rotation.y * 180) / Math.PI) % 360),
          pitch: Math.round(((rootGroup.rotation.x * 180) / Math.PI) % 360),
          roll: Math.round(((innerGroup.rotation.z * 180) / Math.PI) % 360)
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [speedMultiplier]);

  const resetOrientation = () => {
    momentumRef.current = { x: 0, y: 0.003 };
  };

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] border border-neutral-200 bg-white overflow-hidden group select-none">
      {/* Three.js Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate the mechanism"
      />

      {/* Top Left Precision Overlay */}
      <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-0.5">
        <span className="font-mono text-[11px] font-medium tracking-tight text-neutral-900">
          KINEMATIC GIMBAL v2.4
        </span>
        <span className="font-mono text-[10px] text-neutral-500">
          3-AXIS DEGREE OF FREEDOM · CALIBRATION
        </span>
      </div>

      {/* Top Right Coordinate Readout */}
      <div className="absolute top-4 right-4 pointer-events-none text-right font-mono text-[11px] tabular-nums text-neutral-600 flex flex-col gap-0.5">
        <div>YAW: <span className="text-neutral-900 font-medium">{telemetry.yaw}°</span></div>
        <div>PITCH: <span className="text-neutral-900 font-medium">{telemetry.pitch}°</span></div>
        <div>ROLL: <span className="text-neutral-900 font-medium">{telemetry.roll}°</span></div>
      </div>

      {/* Bottom Minimalist Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-1 font-mono text-[11px] text-neutral-600">
          <span className="text-[10px] uppercase text-neutral-400 mr-1 hidden sm:inline">Speed:</span>
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeedMultiplier(s)}
              className={`px-2 py-0.5 text-xs transition-colors border ${
                speedMultiplier === s 
                  ? 'border-neutral-900 bg-neutral-900 text-white font-medium' 
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
            Drag to manipulate
          </span>
          <button
            onClick={resetOrientation}
            className="px-2.5 py-1 text-xs font-mono text-neutral-600 hover:text-neutral-900 border border-neutral-200 bg-white hover:border-neutral-400 transition-colors"
          >
            Re-center
          </button>
        </div>
      </div>

      {/* Decorative Technical Crosshairs */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-400 pointer-events-none" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-400 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-400 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-400 pointer-events-none" />
    </div>
  );
}
