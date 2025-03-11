import React, { useState, useEffect, useRef } from 'react';
import { Float } from 'components/containers.jsx';
import { Index } from 'components/index.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const Main = (props) => {
    const sectionRefs = useRef([]);
    const { handleSetActiveMenu } = props;
    const mainProps = { ...props, sectionRefs };

    useEffect(() => {
        console.log('sectionRefs', sectionRefs)
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.3
        };

        const observerCallback = (entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    handleSetActiveMenu(Number(entry.target.dataset.index));
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sectionRefs.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            sectionRefs.current.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        }
    }, []);

    return (
        <div className="App">
            <Index {...mainProps} />
            <Float {...props} />
        </div>
    );
}

export default Main;
