import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = ({ text, trigger, start, end, size = '1rem' }) => {
    const textRef = useRef([]);

    useEffect(() => {
        const letters = textRef.current.filter(Boolean); // undefined 방지

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger || letters[0],
                start: start || "top 80%",
                end: end || "bottom bottom",
                toggleActions: "play none none reverse",
                scrub: false,
            },
        });

        tl.fromTo(
            letters,
            { opacity: 0.5, y: size },
            { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" }
        );

        ScrollTrigger.refresh();
    }, [text]);

    return (
        <div style={{ display: "inline-block", whiteSpace: "pre-line" }}>
            {text.split("").map((char, i) => {
                if (char === " ") {
                    return (
                        <span key={i}>&nbsp;</span> // 띄어쓰기
                    );
                }
                if (char === "\n") {
                    return <br key={i} />; // 줄바꿈
                }
                return (
                    <span
                        key={i}
                        ref={(el) => (textRef.current[i] = el)}
                        style={{ display: "inline-block", fontSize: size }}
                    >
                        {char}
                    </span>
                );
            })}
        </div>
    );
};

export default AnimatedText;
