import http from 'k6/http';
import { config, getUrl } from '../config.js';

export function login(email, password) {
    let payload ={
        email,
        password,
    };
    let response = http.post(
        getUrl(`${config.API_USERS}/login`),
        JSON.stringify(payload),
        { 
            headers: { 
                'Content-Type': 'application/json' 
        }
    });
    
    return response;

}