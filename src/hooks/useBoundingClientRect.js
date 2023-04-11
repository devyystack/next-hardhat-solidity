import { useEffect, useState, useCallback } from 'react';

// ----------------------------------------------------------------------

export default function useBoundingClientRect(containerRef) {
  const [container, setContainer] = useState(null);

  const handleResize = useCallback(() => {
    if (containerRef.current) {
      const value = containerRef.current.getBoundingClientRect();
      setContainer(value);
    }
  }, [containerRef]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return container;
}
