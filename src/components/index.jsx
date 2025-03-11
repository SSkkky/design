import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import myPic from 'assets/image/gom.jpg';
import './index.scss';

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
                        <p>현재 웹 사이트와 웹 애플리케이션 개발에 대한 열정을 가지고, UX/UI를 고려한 직관적이고 반응형인 디자인을 구현하는 데 집중하고 있습니다.</p>
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
    const dataIndex = 1;

    useEffect(() => {
        const main = mainRef.current;
        const contents = contentsRef.current;

        // gsap.fromTo(
        //     contents,
        //     {
        //         '--border-color': 'rgba(0,0,0,0)',
        //     },
        //     {
        //         '--border-color': 'rgba(0,0,0,1)',
        //         ease: 'power2.out',
        //         scrollTrigger: {
        //             trigger: main,
        //             start: 'top 50%',
        //             end: 'bottom top',
        //             scrub: true,
        //         },
        //     }
        // );

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
                <li>
                    <section>
                        <b>HTML</b>
                        <p>HTML5 시멘틱 태그 사용</p>
                        <p>접근성을 고려한 웹 페이지 제작</p>
                    </section>
                </li>
                <li>
                    <section>
                        <b>CSS/SCSS</b>
                        <p>flexbox, 가상 클래스 등을 사용한 스타일 작성</p>
                        <p>Sass(SCSS)를 사용한 스타일 관리 및 재사용 가능한 코드 작성</p>
                    </section>
                </li>
                <li>
                    <section>
                        <b>JS/TS</b>
                        <p>ES6+ 문법을 사용하여 인터랙티브한 웹 페이지를 구현</p>
                        <p>타입을 사용한 안전성 보장 경험</p>
                    </section>
                </li>
                <li>
                    <section>
                        <b>React</b>
                        <p>상태 관리 (useState, useReducer)를 통한 데이터 흐름 제어 경험</p>
                        <p>재사용 가능한 UI 컴포넌트를 제작</p>
                    </section>
                </li>
                <li>
                    <section>
                        <b>Next.js</b>
                        <p>SSR을 활용한 최적화 웹서비스 구현 경험</p>
                        <p>API 엔드포인트 생성하여 클라이언트, 서버간 통신 처리</p>
                    </section>
                </li>
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
                scrollTrigger: {
                    trigger: main,
                    start: 'top top',
                    end: 'bottom+=200%',
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