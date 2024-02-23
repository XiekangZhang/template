"use client";
import {useEffect, useState} from "react";

export default function MouseMoving() {
    const [position, setPosition] = useState({x: 0, y: 0});

    useEffect(() => {
        function handleMouseMove(event) {
            setPosition({x: event.clientX, y: event.clientY});
        }

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div style={{
            position: 'absolute',
            backgroundColor: 'pink',
            borderRadius: '50%',
            opacity: 0.6,
            transform: `translate(${position.x}px, ${position.y}px)`,
            pointerEvents: 'none',
            left: -20,
            top: -20,
            width: 40,
            height: 40,
        }}/>
    )
}