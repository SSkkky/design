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

    const mainTimeline = useRef(null);
    const mainRef = useRef(null);
    const mainWrapperRef = useRef(null);
    const titleRef = useRef(null);
    const helloTextRef = useRef([]);
    const jobTextRef = useRef([]);
    const job1TextAniRef = useRef(null);
    const job2TextAniRef = useRef(null);
    const job3TextAniRef = useRef(null);
    const dataIndex = 0;

    useEffect(() => {
        let mainTl = mainTimeline.current;
        const main = mainRef.current;
        const title = titleRef.current;
        const [helloTexts, helloText1, helloText2, helloText3] = helloTextRef.current;
        const [jobTexts, jobText1, jobText2, jobText3] = jobTextRef.current;

        if (main) {
            mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: main,
                    start: "0 0",
                    end: "+=300%",
                    pin: true,
                    anticipatePin: 1,
                    scrub: 0.5,
                    toggleActions: "restart none none reverse", // 조건 변경
                    ease: "power2.out",
                },
            })
        }

        // 시작시 제목 애니메이션
        mainTl.fromTo(title,
            {
                position: "absolute",
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: "12vw"
            },
            {
                top: '15vw',
                fontSize: "5vw",
                duration: 0.3,
            },
            0
        );

        // 왼쪽으로 타이틀 이동
        mainTl.to(title,
            {
                color: "red",
                top: '19vw',
                left: '26vw',
                duration: 0.1,
            },
            0.3 // 이전 duration 종료 후
        );
        mainTl.fromTo(helloTexts,
            {
                position: 'absolute',
                left: '10vw',
                top: '20vw',
                opacity: 0,
            },
            {
                top: '10vw',
                opacity: 1,
                duration: 0.1,
            },
            0.3
        );
        mainTl.fromTo(helloText1,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 0.1,
            },
            0.3
        );
        mainTl.fromTo(helloText2,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 0.1,
            },
            0.35
        );
        mainTl.fromTo(helloText3,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 0.1,
            },
            0.4
        );


        // 직업 1 텍스트 등장
        mainTl.to(title,
            {
                color: "green",
                duration: 0.3,
            },
            0.4
        );
        mainTl.fromTo(jobTexts,
            {
                position: 'absolute',
                left: '10vw',
                top: '50vw',
                opacity: 0,
            },
            {
                top: '30vw',
                opacity: 1,
                duration: 0.1,
            },
            0.4
        );
        if (job1TextAniRef.current) {
            job1TextAniRef.current.createAnimation(mainTl, 0.4);
        }
        mainTl.to(jobText1,
            {
                y: '-=20',
                opacity: 0,
                duration: 0.1,
            },
            0.85
        );

        mainTl.to(title,
            {
                color: "blue",
                duration: 0.3,
            },
            0.7 // 이전 duration 종료 후
        );
        mainTl.to(jobTexts,
            {
                top: '18vw',
                duration: 0.05,
            },
            1
        );
        if (job2TextAniRef.current) {
            job2TextAniRef.current.createAnimation(mainTl, 1);
        }
        mainTl.fromTo(jobText2,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 0.05,
            },
            1
        );


        mainTl.to(jobText2,
            {
                y: '-=20',
                opacity: 0,
                duration: 0.1,
            }, 1.5
        );
        mainTl.to(jobTexts,
            {
                top: '6vw',
                duration: 0.05,
            },
            1.6
        );
        if (job3TextAniRef.current) { // Designer
            job3TextAniRef.current.createAnimation(mainTl, 1.6);
        }
        mainTl.fromTo(jobText3,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 0.05,
            },
            1.5
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            mainTl.kill();
        };
    }, []);

    useEffect(() => {
        if (mainRef && mainRef.current) sectionRefs.current[dataIndex] = mainRef.current;
    }, [mainRef]);

    return (
        <section className="scrollSection main" ref={mainRef} data-index={dataIndex}>
            <b className="main-title" ref={titleRef}>haneul.</b>
            <section className='bottomSec-ani-text'
                ref={(el) => helloTextRef.current[0] = el}>
                <p ref={(el) => helloTextRef.current[1] = el}>HELLO,</p>
                <p ref={(el) => helloTextRef.current[2] = el}>I'M</p>
                <p ref={(el) => helloTextRef.current[3] = el}>A CREATIVE</p>
            </section>
            <section className="bottomSec-ani-job" ref={(el) => jobTextRef.current[0] = el}>
                <div className="cover" ref={(el) => jobTextRef.current[1] = el}>
                    <AnimatedText
                        text={"Developer"}
                        ref={job1TextAniRef}
                        size='10vw'
                        duration={0.07}
                        stagger={0.05}
                    />
                </div>
                <div className="cover" ref={(el) => jobTextRef.current[2] = el}>
                    <AnimatedText
                        text={"Publisher"}
                        ref={job2TextAniRef}
                        size='10vw'
                        duration={0.07}
                        stagger={0.05}
                    />
                </div>
                <div className="cover" ref={(el) => jobTextRef.current[3] = el}>
                    <AnimatedText
                        text={"Designer"}
                        ref={job3TextAniRef}
                        size='10vw'
                        duration={0.07}
                        stagger={0.05}
                    />
                </div>
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
    const mainTimeline = useRef(null);
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
        let mainTl = mainTimeline.current;
        const main = mainRef.current;
        const line = lineRef.current;
        const title = titleRef.current;
        const titleText = title.children[0];
        const lists = listRef.current;
        const ulist = ulistRef.current;

        if (main) {
            mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: main,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.5,
                    toggleActions: "restart none none reverse",
                    ease: "power2.out",
                },
            })
        }

        mainTl.fromTo(ulist,
            {
                opacity: 0,
                transform: "translateY(10vw)",
            },
            {
                opacity: 1,
                transform: "translateY(0)",
                duration: 0.5,
            },
            0
        );

        mainTl.fromTo(line,
            {
                transform: "scaleX(0)",
            },
            {
                transform: "scaleX(1)",
                duration: 0.5,
            },
            0.5
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