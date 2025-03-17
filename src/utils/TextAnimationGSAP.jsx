import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = forwardRef(({
    text,
    trigger,
    start,
    end,
    size = '1rem',
    duration = 0.3,
    stagger = 0.1
}, ref) => {

    const textRef = useRef([]);

    // 외부로 노출할 함수 정의
    useImperativeHandle(ref, () => ({
        createAnimation: (timeline, position = 0) => {
            const letters = textRef.current.filter(Boolean);

            timeline.fromTo(
                letters,
                { opacity: 0.5, y: size },
                { opacity: 1, y: 0, duration: duration, stagger: stagger, ease: "power2.out" },
                position
            );
        }
    }));

    // 기본적으로 스크롤트리거가 필요할 때 (단독 사용시)
    useEffect(() => {
        const letters = textRef.current.filter(Boolean);

        if (!ref) { // ref 없으면 내부에서 ScrollTrigger로 자체 실행
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
                { opacity: 1, y: 0, duration: duration, stagger: stagger, ease: "power2.out" }
            );
        }

        ScrollTrigger.refresh();
    }, [text]);

    return (
        <div style={{ display: "inline-block", whiteSpace: "pre-line" }}>
            {text.split("").map((char, i) => {
                if (char === " ") {
                    return <span key={i}>&nbsp;</span>;
                }
                if (char === "\n") {
                    return <br key={i} />;
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
});

export default AnimatedText;
