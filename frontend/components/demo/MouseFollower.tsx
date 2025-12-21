'use client';
import { useEffect, useRef } from 'react';

type Segment = { x: number; y: number };

export default function MouseFollower() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 300, y: 300 });
  const segments = useRef<Segment[]>(
    Array.from({ length: 22 }, (_, i) => ({
      x: 300 - i * 12,
      y: 300,
    }))
  );

  const threatLevel = useRef(0); // 0–1 (used for pulse / alert)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const follow = () => {
      // distance to cursor = threat simulation
      const dx0 = mouse.current.x - segments.current[0].x;
      const dy0 = mouse.current.y - segments.current[0].y;
      const dist0 = Math.hypot(dx0, dy0);

      threatLevel.current = Math.min(dist0 / 300, 1);

      // head follows mouse (AI core)
      segments.current[0].x += dx0 * 0.12;
      segments.current[0].y += dy0 * 0.12;

      // body (encrypted data stream)
      for (let i = 1; i < segments.current.length; i++) {
        const prev = segments.current[i - 1];
        const cur = segments.current[i];

        const dx = prev.x - cur.x;
        const dy = prev.y - cur.y;
        const dist = Math.hypot(dx, dy) || 1;
        const spacing = 12;

        cur.x += (dx / dist) * (dist - spacing);
        cur.y += (dy / dist) * (dist - spacing);
      }

      if (containerRef.current) {
        containerRef.current.innerHTML = '';

        segments.current.forEach((s, i) => {
          const seg = document.createElement('div');
          seg.style.position = 'fixed';
          seg.style.left = `${s.x}px`;
          seg.style.top = `${s.y}px`;
          seg.style.width = i === 0 ? '10px' : '6px';
          seg.style.height = i === 0 ? '10px' : '6px';
          seg.style.borderRadius = '50%';
          seg.style.pointerEvents = 'none';

          // cyber colors
          const glow = Math.floor(200 + 55 * (1 - i / segments.current.length));
          seg.style.border = `1px solid rgb(0, ${glow}, 200)`;
          seg.style.boxShadow = `
            0 0 ${6 + threatLevel.current * 10}px rgba(0,255,220,0.8),
            inset 0 0 6px rgba(0,255,255,0.6)
          `;

          containerRef.current!.appendChild(seg);

          // skeleton links (network graph feel)
          if (i > 0) {
            const link = document.createElement('div');
            link.style.position = 'absolute';
            link.style.left = '-12px';
            link.style.top = '50%';
            link.style.width = '12px';
            link.style.height = '1px';
            link.style.background = 'rgba(0,255,200,0.6)';
            seg.appendChild(link);
          }

          // scanning rays (IDS / firewall vibe)
          if (i === 0) {
            for (let r = 0; r < 3; r++) {
              const ray = document.createElement('div');
              ray.style.position = 'absolute';
              ray.style.left = '50%';
              ray.style.top = '50%';
              ray.style.width = '18px';
              ray.style.height = '1px';
              ray.style.background = 'rgba(0,255,255,0.8)';
              ray.style.transformOrigin = '0% 50%';
              ray.style.transform = `rotate(${r * 60 + Date.now() / 20}deg)`;
              seg.appendChild(ray);
            }
          }
        });
      }

      requestAnimationFrame(follow);
    };

    follow();
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return <div ref={containerRef} />;
}