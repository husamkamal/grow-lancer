import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Hero() {
  const heroRef = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const heroAnimation = gsap.context(() => {
      gsap.fromTo(
        '.hero .hero-container h3',
        {
          y: -400,
          scale: 0.5,
        },
        {
          y: 0,
          scale: 1,
          ease: 'power2',
          duration: 0.8,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top center',
            end: 'bottom center',
          },
        },
      );
      gsap.fromTo(
        '.hero .hero-container p',
        {
          y: 400,
        },
        {
          y: 0,
          ease: 'power2',
          delay: 0.5,
          duration: 0.8,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top center',
            end: 'bottom center',
          },
        },
      );
    }, heroRef);

    return () => heroAnimation.revert();
  }, []);

  return (
    <div className="hero" ref={heroRef}>

      <div className="hero-container">
        <h3>This is our business</h3>
        <p>
          Work with talented people at the most affordable
          price to get the most out of your time and
          cost on a secure platform.s

        </p>
      </div>

    </div>
  );
}

export default Hero;
