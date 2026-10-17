import Simulador from "../scene/simulator";
import Aside from "../components/Builder/asidebuild";

export default function Builder(){
    return (
        <div className="flex">
            <main className="flex-1 ">
                <Aside/>
                <Simulador/>
            </main>
        </div>
    )
}