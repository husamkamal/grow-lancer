/* eslint-disable max-len */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Category from './Category';
import categoriesList from '../../categoris';

function PopularCategories() {
  gsap.registerPlugin(ScrollTrigger);
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.popular-categories h2',
        {
          y: 70,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top center',
            end: 'bottom center',
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);
  return (
    <div className="container" ref={ref}>
      <div className="popular-categories">
        <h2>Popular Categories</h2>
        <div className="categories">
          {categoriesList.map((c) => (
            <Category
              key={c.name}
              imgUrl={c.url}
              alt={c.name}
              title={c.name}
              desc={c.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularCategories;
