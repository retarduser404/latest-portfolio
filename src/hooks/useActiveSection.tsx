import { useEffect, useState } from 'react';

export default function useActiveSection(ids: string[] = ['home','about','skills','projects','blog','contact']) {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    const handler = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const id = ids[i];
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          setActive(id);
          return;
        }
      }
      setActive(ids[0]);
    };

    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, [ids]);

  return active;
}
