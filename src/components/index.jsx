import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import myPic from 'assets/image/gom.jpg';
import './index.scss';
import data from 'data/data.json';

const Main = (props) => {
    const { sectionRefs, ScrollTrigger, gsap } = props;
    const [onMouseCover, setMouseCover] = useState(false);
    const mainRef = useRef(null);
    const titleRef = useRef(null);
    const subTitleRef = useRef(null);
    const introRef = useRef(null);
    const dataIndex = 0;

    useEffect(() => {
        const main = mainRef.current;
        const title = titleRef.current;

        gsap.fromTo(
            title,
            {
                y: 0,
                opacity: 1,
            },
            {
                y: '20vh',
                opacity: 0,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: main,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    useEffect(() => {
        if (mainRef && mainRef.current) sectionRefs.current[dataIndex] = mainRef.current;
    }, [mainRef]);

    const handleMouseOverCover = () => {
        !onMouseCover && setMouseCover(true);
    }

    const handleMouseOutCover = () => {
        onMouseCover && setMouseCover(false);
    }

    const handleClickNextButton = () => {
        gsap.to(window, { duration: 1, scrollTo: ".scrollSection.skills" });
    }

    return (
        <section className="scrollSection main" ref={mainRef} data-index={dataIndex}>
            <b className="main-title" ref={titleRef}>dev.</b>
            <article className='sub-title' ref={subTitleRef}>
                <p>2024-25</p>
                <p>DEVELOP</p>
                <p>WEB PORTFOLIO</p>
            </article>
            <section className='Introduction' ref={introRef}>
                <article>
                    <b>HELLO WORLD!</b>
                    <section>
                        <p>안녕하세요! 저는 1년 차 웹 프론트엔드 개발자이자 웹 퍼블리셔로 활동 중인 손하늘입니다. </p>
                        <p>웹 사이트와 웹 애플리케이션 개발에 대한 열정으로, 직관적이고 반응형인 디자인을 구현하는 데 집중하고 있습니다.</p>
                    </section>
                </article>
                <img src={myPic} alt='image' />
                <section className={`cover ${onMouseCover ? 'mouseOver' : ''}`}
                    onMouseOver={handleMouseOverCover}
                    onMouseOut={handleMouseOutCover}
                >
                    <button onClick={handleClickNextButton}><FontAwesomeIcon className='menuClose' icon={faArrowRight} /></button>
                </section>
            </section>
        </section>
    )
}

const Skills = (props) => {
    const { sectionRefs, activeMenu, ScrollTrigger, gsap } = props;

    const mainRef = useRef(null);
    const contentsRef = useRef(null);
    const liRefs = useRef([]);
    const dataIndex = 1;
    
    useEffect(() => {
        const main = mainRef.current;
        const contents = contentsRef.current;
        const list = liRefs.current;

        list.forEach((item, index) => {
            gsap.fromTo(item, 
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.2,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                        once: true,
                        delay: index * 0.2
                    }
                }
            );

            item.addEventListener('mouseenter', () => {
                gsap.to(item, { x: 10, y: -40, duration: 0.2 });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, { x: 0, y: 0, duration: 0.2 });
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [])

    useEffect(() => {
        if (mainRef && mainRef.current) sectionRefs.current[dataIndex] = mainRef.current;
    }, [mainRef]);

    return (
        <section
            className={`scrollSection skills ${activeMenu === dataIndex ? 'onSkills' : ""}`}
            ref={mainRef}
            data-index={dataIndex}
        >
            <ul className='contents' ref={contentsRef}>
               {data.skills.map((data, i)=>(
                 <li
                 key={i}
                 ref={(el) => liRefs.current[i] = el}
                 >
                 <section>
                     <b>{data.name}</b>
                     {data.topics.map((topic, i)=> (
                        <p key={i}>{topic}</p>
                    ))}
                 </section>
             </li>
               ))
               }
            </ul>
        </section>
    )
}

const Works = (props) => {
    const { sectionRefs, activeMenu, ScrollTrigger, gsap } = props;

    const mainRef = useRef(null);
    const contentsRef = useRef(null);
    const dataIndex = 2;

    useEffect(() => {
        const main = mainRef.current;
        const contents = contentsRef.current;

        gsap.fromTo(
            main,
            {
                backgroundColor: 'rgba(0,0,0,0)',
            },
            {
                backgroundColor: 'rgba(0,0,0,1)',
                ease: 'power2.out',
                duration: 0.5,
                scrollTrigger: {
                    trigger: main,
                    start: 'top 90%',
                    end: 'bottom top',
                    scrub: true,
                    pin: true,
                    pinSpacing: true,
                },
            }
        )

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [])

    useEffect(() => {
        if (mainRef && mainRef.current) sectionRefs.current[dataIndex] = mainRef.current;
    }, [mainRef]);

    return (
        <section
            className={`scrollSection works ${activeMenu === dataIndex ? 'onWorks' : ""}`}
            ref={mainRef}
            data-index={dataIndex}
        >
            <ul ref={contentsRef}>
                <li>2024 피터패트</li>
                <li>2024 개인작</li>
                <li>2020 제우메디컬</li>
                <li>2018 미스크</li>
            </ul>
            <section className='bg'></section>
        </section>
    )
}

const Contect = (props) => {
    const { sectionRefs } = props;
    const mainRef = useRef(null);
    const dataIndex = 3;

    useEffect(() => {
        if (mainRef && mainRef.current) sectionRefs.current[dataIndex] = mainRef.current;
    }, [mainRef]);

    return (
        <section className="scrollSection"
            ref={mainRef}
            data-index={dataIndex}
        >
            <b>Contect</b>
            <p>sonhaneul96@gmail.com</p>
            <p>01075691925</p>
            <p>GITHUB</p>
            <p>VELOG</p>
        </section>
    )
}

export const Index = (props) => {

    return (
        <main className='index'>
            <Main {...props} />
            <Skills {...props} />
            <Works {...props} />
            <Contect {...props} />
        </main>
    )
}

export default Index;