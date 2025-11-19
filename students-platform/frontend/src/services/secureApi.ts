import { api } from './api';
import axios from 'axios';

export const secureApi = axios.create({
    ...api.defaults,
    withCredentials: true
});
