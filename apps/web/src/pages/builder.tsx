import Simulador from "../scene/simulator";

export default function Builder(){
    return (
        <div className="flex">
            <main className="flex-1 ">
                <Simulador/>
            </main>
        </div>
    )
}