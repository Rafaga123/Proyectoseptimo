import { OrbitControls, Grid, Environment, ContactShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export default function Simulador() {
    return (
        <div className="w-full h-screen bg-zinc-800">
            <Canvas camera={{position: [3,4,4], fov: 50}}>
                <OrbitControls makeDefault/>
                <ambientLight intensity={0.5}/>
                
                <directionalLight position={[5,10,2]} intensity={1.5}/>
                <Environment preset='sunset' />
                <Grid 
                    position={[0, -0.5, 0]} 
                    infiniteGrid 
                    fadeDistance={30} 
                    sectionColor="#555" 
                    cellColor="#333" 
                />
                <ContactShadows position={[0,-0.5,0]} opacity={0.5} scale={10} blur={2} far={4} />

                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial 
                        color="#3b82f6" 
                        metalness={0.4} 
                        roughness={0.6}
                    />
                </mesh>
            </Canvas>
        </div>
    )
}