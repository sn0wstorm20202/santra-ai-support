import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingOrb = ({ position, color, scale = 1 }: { 
  position: [number, number, number]; 
  color: string; 
  scale?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[scale, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.3}
          roughness={0.2}
          metalness={0.1}
          distort={0.3}
          speed={2}
        />
      </Sphere>
    </Float>
  );
};

const ParticleField = () => {
  const { viewport } = useThree();
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      const i3 = i * 3;
      temp[i3] = (Math.random() - 0.5) * viewport.width * 2;
      temp[i3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      temp[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    return temp;
  }, [viewport]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#3B82F6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const WaveGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <MeshDistortMaterial
        color="#0EA5E9"
        transparent
        opacity={0.1}
        roughness={0.8}
        metalness={0.2}
        distort={0.4}
        speed={3}
        wireframe
      />
    </mesh>
  );
};

export const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Floating orbs */}
        <FloatingOrb position={[-8, 4, -2]} color="#3B82F6" scale={1.5} />
        <FloatingOrb position={[8, -3, -1]} color="#6366F1" scale={1.2} />
        <FloatingOrb position={[-5, -4, -3]} color="#06B6D4" scale={1} />
        <FloatingOrb position={[6, 5, -4]} color="#8B5CF6" scale={0.8} />
        <FloatingOrb position={[0, -6, -2]} color="#0EA5E9" scale={1.3} />
        
        {/* Particle field */}
        <ParticleField />
        
        {/* Wave geometry */}
        <WaveGeometry />
      </Canvas>
    </div>
  );
};