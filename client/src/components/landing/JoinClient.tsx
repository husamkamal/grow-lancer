import { Button, Grid } from '@mui/material';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import freelancerImg from '../../assets/freelancer.jpg';

function JoinClient() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const anim = gsap.context(() => {
      gsap.fromTo(
        '.freelancerImg',
        {
          rotate: '-360deg',
          scale: 0,
        },
        {
          rotate: '0',
          scale: 1,
          duration: 1,
          ease: 'power1',
          delay: 0.5,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top center',
            end: 'bottom center',
          },
        },
      );
      gsap.fromTo(
        '.join-client-heading',
        {
          opacity: 0,
          y: 70,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'slow',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top center',
            end: 'bottom center',
          },
        },
      );
      gsap.fromTo(
        '.join-client-button',
        {
          scale: 0,
          y: 70,
        },
        {
          scale: 1,
          y: 0,
          duration: 0.6,
          delay: 1,
          ease: 'slow',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top center',
            end: 'bottom center',
          },
        },
      );
    }, ref);

    return () => anim.revert();
  }, []);
  return (
    <div className="join-client" ref={ref}>
      <Grid
        overflow="hidden"
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid xs={8} sm={6} md={4} item>
          <img
            className="freelancerImg"
            src={freelancerImg}
            width="100%"
            alt=""
          />
        </Grid>
        <Grid xs={8} sm={8} md={4} item>
          <div
            className="join-client-content"
            style={{ textAlign: 'center' }}
          >
            <h2
              className="join-client-heading"
            >
              Looking for a talent
              to hire?
            </h2>
            <Link to="/profile">
              <Button
                className="join-client-button"
                variant="contained"
                style={{
                  backgroundColor: '#1C3879',
                  color: '#fff',
                  padding: '.6rem 2.4rem',
                  marginTop: '30px',
                  fontSize: '20px',
                }}
              >
                POST JOB
              </Button>

            </Link>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default JoinClient;
