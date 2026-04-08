import { useEffect, useState } from 'react';

import { getSiteContent } from '@/services';

import { UseSiteContentState } from '@/types';

const INITIAL_STATE: UseSiteContentState = {
  data: null,
  isLoading: true,
  error: null,
};

export const useSiteContent = (): UseSiteContentState => {
  const [state, setState] = useState<UseSiteContentState>(INITIAL_STATE);

  useEffect(() => {
    let isMounted = true;

    const loadContent = async () => {
      try {
        const data = await getSiteContent();

        if (isMounted) {
          setState({
            data,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            isLoading: false,
            error:
              error instanceof Error ? error.message : 'Не вдалося завантажити вміст сторінки.',
          });
        }
      }
    };

    loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
};
