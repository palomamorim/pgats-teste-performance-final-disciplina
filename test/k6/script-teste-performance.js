import http from 'k6/http';
import { sleep, check } from 'k6';


export const options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(90)<=5'], 
  }
};

export default function() {
  let res = http.post(
      'http://localhost:3000/api/users/register',
    JSON.stringify({
      name: "Paloma Amorim de Deus",
      email: 'paloma.deus@gmail.com',
      password: 'mudar123'
    }),
    { 
        headers: { 
          'Content-Type': 'application/json' } 
    });

    // console.log(res.body);
    
    sleep(1); 

}
