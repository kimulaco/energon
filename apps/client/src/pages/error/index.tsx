import { useMemo } from 'react';
import type { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ERROR_CONFIG, ErrorConfig } from '../../constants/error';

const PageError: FC = () => {
  const [searchParams] = useSearchParams();

  const error = useMemo<ErrorConfig>(() => {
    const type = searchParams.get('type');

    if (!type || !ERROR_CONFIG[type]) return ERROR_CONFIG.unknown;

    return ERROR_CONFIG[type];
  }, [searchParams]);

  return (
    <div className="PageError">
      <h1>{error.title}</h1>
      <p>{error.message}</p>
    </div>
  );
};

export default PageError;
