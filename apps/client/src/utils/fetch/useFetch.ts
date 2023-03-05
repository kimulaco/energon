import { useState, useCallback } from 'react';
import { queryStringify } from './queryStringify';

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  query?: Record<string, any>;
  body?: Record<string, any>;
  useCache?: boolean;
};

export const createFetchURL = (
  path: string,
  query?: Record<string, any>,
): string => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
  const params = query ? queryStringify(query) : '';

  return `${BASE_URL}${path}${params ? '?' + params : ''}`;
};

export const useFetch = <T>() => {
  interface FetchState {
    isLoading: boolean;
    isError: boolean;
    data: T | undefined;
  }

  const [state, setState] = useState<FetchState>({
    isLoading: false,
    isError: false,
    data: undefined,
  });

  const doFetch = useCallback(
    async (path: string, options?: FetchOptions): Promise<T | undefined> => {
      if (options?.useCache && state.data) {
        return state.data;
      }

      if (state.isLoading) {
        return;
      }

      setState({
        isLoading: true,
        isError: false,
        data: state.data,
      });

      const url = createFetchURL(path, options?.query);
      const response = await fetch(url, {
        method: options?.method || 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {}),
        },
        body: options?.body ? JSON.stringify(options?.body || {}) : undefined,
      });
      const data = await response.json();

      setState({
        isLoading: false,
        isError: !response.ok,
        data: data,
      });

      if (!response.ok) {
        throw data as T;
      }

      return data as T;
    },
    [state],
  );

  return { state, doFetch };
};
