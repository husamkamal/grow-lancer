import { Button, Grid } from '@mui/material';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import ClientImg from '../../assets/client.png';

function JoinFreelance() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const anim = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          backgroundImage: 'linear-gradient(280deg,#0e33b6 0%,#0F1B63 300%)',
        },
        {
          // eslint-disable-next-line max-len
          backgroundImage: 'linear-gradient(90deg, rgba(6,2,78,1) 0%, rgba(14,51,182,1) 24%, rgba(255,255,255,1) 100%)',
          duration: 1.5,
          delay: 0.5,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top center',
            end: 'bottom center',
          },
        },
      );
      gsap.fromTo(
        '.join-freelance-img',
        {
          x: 1000,
          scale: 0,
        },
        {
          x: 0,
          scale: 1,
          ease: 'slow',
          delay: 0.5,
          duration: 1.5,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top center',
            end: 'bottom center',
          },
        },
      );
      gsap.fromTo(
        '.join-freelance-heading',
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3',
          delay: 1,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top center',
            end: 'bottom center',
          },
        },
      );
      gsap.fromTo(
        '.join-freelance-button',
        {
          scale: 0,
        },
        {
          scale: 1,
          duration: 0.4,
          ease: 'sine',
          delay: 2,
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
    <div className="join-freelance" ref={ref}>
      <Grid
        overflow="hidden"
        container
        direction="row-reverse"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid xs={8} sm={6} md={4} item>
          <img
            className="join-freelance-img"
            src={ClientImg}
            width="100%"
            alt=""
          />
        </Grid>
        <Grid xs={8} sm={8} md={4} item>
          <div
            className="join-freelance-content"
            style={{ textAlign: 'center' }}
          >
            <h2
              className="join-freelance-heading"
            >
              Are You looking for
              a job?
            </h2>
            <Link to="/jobs-search">
              <Button
                className="join-freelance-button"
                variant="contained"
                style={{
                  backgroundColor: '#fff',
                  color: '#1C3879',
                  padding: '.6rem 2.4rem',
                  marginTop: '30px',
                  fontSize: '20px',
                }}
              >
                Apply Now
              </Button>

            </Link>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default JoinFreelance;
