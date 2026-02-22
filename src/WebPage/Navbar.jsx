import React, { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="w-full fixed top-0 left-0 #272b3b backdrop-blur-md text-white z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo / Name */}
                <h1 className="text-2xl md:text-1xl font-light text-white-700 tracking-wide text-black">
                    k<span className="text-red-700">h</span>
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 text-sm font-medium">
                    <li>
                        <a href="#main" className="hover:text-blue-400 transition">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="hover:text-blue-400 transition">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#skills" className="hover:text-blue-400 transition">
                            Skills
                        </a>
                    </li>
                    <li>
                        <a href="#progress" className="hover:text-blue-400 transition">
                            Progress
                        </a>
                    </li>
                    <li>
                        <a href="#cont" className="hover:text-blue-400 transition">
                            Contact
                        </a>
                    </li>
                </ul>

                {/* Mobile Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-2xl"
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-black/95 px-6 pb-4">
                    <ul className="flex flex-col gap-4 text-sm font-medium">
                        <li>
                            <a href="#main" onClick={() => setOpen(false)}>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#about" onClick={() => setOpen(false)}>
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#skills" onClick={() => setOpen(false)}>
                                Skills
                            </a>
                        </li>
                        <li>
                            <a href="#progress" onClick={() => setOpen(false)}>
                                Progress
                            </a>
                        </li>
                        <li>
                            <a href="#cont" onClick={() => setOpen(false)}>
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}