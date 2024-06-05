import type { Type, TypeQueryOptions } from '@/types';
import { useQuery } from 'react-query';
import client from './client';
import { API_ENDPOINTS } from './client/api-endpoints';
import { useRouter } from 'next/router';
import { TIME_CACHE } from '@/config/get-env';

export function useTypes(options?: Partial<TypeQueryOptions>) {
  const { locale } = useRouter();

  let formattedOptions = {
    ...options,
    language: locale,
  };

  const { data, isLoading, error } = useQuery<Type[], Error>(
    [API_ENDPOINTS.TYPES, formattedOptions],
    ({ queryKey }) => client.types.all(Object.assign({}, queryKey[1])),
    { staleTime: TIME_CACHE },
  );
  return {
    types: data,
    isLoading,
    error,
  };
}

export function useType(slug: string) {
  const { locale } = useRouter();

  const { data, isLoading, error } = useQuery<Type, Error>(
    [API_ENDPOINTS.TYPES, { slug, language: locale }],
    () => client.types.get({ slug, language: locale! }),
    {
      enabled: Boolean(slug),
      staleTime: TIME_CACHE,
    },
  );
  return {
    type: data,
    isLoading,
    error,
  };
}
