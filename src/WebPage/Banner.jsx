import React from 'react'
import './Style.css'
export default function Baner() {
  return (
    <section id="main">
      <div className="pic">
        <div id="text">
          <h1>Kamrul <br />Hasan Faysal</h1>
          <div id="intro">
            <h3>Frontend <br /><span id="pg">DEVELOPER</span></h3>
          </div>
        </div>
      </div>
      <div id="about">
        <h3>About me...</h3>
        <p>
          I'm a passionate software developer with a strong foundation in Java,
          web development, and embedded systems. Currently, I'm studying
          Software Engineering at DFID International University in Bangladesh. I
          enjoy solving real-world problems through code and constantly strive
          to improve my skills. I've built several projects, including
          Arduino-based systems, Java console applications, and responsive
          front-end interfaces. I'm also actively involved in programming
          contests on platforms like Codeforces and Beecrowd. To track my
          learning journey and share my progress, I contribute to GitHub on a
          daily basis. I'm eager to join a forward-thinking team where I can
          continue to grow and create impactful software solutions.
        </p>
      </div>
    </section>
  )
}
