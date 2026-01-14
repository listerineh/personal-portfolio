'use client';

import { useRef, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/theme-context';

interface ThemeToggleButtonProps {
  className?: string;
}

export function ThemeToggleButton({ className }: ThemeToggleButtonProps) {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!iconRef.current) return;

    gsap.fromTo(
      iconRef.current,
      {
        rotation: -180,
        scale: 0,
        opacity: 0,
      },
      {
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }
    );
  }, [theme]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const overlay = document.createElement('div');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${newTheme === 'dark' ? 'hsl(240, 6%, 10%)' : 'hsl(220, 20%, 96%)'};
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
    `;
    document.body.appendChild(overlay);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.removeChild(overlay);
      }
    });

    tl.to(overlay, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.inOut',
    })
    .call(() => {
      toggleTheme();
    })
    .to(overlay, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    });

    gsap.to(iconRef.current, {
      rotation: 360,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        gsap.set(iconRef.current, { rotation: 0, scale: 1 });
      }
    });
  };

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      onClick={handleClick}
      aria-label="Toggle theme"
      className={className}
    >
      <div ref={iconRef}>
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </div>
    </Button>
  );
}
