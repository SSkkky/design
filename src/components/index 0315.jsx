import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import myPic from 'assets/image/girl.png';
import './index.scss';
import data from 'data/data.json';
import AnimatedText from 'utils/TextAnimationGSAP';

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
    const [isAnimating, setIsAnimating] = useState(false); // 스크롤 애니메이션 중인지 여부

    const mainRef = useRef(null);
    const titleRef = useRef(null);
    const contentsRef = useRef(null);
    const liRefs = useRef([]);
    const dataIndex = 2;

    useEffect(() => {
        const main = mainRef.current;
        const title = titleRef.current;
        const contents = contentsRef.current;
        const contact = document.querySelector('.scrollSection.contact');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: main,
                start: "top top", // 섹션이 화면 상단에 닿을 때 시작
                end: "+=300%", // 핀 고정 지속 거리 (스크롤의 300%)
                pin: true, // 배경 고정
                scrub: true, // 스크롤에 따라 애니메이션 진행
                onLeave: () => {
                    console.log('work onLeave')
                    if (isAnimating) return; // 애니메이션 중이면 실행하지 않음
                    setIsAnimating(true); // 애니메이션 시작

                    gsap.to(window, {
                        scrollTo: {
                            y: contact,
                            autoKill: false
                        },
                        duration: 2, // 이동 시간
                        ease: "power2.inOut",
                        onComplete: () => {
                            setIsAnimating(false);
                        }
                    });
                }
            },
        })

        tl.fromTo(contents,
            { opacity: 0, transform: "translateY(50px)" },
            { opacity: 1, transform: "translateY(0)", duration: 1 }
        );

        // 🔥 개별 컨텐츠 순차적 등장
        Array.from(contents.children).forEach((content, index) => {
            tl.fromTo(content,
                {
                    opacity: 0,
                    y: 100
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                }, index * 0.5)
        })

        // contact로 스크롤
        // ScrollTrigger.create({
        //     trigger: contact,
        //     start: "90% bottom", // 90% 지점에 도달 시 활성화
        //     onEnter: () => {
        //         gsap.to(window, {
        //             scrollTo: {
        //                 y: contact,
        //                 autoKill: false  // 사용자의 추가 스크롤 동작 무시
        //             },
        //             duration: 2,
        //             ease: "power2.inOut"
        //         });
        //     }
        // });
    }, [isAnimating])

    useEffect(() => {
        if (mainRef && mainRef.current) sectionRefs.current[dataIndex] = mainRef.current;
    }, [mainRef]);

    return (
        <section
            className={`scrollSection works ${activeMenu === dataIndex ? 'onWorks' : ""}`}
            ref={mainRef}
            data-index={dataIndex}
        >
            <section className='title' ref={titleRef}>
                <section className='my'>
                    <AnimatedText
                        text="MY"
                        start="top 30%"
                        end="top center"
                        size="5vw"
                        duration={0.1}
                        stagger={0.05}
                    />
                </section>
                <section className="works">
                    <AnimatedText
                        text="WORKS"
                        start="top 10%"
                        end="top center"
                        size="5vw"
                        duration={0.1}
                        stagger={0.05}
                    />
                </section>
            </section>
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
    const { gsap, sectionRefs, ScrollTrigger, handleSetActiveMenu } = props;
    const [isAnimating, setIsAnimating] = useState(false); // 스크롤 애니메이션 중인지 여부
    const mainRef = useRef(null);
    const lineRef = useRef(null);
    const titleRef = useRef(null);
    const ulistRef = useRef(null);
    const listRef = useRef([]);
    const dataIndex = 3;

    useEffect(() => {
        if (mainRef && mainRef.current) sectionRefs.current[dataIndex] = mainRef.current;
    }, [mainRef]);

    useEffect(() => {
        const main = mainRef.current;
        const line = lineRef.current;
        const title = titleRef.current;
        const titleText = title.children[0];
        const lists = listRef.current;
        const ulist = ulistRef.current;

        if (!main) return;

        gsap.fromTo(ulist,
            {
                opacity: 0,
                transform: "translateY(10vw)",
            },
            {
                duration: 0.5,
                transform: "translateY(0)",
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: main,
                    start: "top 30%",
                    end: "bottom bottom",
                    toggleActions: "play none none reverse",
                },
            }
        );

        gsap.fromTo(line,
            {
                transform: "scaleX(0)",
            },
            {
                transform: "scaleX(1)",
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: title,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // work로 스크롤
        const works = document.querySelector('.scrollSection.works');
        ScrollTrigger.create({
            trigger: main,
            start: "top 50%",
            onLeaveBack: () => { // 트리거 영역을 벗어날 때
                if (isAnimating) return; // 애니메이션 중이면 실행하지 않음
                setIsAnimating(true); // 애니메이션 시작

                const worksTop = window.innerHeight * 2;

                gsap.to(window, {
                    scrollTo: {
                        y: worksTop,
                        autoKill: false
                    },
                    duration: 3,
                    ease: "power2.inOut",
                    onComplete: () => {
                        setIsAnimating(false);
                    }
                });

                // setTimeout(()=>{
                //     handleSetActiveMenu(3);
                // },1000)
            }
        });

    }, [isAnimating])

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
                    <section className='contact'>
                        <AnimatedText
                            text="CONTACT"
                            start="top 80%"
                            end="bottom center"
                            size="7vw"
                        />
                    </section>
                    <section className="me">
                        <p className='line' ref={lineRef}></p>
                        <AnimatedText
                            text="ME"
                            start="top center"
                            end="bottom 30%"
                            size="7vw"
                        />
                    </section>
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
                                onClick={() => handleClickIconBtn(item.data)} className={`logo_${item.name}`} key={i} />
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