import { useEffect, useState } from 'react';

import config from '~/config';

function useConfig() {
  const [_, setConfigHasBeenLoaded] = useState(() => config.hasBeenLoaded);

  useEffect(() => {
    (async () => {
      if (config.hasBeenLoaded) return;

      await config.loadFromStorage();
      setConfigHasBeenLoaded(true);
    })();
  }, []);

  return { config };
}

export default useConfig;
