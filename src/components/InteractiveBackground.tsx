import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function MechaCore() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Idle rotation
    groupRef.current.rotation.y += 0.003;
    groupRef.current.rotation.x += 0.002;
    
    // Mouse tracking rotation (dampened)
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;
    
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;

    // Scale spring on interaction
    const targetScale = clicked ? 1.3 : hovered ? 1.1 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        {/* Outer complex wireframe structure */}
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onPointerDown={() => setClicked(true)}
          onPointerUp={() => setClicked(false)}
        >
          <icosahedronGeometry args={[2.5, 1]} />
          <meshBasicMaterial 
            color={hovered ? "#ffffff" : "#444444"} 
            wireframe 
            transparent 
            opacity={0.6} 
          />
        </mesh>
        
        {/* Inner dynamic distorted energy field */}
        <mesh>
          <icosahedronGeometry args={[1.5, 4]} />
          <MeshDistortMaterial
            color={hovered ? "#ffffff" : "#222222"}
            wireframe={true}
            distort={hovered ? 0.6 : 0.25}
            speed={hovered ? 8 : 2}
          />
        </mesh>

        {/* Central solid core */}
        <mesh>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial 
            color={hovered ? "#ffffff" : "#000000"} 
            emissive={hovered ? "#333333" : "#000000"}
            wireframe={false}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function InteractiveBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#050505]">
      {/* 
        eventSource allows the 3D element to intercept hovers and clicks even if 
        UI layers sit in front of it. We set pointer-events-auto so we don't block
        the page, but since z-index is 0, normal transparent divs pass clicks through!
      */}
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        eventSource={document.body}
        eventPrefix="client"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <group position={[0, 0, 0]}>
          <MechaCore />
        </group>
      </Canvas>
    </div>
  );
}
