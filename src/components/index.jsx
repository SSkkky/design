import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import myPic from 'assets/image/girl.png';
import './index.scss';
import data from 'data/data.json';
import TextAnimationGSAP from 'utils/TextAnimationGSAP';

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
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                        scrub: true,
                    }
                }
            );

            item.addEventListener('mouseenter', () => {
                gsap.to(item, { x: 5, y: -20, duration: 0.1 });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, { x: 0, y: 0, duration: 0.1 });
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
                {data.skills.map((data, i) => (
                    <li
                        key={i}
                        ref={(el) => liRefs.current[i] = el}
                    >
                        <section>
                            <b>{data.name}</b>
                            {data.topics.map((topic, i) => (
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
    const liRefs = useRef([]);
    const dataIndex = 2;

    useEffect(() => {
        const main = mainRef.current;
        const contents = contentsRef.current;

        gsap.fromTo(
            main,
            { backgroundColor: "rgba(0, 0, 0, 0)" }, // 초기 상태 (투명)
            {
                backgroundColor: "rgba(0, 0, 0, 1)", // 중앙에서 불투명
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: main,
                    start: "top bottom", // 화면 하단에서 등장할 때
                    end: "top top",
                    scrub: true,
                },
            }
        );

        gsap.fromTo(
            main,
            { backgroundColor: "rgba(0, 0, 0, 1)" },
            {
                backgroundColor: "rgba(0, 0, 0, 0)",
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: main,
                    start: "bottom 50%", // 스크롤 거의 다함
                    end: "bottom top", // 화면에서 보이지않음(다올림)
                    scrub: true,
                },
            }
        );

        // 📌 컨텐츠 전체 등장 (100vh 지나갈 때)
        // gsap.fromTo(contents, {
        //     y: -40,
        //     opacity: 0,
        // }, {
        //     y: 0,
        //     opacity: 1,
        //     duration: 0.8,
        //     ease: "power2.out",
        //     scrollTrigger: {
        //         trigger: contents,
        //         start: "top 80%", // 100vh 지나기 시작할 때
        //         toggleActions: "play none none none",
        //     },
        // });

        // 🔥 개별 컨텐츠 순차적 등장
        Array.from(contents.children).forEach((content, i) => {
            gsap.fromTo(content,
                {
                    y: -60,
                    scale: 0.8,
                    opacity: 0,
                    rotationX: 20,
                    transformOrigin: "top left",
                },
                {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    rotationY: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: content,
                        start: "top bottom",
                        end: "top center",
                        toggleActions: "play none none reverse",
                        scrub: true, // 부드럽게 변화
                        delay: i * 0.3,
                    },
                }
            );
        })
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
            <section ref={contentsRef} className='contents'>
                {data.works.map((data, i) => (
                    <article key={i} data-index={i}>
                        <section>
                            <b className='year'>{data.year}</b>
                            <section>
                                <p className='name'>{data.name}</p>
                                <p className='position'>{data.position}</p>
                            </section>
                        </section>
                    </article>
                ))
                }
            </section>
            <section className='bg'></section>
        </section>
    )
}

const Contact = (props) => {
    const { gsap, sectionRefs } = props;
    const mainRef = useRef(null);
    const titleRef = useRef(null);
    const ulistRef = useRef(null);
    const listRef = useRef([]);
    const dataIndex = 3;

    useEffect(() => {
        if (mainRef && mainRef.current) sectionRefs.current[dataIndex] = mainRef.current;
    }, [mainRef]);

    useEffect(() => {
        const main = mainRef.current;
        const title = titleRef.current;
        const titleText = title.children[0];
        const lists = listRef.current;
        const ulist = ulistRef.current;

        gsap.fromTo(titleText,
            {
                transform: "translateY(9vw)",
                opacity: 0.5,
            },
            {
                transform: "translateY(0)",
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: main,
                    start: "top center",
                    end: "bottom bottom",
                    toggleActions: "play none none reverse",
                    scrub: true, // 부드럽게 변화
                },
            }
        );

        gsap.fromTo(ulist,
            {
                opacity: 0,
                transform: "translateY(-7vw)",
            },
            {
                transform: "translateY(0)",
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: ulist,
                    start: "top 70%",
                    end: "bottom bottom",
                    toggleActions: "play none none reverse",
                    scrub: true,
                },
            }
        );

    }, [])

    const handleClickIconBtn = (link) => {
        window.open(link, '_blank');
    }

    return (
        <section className="scrollSection contact"
            ref={mainRef}
            data-index={dataIndex}
        >
            <section className='contents'>
                <section className='title' ref={titleRef}>
                    <b>Contact</b>
                </section>
                <ul ref={ulistRef}>
                    {data.contact.slice(0, 2).map((item, i) => (
                        <li key={i}>
                            <p ref={(el) => listRef.current[i] = el}>{item.data}</p>
                        </li>
                    ))}
                    <li className='logos'>
                        {data.contact.slice(2, 4).map((item, i) => (
                            <button ref={(el) => listRef.current[i + 2] = el}
                                onClick={() => handleClickIconBtn(item.data)} className={`logo_${item.name}`} />
                        ))}
                    </li>
                </ul>
            </section>
        </section>
    )
}

export const Index = (props) => {

    return (
        <main className='index'>
            <Main {...props} />
            <Skills {...props} />
            <Works {...props} />
            <Contact {...props} />
        </main>
    )
}

export default Index;