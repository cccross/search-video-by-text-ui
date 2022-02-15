import axios from 'axios';
import type { SearchResult } from './types/SearchResult';

const RESOURCES = {
  RESULTS: '/results',
  VIDEOS: '/videos'
};

// interface ResponseError {
//   response: { data: string };
// }

const baseURL: string = process.env.REACT_APP_SEARCH_SERVICE_BASE_URL || '/';

const instance = axios.create({ baseURL });

// instance.interceptors.response.use(
//   (response) => Promise.resolve(response.data),
//   (error: ResponseError) => {
//     const errorMesage = error?.response?.data || DEFAULT_ERROR_MESSAGE;
//     return Promise.reject(errorMesage);
//   }
// );

// let message;
//         if (typeof reason === 'string') {
//           message = reason;
//         } else if (reason instanceof Error) {
//           message = reason.message;
//         } else {
//           message = 'Unexpeted Error';
//         }

const getResults = async (term: string): Promise<SearchResult[]> => {
  const response = await instance.get(RESOURCES.RESULTS, {
    params: { term }
  });
  return response.data as SearchResult[];
};

export const searchAPI = {
  getResults
};

export const VIDEO_STREAM_BASE_URL = `${baseURL}${RESOURCES.VIDEOS}`;
