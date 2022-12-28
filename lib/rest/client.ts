import axios, { AxiosInstance } from 'axios';
import { BASE_URL, REFERER } from './constants';


class RESTClient {
    fetcher: AxiosInstance;
    token: string;

    constructor(xsrfToken: string, cookie: string) {
        this.fetcher = axios.create({
            baseURL: BASE_URL,
            headers: {
                "Referer": REFERER,
                "Accept-Encoding": "application/json",
                "Content-Type": "application/json, text/plain, */*",
                "Cookie": cookie,
                "X-XSRF-TOKEN": xsrfToken
            },
            decompress: false
        });

        this.token = "eyJpdiI6IllrTlA4QUxMTXgyT0lucS92eUh0RXc9PSIsInZhbHVlIjoiM0Nrbi9LZW9scTljZjRrMFR6cjlweFI0MkQ3QkJJLzBlTUh4UXZhcmJlR3JQSE4zVXYzTlFJS1BjSHpkTFM5bEJIMXNUY1ErWWIzVWh1SWpTTmpYRktqYnN6TkdONVJmdmFBS2FYT2tDQ1hPTlZ1RlQzMW50a1VocUwyblk2aGwiLCJtYWMiOiJjZWUyMDBmNjZkOWEyNTlmMDhkODliMWNmZTQxM2QwOGIzOTI0OWQzZTJkMzZmZmE1NjgyODE0Y2U1YjY4Mzg2IiwidGFnIjoiIn0%3D";
    }

    setToken(token: string) {
        this.token = token;
        this.fetcher.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
}

export default RESTClient;