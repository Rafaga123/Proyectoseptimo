import { useState, type ReactNode } from "react"

interface ObjectsProps {
    name: string;
    type: 'category' | 'component';
    icon?: ReactNode;
    image?: string;
    className?: string;
    onClick?: ()=>void;
}

export function Objects({name, type, icon, image, className, onClick}: ObjectsProps)
{
    return (
        <div className={`p-4 bg-zinc-800/80 rounded-lg cursor-pointer hover:bg-zinc-600 transition text-zinc-200 flex flex-col items-center
        justify-center gap-3 aspect-square ${className}`} onClick={onClick}>
            {type === 'category' && icon && (
                <div className="w-16 h-16 text-zinc-300">
                    {icon}
                </div>
            )}
            
            {type === 'component' && image && (
                <div className="w-32 h-32 bg-zinc-900 rounded flex items-center justify-center overflow-hidden border border-zinc-700">
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                </div>
            )}

            <h3 className="font-semibold text-sm align-text-bottom">{name}</h3>
        </div>
    )
}

export default function Aside()
{
    const [isOpen, setIsOpen] = useState(false);

    const cpuIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0m-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
        </svg>
    );

    const ramIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.586a1 1 0 0 0 .707-.293l.353-.353a.5.5 0 0 1 .708 0l.353.353a1 1 0 0 0 .707.293H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm.5 1h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5m5 0h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5m4.5.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zM2 10v2H1v-2zm2 0v2H3v-2zm2 0v2H5v-2zm3 0v2H8v-2zm2 0v2h-1v-2zm2 0v2h-1v-2zm2 0v2h-1v-2z"/>
        </svg>
    )

    const mbIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="currentColor"  viewBox="0 0 16 16">
            <path d="M11.5 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m-10 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zM5 3a1 1 0 0 0-1 1h-.5a.5.5 0 0 0 0 1H4v1h-.5a.5.5 0 0 0 0 1H4a1 1 0 0 0 1 1v.5a.5.5 0 0 0 1 0V8h1v.5a.5.5 0 0 0 1 0V8a1 1 0 0 0 1-1h.5a.5.5 0 0 0 0-1H9V5h.5a.5.5 0 0 0 0-1H9a1 1 0 0 0-1-1v-.5a.5.5 0 0 0-1 0V3H6v-.5a.5.5 0 0 0-1 0zm0 1h3v3H5zm6.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
            <path d="M1 2a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-2H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 9H1V8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6H1V5H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 2zm1 11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z"/>
        </svg>
    )

    const gpuIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m7.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
            <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .5.5V4h13.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H2v2.5a.5.5 0 0 1-1 0V2H.5a.5.5 0 0 1-.5-.5m5.5 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M9 8a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0"/>
            <path d="M3 12.5h3.5v1a.5.5 0 0 1-.5.5H3.5a.5.5 0 0 1-.5-.5zm4 1v-1h4v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5"/>
        </svg>
    );


    return (
        <>
            <button onClick={() =>setIsOpen(!isOpen)} className={`absolute top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-8 h-24 bg-zinc-900/70 hover:bg-zinc-700/70 text-zinc-300 border border-zinc-900/70 rounded-r-lg transition-all duration-300 shadow-xl cursor-pointer ${
                    isOpen ? 'left-120' : 'left-0'
                }`} title={isOpen ? "Ocultar catálogo" : "Mostrar catálogo"}>
                <svg 
                        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
            </button>
            <aside 
                className={`absolute top-0 left-0 w-120 h-full bg-zinc-900/95 backdrop-blur-sm border-r border-zinc-800 z-40 transition-transform duration-300 shadow-2xl flex flex-col ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="pt-6 text-center">
                    <h2 className="text-2xl font-bold text-white font-sans tracking-wide">Componentes</h2>
                    <div className="grid grid-cols-2 gap-4 p-8 ">
                        <Objects type="category" name="Procesadores (CPU)" icon={cpuIcon}/>
                        <Objects type="category" name="Gráficas (GPU)" icon={gpuIcon}/>
                        <Objects type="category" name="Memoria RAM" icon={ramIcon}/>
                        <Objects type="category" name="Placas Base" icon={mbIcon}/>
                    </div>
                </div>
                
            </aside>
        </>
    )
}