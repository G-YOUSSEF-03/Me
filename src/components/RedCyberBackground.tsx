"use client";

import { AdaptiveDpr, Preload } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type CyberSceneProps = {
  isMobile: boolean;
};

export default function RedCyberBackground() {
  const isMobile = useIsMobile();

  return (
    <div aria-hidden className="red-cyber-bg pointer-events-none absolute inset-0 overflow-hidden bg-black">
      <Canvas
        className="pointer-events-none"
        camera={{ position: [0, 2.35, 7.4], fov: isMobile ? 62 : 54, near: 0.1, far: 60 }}
        dpr={isMobile ? [1, 1.15] : [1, 1.6]}
        gl={{
          alpha: false,
          antialias: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
      >
        <color attach="background" args={["#020202"]} />
        <fog attach="fog" args={["#020202", 7, 23]} />
        <CyberScene isMobile={isMobile} />
        <AdaptiveDpr pixelated />
        <Preload all />
      </Canvas>
      <div className="red-cyber-glow" />
      <div className="red-cyber-vignette" />
      <div className="red-cyber-fade" />
      <div className="red-cyber-grain" />
    </div>
  );
}

function CyberScene({ isMobile }: CyberSceneProps) {
  const rig = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;

    if (rig.current) {
      rig.current.rotation.y = Math.sin(time * 0.12) * 0.035;
      rig.current.position.x = Math.sin(time * 0.08) * 0.16;
    }
  });

  return (
    <group ref={rig}>
      <ambientLight intensity={0.18} color="#3a0508" />
      <pointLight position={[6.2, 3.8, -3.2]} intensity={9} color="#ff1f32" distance={13} />
      <pointLight position={[-5, 0.4, -4]} intensity={3.6} color="#ff2638" distance={10} />
      <RedPlanet isMobile={isMobile} />
      <DataRain isMobile={isMobile} />
      <ParticleField isMobile={isMobile} />
      <NetworkWeb isMobile={isMobile} side="left" />
      <NetworkWeb isMobile={isMobile} side="right" />
      <TerrainGrid isMobile={isMobile} />
    </group>
  );
}

function TerrainGrid({ isMobile }: CyberSceneProps) {
  const geometry = useMemo(() => {
    const segments = isMobile ? 70 : 122;
    return new THREE.PlaneGeometry(isMobile ? 18 : 24, isMobile ? 15 : 19, segments, segments);
  }, [isMobile]);
  const basePositions = useMemo(() => new Float32Array(geometry.attributes.position.array), [geometry]);
  const mesh = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;

    const terrainGeometry = mesh.current.geometry;
    const positions = terrainGeometry.attributes.position.array as Float32Array;
    const time = clock.elapsedTime * 0.58;

    for (let index = 0; index < positions.length; index += 3) {
      const x = basePositions[index];
      const y = basePositions[index + 1];
      const ridge =
        Math.sin(x * 1.15 + time) * 0.42 +
        Math.sin(y * 1.72 - time * 0.85) * 0.34 +
        Math.sin((x + y) * 0.74 + time * 1.3) * 0.28;
      const horizonLift = THREE.MathUtils.smoothstep(y, 1.5, 8.5) * 0.72;

      positions[index + 2] = ridge + horizonLift;
    }

    terrainGeometry.attributes.position.needsUpdate = true;
    mesh.current.position.z = -2.1 + Math.sin(clock.elapsedTime * 0.16) * 0.16;
  });

  return (
    <mesh ref={mesh} geometry={geometry} rotation={[-Math.PI / 2.35, 0, 0]} position={[0, -2.1, -3.4]}>
      <meshBasicMaterial
        color="#ff2435"
        wireframe
        transparent
        opacity={isMobile ? 0.42 : 0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function ParticleField({ isMobile }: CyberSceneProps) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = isMobile ? 260 : 720;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const red = new THREE.Color("#ff2335");
    const deepRed = new THREE.Color("#7a050b");

    for (let index = 0; index < count; index += 1) {
      const edgeBias =
        seededRandom(index + 1) < 0.34
          ? Math.sign(seededRandom(index + 101) - 0.5) * (5.2 + seededRandom(index + 201) * 4.6)
          : (seededRandom(index + 301) - 0.5) * 11;
      positions[index * 3] = edgeBias;
      positions[index * 3 + 1] = -0.95 + seededRandom(index + 401) * 5.3;
      positions[index * 3 + 2] = -11 + seededRandom(index + 501) * 10.5;

      const color = deepRed.clone().lerp(red, 0.42 + seededRandom(index + 601) * 0.58);
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    buffer.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return buffer;
  }, [isMobile]);

  useFrame(({ clock }) => {
    if (!points.current) return;

    points.current.rotation.y = Math.sin(clock.elapsedTime * 0.09) * 0.04;
    points.current.position.y = Math.sin(clock.elapsedTime * 0.32) * 0.12;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={isMobile ? 0.032 : 0.024}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function NetworkWeb({ isMobile, side }: CyberSceneProps & { side: "left" | "right" }) {
  const group = useRef<THREE.Group>(null);
  const { nodeGeometry, lineGeometry } = useMemo(() => {
    const nodeCount = isMobile ? 24 : 46;
    const nodes: THREE.Vector3[] = [];
    const sign = side === "left" ? -1 : 1;
    const seedOffset = side === "left" ? 1000 : 2000;

    for (let index = 0; index < nodeCount; index += 1) {
      nodes.push(
        new THREE.Vector3(
          sign * (4.7 + seededRandom(seedOffset + index) * 5.2),
          -0.6 + seededRandom(seedOffset + index + 100) * 5.2,
          -8.5 + seededRandom(seedOffset + index + 200) * 6.8,
        ),
      );
    }

    const nodePositions = new Float32Array(nodes.length * 3);
    nodes.forEach((node, index) => node.toArray(nodePositions, index * 3));

    const linePositions: number[] = [];
    nodes.forEach((node, index) => {
      const limit = isMobile ? 2 : 3;
      let connected = 0;

      for (let otherIndex = index + 1; otherIndex < nodes.length && connected < limit; otherIndex += 1) {
        const other = nodes[otherIndex];

        if (node.distanceTo(other) < 2.55) {
          linePositions.push(node.x, node.y, node.z, other.x, other.y, other.z);
          connected += 1;
        }
      }
    });

    const dots = new THREE.BufferGeometry();
    dots.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));

    const lines = new THREE.BufferGeometry();
    lines.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));

    return { nodeGeometry: dots, lineGeometry: lines };
  }, [isMobile, side]);

  useFrame(({ clock }) => {
    if (!group.current) return;

    const direction = side === "left" ? 1 : -1;
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.18) * 0.025 * direction;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.2 + direction) * 0.12;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#ff2335" transparent opacity={0.28} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <points geometry={nodeGeometry}>
        <pointsMaterial size={isMobile ? 0.065 : 0.052} color="#ff3342" transparent opacity={0.98} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

