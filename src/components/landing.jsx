import React from "react";
// import "../app.css";
import { Link, useNavigate } from "react-router-dom";
export default function Landing() {

    const [loading, setLoading] = React.useState(false);
    const Navigate = useNavigate(); 
    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Navigate('/user_agent');
        },1000);
    };
return (
    <div className="flex flex-col h-screen ">
        <style
            rel="stylesheet"
            dangerouslySetInnerHTML={{
                __html:
                    "\n    .Header__shape {\n animation-duration: 5s;\n  animation-timing-function: cubic-bezier(.18,1.17,.03,1.46);\n  animation-iteration-count:infinite;\n animation-fill-mode: backwards;\n  transform-origin: center;\n  transform-box: fill-box;\n}\n\nbody {\n  background: white;\n  background-position: 0 0, 25px 25px;\n  background-size:25px 25px;\n  min-height: 100vh;\n}\n\n.Header {\n  position: relative;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.Header__svg {\n  position: absolute;\n  width: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: -1;\n  will-change: transform;\n}\n.Header__title {\n  font-family: Avenir, Futura, 'Open Sans', 'Gill Sans', 'Helvetica Neue', Ariel, sans-serif;\n  font-weight: bold;\n  font-size: 6vw;\n  margin: 0;\n}\n\n.bigSquare {\n  animation-name: bigSquare;\n}\n@keyframes bigSquare {\n  from { transform: translateY(10%) rotate(-80deg) scale(0); }\n  to { transform: translateY(0) rotate(0deg) scale(1); }\n}\n.littleSquare {\n  animation-name: littleSquare;\n}\n@keyframes littleSquare {\n  from { transform: translate(226%, 183%) rotate(140deg) scale(0) ; }\n  to { transform: translate(0%, 0%) rotate(0deg) scale(1); }\n}\n.triangle {\n  animation-name: triangle;\n}\n@keyframes triangle {\n  from { transform: rotate(-140deg) scale(0) ; }\n  to { transform: rotate(0deg) scale(1); }\n}\n.hoop {\n  animation-name: hoop;\n}\n@keyframes hoop {\n  from { transform: translate(-160%, -33%) scale(0) ; }\n  to { transform: translate(0%, 0%) scale(1); }\n}\n.bigCircle {\n  animation-name: bigCircle;\n}\n@keyframes bigCircle {\n  from { transform: scale(0) translate(60%, 3%); }\n  to { transform: scale(1) translate(0%, 0%); }\n}\n.littleCircle {\n  animation-name: littleCircle;\n}\n@keyframes littleCircle {\n  from { transform: scale(0) }\n  to { transform: scale(1) }\n}\n\n@for $i from 1 to 12 {\n  .Header__shape:nth-child(#{$i}) { \n    animation-delay: $i * 0.16s;\n  }\n}\n    \nbody {\n  margin:0;\n}\n.container {\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}    \n.shadows {\n    position: relative;\n    text-transform: uppercase;\n    text-shadow: -15px 5px 20px BLACK;\n    color: GREEN;\n    letter-spacing: -0.05em;\n    font-family: 'Anton', Arial, sans-serif;\n    user-select: none;\n    text-transform: uppercase;\n    font-size: 10vw;\n    transition: all 0.25s ease-out;\n}\n\n@media (max-width: 768px) {\n  .shadows {\n    font-size: 8vw;\n  }\n  .Header__title {\n    font-size: 10vw;\n  }\n}\n\n@media (max-width: 480px) {\n  .shadows {\n    font-size: 12vw;\n  }\n  .Header__title {\n    font-size: 14vw;\n  }\n}\n\n    ",
            }}
        />
        <div className="Header flex flex-col ">
            <svg
                className="Header__svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1337.97 684.43"
            >
                <path
                    className="Header__shape triangle"
                    fill="none"
                    stroke="#ff4676"
                    strokeWidth={8}
                    d="M372.15 462.17L321 434.58l-4.88 56.16z"
                />
                <circle
                    className="Header__shape bigCircle shadow-lg shadow-black"
                    fill="#ff4676"
                    cx="1076.52"
                    cy="262.17"
                    r={59}
                />
                <path
                    className="Header__shape littleSquare"
                    fill="#ffe430"
                    d="M285.523 262.61l12.372-53.59 53.59 12.372-12.372 53.59z"
                />
                <circle
                    className="Header__shape hoop"
                    fill="none"
                    stroke="#ffe430"
                    strokeWidth={13}
                    cx="905.52"
                    cy="447.17"
                    r={45}
                />
                <circle
                    className="Header__shape littleCircle"
                    fill="#0f1c70"
                    cx="1036.52"
                    cy="203.17"
                    r={27}
                />
            </svg>
            <div className="shadows">
                <span>R</span>
                <span>E</span>
                <span>C</span>
                <span>Y</span>
                <span>C</span>
                <span>L</span>
                <span>E</span>
                <span>-</span>
                <span></span>    
                <span>H</span>
                <span>U</span>
                <span>B</span>
            </div>
               
        <div className="flex justify-center mt-12 border w-1/4 md:w-1/6 rounded-md border-black get_started">
        <Link  onClick={handleClick}>
            <button className="md:text-2xl text-md">Get Started</button>
        </Link>
        </div>
        </div>
    </div>
);
}