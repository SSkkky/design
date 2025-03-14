import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedText = ({ text }) => {
    const textRef = useRef([]);

    useEffect(() => {
        const letters = textRef.current;

        gsap.fromTo(letters,
            {
                opacity: 0,
                y: 20,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1, // 각 글자의 애니메이션 지연 시간
                ease: 'power2.out',
            }
        );
    }, [text]);

    return (
        <div>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    ref={(el) => textRef.current[i] = el}
                    style={{ display: 'inline-block' }}
                >
                    {char}
                </span>
            ))}
        </div>
    );
};

export default AnimatedText;
