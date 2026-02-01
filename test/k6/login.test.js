import http from 'k6/http';
import { sleep, check , group} from 'k6';
import { config, getUrl } from './config.js';
import {randomEmail} from './helpers/randomData.js';


export let options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(90)<=11'], 
  }
};

export default function () {
    let email = randomEmail();
    let password = 'mudar123';
    let name = 'Paloma Amorim';


    group('Registro Usuário', function() {
    let registro = http.post(
        getUrl(`${config.API_USERS}/register`),
        JSON.stringify({
            email,
            password,
            name,            
    }),
        { 
            headers: { 
            'Content-Type': 'application/json' } 
        });
        check(registro, {
        'status retornou 201': (r) => r.status === 201,
        
        });
    });
    
    sleep(1); 

};


