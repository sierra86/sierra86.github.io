import { useRef, useState, useEffect } from "react";
import {
    useMotionValueEvent,
    useTransform,
    useScroll,
    motion,
} from "framer-motion";

const Sierra86 = () => {
    return (
        <section className="bg-white">
            <Navigation />
            <Hero />
            <div className="grid h-screen place-content-center bg-violet-600 text-sm font-semibold text-white">
                <span>The rest of your website {":)"}</span>
            </div>
        </section>
    );
};

const Hero = () => {
    const targetRef = useRef(null);
    const { scrollY } = useScroll({
        target: targetRef,
    });

    const scale = useTransform(scrollY, [0, 100], [1, 0.9]);
    const rotate = useTransform(scrollY, [0, 100], ["0deg", "60deg"]);
    const opacity = useTransform(scrollY, [0, 50], [1, 0]);
    const logoScale = useTransform(scrollY, [0, 800], [0, 1]);

    const copyOpacity = useTransform(scrollY, [50, 100], [0, 1]);
    const copyY = useTransform(scrollY, [50, 100], ["0%", "-50%"]);

    return (
        <div className="relative z-0 bg-neutral-200">
            <div
                ref={targetRef}
                className="fixed top-0 left-0 right-0 bottom-0 w-100 h-100 overflow-hidden"
            >
                <div className="flex justify-center items-center">
                    <div
                        className="w-1920 h-1080"
                        style={{
                            width: '1920px',
                            height: '1080px',
                            margin: 'auto',
                            position: 'free',
                            top: '50%',
                            right: '50%', // Adjust the right distance as needed
                        }}
                    >
                        <Trippy rotate={rotate} scale={scale} />
                    </div>
                    <div className="h-screen bg-white flex flex-col items-center justify-center ml-12">
                        <Copy opacity={opacity} />
                        <motion.h1
                            className="text-center text-5xl font-black md:text-7xl"
                            style={{ opacity: copyOpacity, y: copyY }}
                        >
                            \SIERRA86
                        </motion.h1>
                        <motion.p
                            className="text-center text-base md:text-lg"
                            style={{ opacity: copyOpacity, y: copyY }}
                        >
                            \Welcome
                        </motion.p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NUM_SECTIONS = 25;
const PADDING = `${100 / NUM_SECTIONS / 2}vmin`;

const generateSections = (count, color, scale, rotate) => {
    if (count === NUM_SECTIONS) {
        return <></>;
    }

    const nextColor = color === "black" ? "white" : "black";

    return (
        <Section rotate={rotate} scale={scale} background={color}>
            {generateSections(count + 1, nextColor, scale, rotate)}
        </Section>
    );
};

const Trippy = ({ rotate, scale }) => {
    const [loopAnimation, setLoopAnimation] = useState(false);

    useEffect(() => {
        // When the scrollY value reaches a certain point, start the animation loop
        if (scrollY.get() >= 100 && !loopAnimation) {
            setLoopAnimation(true);
        }
    }, [scrollY, loopAnimation]);

    return (
        <motion.div
            className="absolute bottom-0 left-0 right-0 overflow-hidden bg-black"
            animate={{ rotate, scale }}
            transition={{ duration: 1.5, repeat: loopAnimation ? Infinity : 0 }}
        >
            {generateSections(0, "black", scale, rotate)}
        </motion.div>
    );
};

const Section = ({ background, scale, children, rotate }) => {
    return (
        <motion.div
            className="relative h-full w-full origin-center"
            style={{
                background,
                scale,
                rotate,
                padding: PADDING,
            }}
        >
            {children}
        </motion.div>
    );
};

const Copy = ({ opacity }) => {
    return (
        <motion.div
            style={{ opacity }}
            // Padding top + 56px to accommodate for navbar height
            className="relative flex h-4/5 flex-col items-center justify-center gap-4 overflow-hidden bg-white p-4 pt-[calc(56px_+_16px)] text-black"
        >
            <h1 className="text-center text-5xl font-black md:text-7xl">
                Sierra86 - React Website
            </h1>
            <p className="text-center text-base md:text-lg">
                Welcome to Sierra86's React website.
            </p>
            {/* Buttons removed */}
            <div className="absolute -left-28 -top-28 h-56 w-56 rotate-45 bg-black" />
            <div className="absolute -bottom-24 -right-24 h-48 w-48 rotate-45 bg-black" />
        </motion.div>
    );
};

const Navigation = () => {
    const { scrollY } = useScroll();

    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 z-10 flex h-[56px] w-full items-center justify-between bg-black px-2 text-white"
        >
            {/* SVG from logoipsum */}
            <svg
                width="50"
                height="39"
                viewBox="0 0 50 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-auto w-10 fill-white"
            >
                <path
                    d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                    stopColor="#000000"
                ></path>
                <path
                    d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                    stopColor="#000000"
                ></path>
            </svg>

            <div className="flex gap-2">
                <button className="px-3 py-1.5 font-semibold uppercase text-white hover:bg-white/20">
                    Sign in
                </button>
                <button className="bg-white px-3 py-1.5 font-semibold uppercase text-black">
                    Sign up
                </button>
            </div>
        </motion.nav>
    );
};

const OverlayLogo = ({ scale }) => {
    return (
        <motion.div
            style={{ scale }}
            className="pointer-events-none absolute inset-0 z-[5] grid place-content-center"
        >
            {/* SVG from logoipsum */}
            <svg
                width="50"
                height="39"
                viewBox="0 0 50 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-auto w-32 fill-white"
            >
                <path
                    d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                    stopColor="#000000"
                ></path>
                <path
                    d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                    stopColor="#000000"
                ></path>
            </svg>
        </motion.div>
    );
};

export default Sierra86;
