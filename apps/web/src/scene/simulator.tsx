import { OrbitControls, Grid, ContactShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export default function Simulador() {
    return (
        <div className="w-full h-screen bg-zinc-800">
            <Canvas camera={{position: [3,4,4], fov: 50}}>
                <OrbitControls makeDefault/>
                <ambientLight intensity={0.9}/>
                
                <directionalLight position={[5,10,2]} intensity={1.5}/>
                <directionalLight position={[1,2,8]} intensity={1.8}></directionalLight>
                
                <Grid 
                    position={[0, -0.5, 0]} 
                    infiniteGrid
                    fadeDistance={100} 
                    sectionColor="#777" 
                    cellColor="#111" 
                />
                <ContactShadows position={[0,-0.5,0]} opacity={1} scale={10} blur={2} far={4} />

                <group>
                    
                </group>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[2,1,3]} />
                    <meshStandardMaterial 
                        color="#3b82f6" 
                        metalness={0.5} 
                        roughness={0.2}
                    />
                </mesh>
            </Canvas>
        </div>
    )
}