import { useEffect, useRef } from 'react';

//////传入处理函数，返回ref
function useClickOutside(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener('click', handleClick, listenCapturing);

    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [handler, ref, listenCapturing]);

  return ref;
}

export default useClickOutside;