function DataRain({ isMobile }: CyberSceneProps) {
  const lines = useRef<THREE.LineSegments>(null);
  const count = isMobile ? 28 : 74;
  const drops = useMemo(() => {
    const positions = new Float32Array(count * 6);
    const speeds = new Float32Array(count);
    const heights = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
      const x = (seededRandom(index + 3000) - 0.5) * 13;
      const z = -11.5 + seededRandom(index + 3100) * 5;
      const y = -0.8 + seededRandom(index + 3200) * 5.7;
      const height = 0.8 + seededRandom(index + 3300) * 2.4;

      positions[index * 6] = x;
      positions[index * 6 + 1] = y;
      positions[index * 6 + 2] = z;
      positions[index * 6 + 3] = x;
      positions[index * 6 + 4] = y + height;
      positions[index * 6 + 5] = z;
      speeds[index] = 0.08 + seededRandom(index + 3400) * 0.2;
      heights[index] = height;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry, speeds, heights };
  }, [count]);

  useFrame(({ clock }) => {
    if (!lines.current) return;

    const rainGeometry = lines.current.geometry;
    const position = rainGeometry.attributes.position.array as Float32Array;

    for (let index = 0; index < count; index += 1) {
      const offset = index * 6;
      const speed = drops.speeds[index];
      const height = drops.heights[index];
      const base = -1.1 + ((clock.elapsedTime * speed + index * 0.137) % 1) * 6.3;

      position[offset + 1] = base;
      position[offset + 4] = base + height;
    }

    rainGeometry.attributes.position.needsUpdate = true;
    lines.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.02;
  });

  return (
    <lineSegments ref={lines} geometry={drops.geometry}>
      <lineBasicMaterial color="#ff1f31" transparent opacity={isMobile ? 0.26 : 0.34} blending={THREE.AdditiveBlending} depthWrite={false} />
    </lineSegments>
  );
}

function RedPlanet({ isMobile }: CyberSceneProps) {
  const planet = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!planet.current) return;

    planet.current.rotation.y = clock.elapsedTime * 0.035;
    planet.current.position.y = 3.45 + Math.sin(clock.elapsedTime * 0.18) * 0.08;
  });

  return (
    <group ref={planet} position={[isMobile ? 4.7 : 5.6, 3.45, -6.6]}>
      <mesh>
        <sphereGeometry args={[isMobile ? 1.45 : 2.25, 48, 32]} />
        <meshStandardMaterial color="#190205" emissive="#8d0711" emissiveIntensity={0.85} roughness={0.92} metalness={0.08} />
      </mesh>
      <mesh scale={1.13}>
        <sphereGeometry args={[isMobile ? 1.45 : 2.25, 48, 32]} />
        <meshBasicMaterial color="#ff2435" transparent opacity={0.14} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
      </mesh>
      <mesh position={[-0.42, 0.2, 0.42]} scale={[0.98, 1.03, 0.98]}>
        <sphereGeometry args={[isMobile ? 1.47 : 2.28, 48, 32]} />
        <meshBasicMaterial color="#ff3342" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 720px)");
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}
