import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function ProductModel({ color = "#1A365D" }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
        // Gentle floating animation
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {/* A modern capsule shape common in these products */}
      <capsuleGeometry args={[0.8, 2.5, 4, 16]} />
      <meshPhysicalMaterial 
        color={color} 
        roughness={0.2} 
        metalness={0.1} 
        clearcoat={0.8}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

interface ModelViewerProps {
  color?: string;
}

export function ModelViewer({ color = "#1A365D" }: ModelViewerProps) {
  return (
    <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden relative">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <fog attach="fog" args={['#f1f5f9', 5, 20]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-bias={-0.0001} />
        
        <Stage environment="city" intensity={0.5} contactShadow={false}>
            <ProductModel color={color} />
        </Stage>
        
        <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.25} far={10} color="#1A365D" />
        <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur px-4 py-2 rounded-lg text-xs text-slate-500 text-center pointer-events-none">
        Interactive 3D Preview • Drag to rotate
      </div>
    </div>
  );
}
