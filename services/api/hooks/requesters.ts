import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {apiRequester} from '..';
import {ApiResponse, PostData} from '../api-types';

export const useFetchData = (
  url: string,
  queryKey: string,
  options?: UseQueryOptions<ApiResponse, Error>,
): UseQueryResult<ApiResponse, Error> => {
  return useQuery<ApiResponse, Error>({
    queryKey: [queryKey],
    queryFn: () => apiRequester.fetchData(url),
    ...options,
  });
};

export const usePostData = (
  url: string,
): UseMutationResult<AxiosResponse<ApiResponse>, Error, PostData> => {
  return useMutation<AxiosResponse<ApiResponse>, Error, PostData>({
    mutationFn: async (payload: PostData) => {
      console.log(payload, 'payload feedback');
      const res = await apiRequester.postData(url, payload);
      return res;
    },
  });
};

export const useUpdateData = (
  url: string,
): UseMutationResult<AxiosResponse<ApiResponse>, Error, PostData> => {
  return useMutation<AxiosResponse<ApiResponse>, Error, PostData>({
    mutationFn: async (payload: PostData) => {
      console.log(payload, 'payload feedback');
      const res = await apiRequester.updateData(url, payload);
      return res;
    },
  });
};

export const useDeleteData = (
  url: string,
): UseMutationResult<AxiosResponse<ApiResponse>, Error, void> => {
  return useMutation<AxiosResponse<ApiResponse>, Error, void>({
    mutationFn: async () => {
      console.log('Deleting data at:', url);
      const res = await apiRequester.deleteData(url);
      return res;
    },
  });
};

//const { mutate, isLoading, isError, error } = useUpdateData('/api/resource/1');
//const { mutate, isLoading, isError, error } = useDeleteData('/api/resource/1');

// const { data, isLoading, isError, error } = useFetchData(
//     '/your-endpoint',
//     'yourQueryKey',
//     {
//       staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
//       refetchOnWindowFocus: false, // Disable refetch on window focus
//       onSuccess: (data) => {
//         console.log('Data fetched successfully:', data);
//       },
//       onError: (error) => {
//         console.error('Error fetching data:', error);
//       },
//     }
//   );

//const { data, isLoading, isError, error } = useFetchData('/your-endpoint', 'yourQueryKey');
