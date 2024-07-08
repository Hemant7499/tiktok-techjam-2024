import React from "react";
import { useEffect, useState,useRef } from 'react';
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation"
import { PostMainCompTypes } from "../types";
import { gsap, TimelineMax, Power2 } from 'gsap';
import 'app/globals.css';

function AdCard({ post }: { post: PostMainCompTypes['post'] }) {
  const [swiperDragged, setSwiperDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const unlockRef = useRef(null);
  const swipeBtnRef = useRef(null);
  const router = useRouter()
  useEffect(() => {
    const tl = new TimelineMax({ repeat: -1 });
    tl.staggerFrom(
      '#dotted-line circle',
      0.7,
      { scale: 0.7, x: -2, y: 0.5, opacity: 0.7, delay: 0.1, ease: Power2.easeInOut, repeat: 1, yoyo: true },
      0.15
    );

    gsap.set('#swipe-arrow', { x: 16, y: 11 });
    gsap.set('#swipe-end', { x: 235, y: 12 });

    const handleMouseMove = (e: { pageX: any; touches: { pageX: any; }[]; }) => {
      if (swiperDragged) {
        const actualX = typeof e.pageX !== 'undefined' ? e.pageX : e.touches[0].pageX;
        const newEndX = Math.max(0, Math.min(215, actualX - startX));
        setEndX(newEndX);
        gsap.to(swipeBtnRef.current, { x: newEndX });
      }
    };

    const handleMouseUp = () => {
      router.push(`/product/${post?.product_id}`)
      if (swiperDragged) {
        setSwiperDragged(false);
        if (endX < 200) {
          gsap.to(swipeBtnRef.current, { x: 0 });
        } else {
          gsap.to(swipeBtnRef.current, { x: 215 });
          if (unlockRef.current) {
            unlockRef.current.classList.add('unlocked');
          }
          setTimeout(() => {
            gsap.to(swipeBtnRef.current, { x: 0 });
            if (unlockRef.current) {
              unlockRef.current.classList.remove('unlocked');
            }
          }, 1400);
        }
        setEndX(0);
      }
    };
    let adcard = document.getElementById(`ad-${post?.id}`);
    adcard?.addEventListener('mousemove', handleMouseMove);
    adcard?.addEventListener('touchmove', handleMouseMove);
    adcard?.addEventListener('mouseup', handleMouseUp);
    adcard?.addEventListener('touchend', handleMouseUp);

    return () => {
      adcard?.removeEventListener('mousemove', handleMouseMove);
      adcard?.removeEventListener('touchmove', handleMouseMove);
      adcard?.removeEventListener('mouseup', handleMouseUp);
      adcard?.removeEventListener('touchend', handleMouseUp);
    };
  }, [swiperDragged, startX, endX]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setSwiperDragged(true);
    const newStartX = typeof e.pageX !== 'undefined' ? e.pageX : e.touches[0].pageX;
    setStartX(newStartX);
    setEndX(0);
  };

  return (
    <div id={`ad-${post?.id}`} className="swiper">
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="260px" height="45px">
        <g id="dotted-line" className="dotted-line">
          <circle cx="40" cy="22" r="3"></circle>
          <circle cx="60" cy="22" r="3"></circle>
          <circle cx="80" cy="22" r="3"></circle>
          <circle cx="100" cy="22" r="3"></circle>
          <circle cx="120" cy="22" r="3"></circle>
          <circle cx="140" cy="22" r="3"></circle>
          <circle cx="160" cy="22" r="3"></circle>
          <circle cx="180" cy="22" r="3"></circle>
          <circle cx="200" cy="22" r="3"></circle>
          <circle cx="220" cy="22" r="3"></circle>
        </g>
        <path id="swipe-end" className="swipe-end" d="M9.000,1.000 C13.418,1.000 17.000,4.582 17.000,9.000 C17.000,13.418 13.418,16.999 9.000,16.999 C4.582,16.999 1.000,13.418 1.000,9.000 C1.000,4.582 4.582,1.000 9.000,1.000 Z" />
        <a
          id="swipe-btn"
          className="swipe-btn"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          ref={swipeBtnRef}
        >
          <g>
            <path
              fillRule="evenodd"
              className="circle"
              d="M22.000,0.001 C34.150,0.001 44.000,9.850 44.000,22.000 C44.000,34.150 34.150,44.000 22.000,44.000 C9.850,44.000 0.000,34.150 0.000,22.000 C0.000,9.850 9.850,0.001 22.000,0.001 Z"
            />
            <path
              id="swipe-arrow"
              className="arrow"
              fillRule="evenodd"
              d="M12.551,8.707 L5.256,1.412 C4.270,0.426 2.672,0.426 1.686,1.412 C0.701,2.398 0.701,3.996 1.686,4.981 L7.197,10.492 L1.686,16.003 C0.701,16.988 0.701,18.587 1.686,19.572 C2.672,20.558 4.270,20.558 5.256,19.572 L12.551,12.276 C13.537,11.292 13.537,9.693 12.551,8.707 Z"
            />
          </g>
        </a>
      </svg>
      <div className="unlock" ref={unlockRef}>Swipe to know more</div>
    </div>
  );
};
export default AdCard;


  


