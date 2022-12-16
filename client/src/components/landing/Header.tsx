import { Grid, Button } from '@mui/material';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/hero.png';

function Header() {
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.header-img',
        {
          scale: 0,
        },
        {
          scale: 1,
          duration: 1.5,
          ease: 'power3',
        },
      );
      gsap.fromTo(
        '.header-content-heading',
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power4',
          delay: 1.2,
        },
      );
      gsap.fromTo(
        '.header-content-button',
        {
          scale: 0,
        },
        {
          scale: 1,
          ease: 'slow',
          delay: 1.6,
        },
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header id="header" ref={headerRef}>
      <Grid
        overflow="hidden"
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid xs={8} sm={6} md={5} item>
          <img className="header-img" src={heroImg} width="100%" alt="" />
        </Grid>
        <Grid xs={8} sm={8} md={4} item>
          <div className="header-content">
            <h2
              className="header-content-heading"
            >
              The Easiest Way
              <br />
              to Get Your New Job
            </h2>
            <Link to="/signup">

              <Button
                className="header-content-button"
                variant="contained"
                style={{
                  backgroundColor: '#1C3879',
                  padding: '.8rem 3rem',

                }}
              >
                Join Us Now
              </Button>
            </Link>

          </div>
        </Grid>
      </Grid>
    </header>
  );
}

export default Header;
