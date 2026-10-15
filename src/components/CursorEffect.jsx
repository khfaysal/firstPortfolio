import { useEffect, useRef } from 'react';

const CursorEffect = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const supportsEffect = window.matchMedia('(pointer: fine)').matches
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!supportsEffect) return undefined;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const follower = { ...pointer };
    let frameId;

    const moveCursor = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      dotRef.current?.classList.add('is-visible');
      ringRef.current?.classList.add('is-visible');
    };

    const updateHoverState = (event) => {
      const isInteractive = Boolean(event.target.closest('a, button, [role="button"]'));
      ringRef.current?.classList.toggle('is-interactive', isInteractive);
    };

    const hideCursor = () => {
      dotRef.current?.classList.remove('is-visible');
      ringRef.current?.classList.remove('is-visible');
    };

    const animate = () => {
      follower.x += (pointer.x - follower.x) * 0.14;
      follower.y += (pointer.y - follower.y) * 0.14;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${follower.x}px, ${follower.y}px, 0)`;
      frameId = window.requestAnimationFrame(animate);
    };

    document.addEventListener('pointermove', moveCursor);
    document.addEventListener('pointerover', updateHoverState);
    document.documentElement.addEventListener('mouseleave', hideCursor);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('pointermove', moveCursor);
      document.removeEventListener('pointerover', updateHoverState);
      document.documentElement.removeEventListener('mouseleave', hideCursor);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="cursor-effect" aria-hidden="true">
      <span ref={ringRef} className="cursor-ring" />
      <span ref={dotRef} className="cursor-dot" />
    </div>
  );
};

export default CursorEffect;
