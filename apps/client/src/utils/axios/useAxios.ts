import { useState, useCallback } from 'react';
import deepmerge from 'deepmerge';
import { instance as axios, AxiosRequestConfig } from './axios';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE_KEY } from '../../constants/cookie';

interface AxiosFetchOption {
  config?: AxiosRequestConfig;
  useCache?: boolean;
  useToken?: boolean;
  disableThrow?: boolean;
}

export const mergeAxiosConfig = (
  config: AxiosRequestConfig | undefined,
  fetchOption: AxiosFetchOption | undefined,
): AxiosRequestConfig | undefined => {
  const configs: AxiosRequestConfig[] = [];

  if (config) configs.push(config);

  if (fetchOption?.useToken) {
    configs.push({
      headers: {
        'X-ENERGON-API-TOKEN': Cookies.get(TOKEN_COOKIE_KEY) || '',
      },
    });
  }

  if (fetchOption?.config) configs.push(fetchOption.config);

  if (configs.length <= 0) return;

  if (configs.length === 1) return configs[0];

  return deepmerge.all<AxiosRequestConfig>(configs);
};

export const useAxios = <T>(url: string, config?: AxiosRequestConfig) => {
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
    async (option?: AxiosFetchOption): Promise<T | undefined> => {
      if (option?.useCache && state.data) return state.data;

      if (state.isLoading) return;

      setState({
        isLoading: true,
        isError: false,
        data: state.data,
      });

      try {
        const _config = mergeAxiosConfig(config, option);
        const { data } = await axios<T>(_config?.url || url, _config);

        setState({
          isLoading: false,
          isError: false,
          data: data,
        });

        return data;
      } catch (error) {
        setState({
          isLoading: false,
          isError: true,
          data: undefined,
        });

        if (!option?.disableThrow) throw error;
      }
    },
    [state],
  );

  return { state, doFetch };
};
