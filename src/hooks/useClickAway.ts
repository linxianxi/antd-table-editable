import { RefObject, useEffect } from 'react';
import useLatest from './useLatest';

const useClickAway = <E extends Event = Event>(
  element: RefObject<HTMLElement>,
  onClickAway: (event: E) => void,
) => {
  const savedCallback = useLatest(onClickAway);

  useEffect(() => {
    const handler = (event: any) => {
      const ele = element.current;
      // composedPath 比 contains 好
      // https://github.com/vueuse/vueuse/blob/main/packages/core/onClickOutside/index.ts#L75
      if (!ele || ele === event.target || event.composedPath().includes(ele)) {
        return;
      }
      savedCallback.current(event);
    };
    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);
};

export default useClickAway;
