import React from 'react'
// import './Style.css'


export default function Prog() {
    return (
        <section id="progress" className="progress">
            <h2 className='font-mono'>Progress</h2>
            <div id="pro">
                <div id="Code">
                    <button
                        onClick={() => window.open("https://codeforces.com/profile/khfaysal", "_blank")}
                    >
                        Codeforces
                    </button>
                    <a href="https://codeforces.com/profile/khfaysal">
                        <img src="/Img/codeForces.png" alt=""
                        /></a>
                </div>
                <div id="Bee">
                    <button 
                        onClick={() => window.open("https://codeforces.com/profile/khfaysal", "_blank")}
                    >
                        BeeCrowd
                    </button>
                    <br />
                    <a href="https://judge.beecrowd.com/en/profile/892863"
                    ><img src="/Img/beeCrowd.png" alt=""
                        /></a>
                </div>
                <div id="Git">
                    <button onClick={() => window.open("https://github.com/khfaysal", "_blank")}>GitHub</button>
                    <a href="https://github.com/khfaysal"
                    ><img src="/Img/github.png" alt=""
                        /></a>
                </div>
            </div>
        </section>
    )
}
