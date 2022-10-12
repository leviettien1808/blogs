import axios from 'axios';

const baseURL = 'https://api-placeholder.herokuapp.com/api';

export const baseService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const blogsUrl = '/v2/blogs';
