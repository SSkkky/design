import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TextAnimationGSAP = (textArray) => {
    const textRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // 텍스트를 개별 span으로 분할
        const text = textRef.current;
        const characters = text.innerText.split('');
        text.innerHTML = '';

        characters.forEach(char => {
            const span = document.createElement('span');
            span.style.display = 'inline-block';
            span.textContent = char;
            span.style.transform = 'translateY(100%)';
            span.style.opacity = '0';
            text.appendChild(span);
        });

        // 애니메이션 적용
        const chars = text.querySelectorAll('span');

        gsap.to(chars, {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                gsap.to(containerRef.current, {
                    overflow: 'visible',
                    delay: 0.5
                });
            }
        });

    }, []);

    return (
        <div>
            <div
                ref={containerRef}
                style={{
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: '500px',
                    height: '80px',
                    background: 'white',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #ddd'
                }}
            >
                <p ref={textRef}>안녕하세요 리액트로 구현한 텍스트 애니메이션입니다.</p>
            </div>
        </div>
    );
};

export default TextAnimationGSAP;