"use client";

import Link from "next/link";
import { GL } from "./gl";
import { Pill } from "./pill";
import { Button } from "./ui/button";
import { Header } from "./header";
import { useState } from "react";

export function Hero() {
    const [hovering, setHovering] = useState(false);
    return (
        <div className="flex flex-col h-svh justify-between bg-black">
            <GL hovering={hovering} />
            <Header />

            <div className="pb-16 mt-auto text-center relative z-10 text-white">
                <Pill className="mb-6">BUILT FOR PERFORMANCE</Pill>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient text-white">
                    Unlock your <br />
                    <i className="font-light">agency</i> insights
                </h1>
                <p className="font-mono text-sm sm:text-base text-white/60 text-balance mt-8 max-w-[440px] mx-auto">
                    Access comprehensive agency and contact data with intelligent daily limits
                </p>

                <Link className="contents max-sm:hidden" href="/sign-in">
                    <Button
                        size="lg"
                        className="mt-14 px-8 py-6 text-base font-semibold"
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                    >
                        Get Started
                    </Button>
                </Link>
                <Link className="contents sm:hidden" href="/sign-in">
                    <Button
                        className="mt-14 px-6 py-5 text-base font-semibold"
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                    >
                        Get Started
                    </Button>
                </Link>
            </div>
        </div>
    );
}
