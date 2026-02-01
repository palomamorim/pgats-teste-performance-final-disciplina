import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { config, getUrl } from './config.js';
import { randomEmail } from './helpers/randomData.js';
import { login } from './helpers/login.js';

import {Trend} from 'k6/metrics';
const postCheckoutDurationTrend = new Trend('checkout_duration');

export let options = {
  vus: 10,
  thresholds: {
    http_req_duration: ['p(90)<5000'],
  },
  stages: [
    {duration: '3s', target: 4},
    {duration: '5s', target: 8},
    {duration: '10s', target: 10},
  ],
};

export default function () {
  let user = {
    email: randomEmail(),
    password: 'mudar123',
    name: 'Paloma Deus',
  };
  let token = '';
  let response;

  group('Registro Usuário', function() {
    response = http.post(
      getUrl(`${config.API_USERS}/register`),
      JSON.stringify(user), 
      { 
        headers: { 
          'Content-Type': 'application/json' 
        } 
      }
    );
    check(response, {
      'status retornou 201': (r) => r.status === 201,
    });
  });

  group('Login Usuário', function() {
    response = login(user.email, user.password);
    //console.log(response.body);
        
    check(response, {
      'status retornou 200': (r) => r.status === 200,
      'login success': (r) => r.json('success') === true,
    });
  });
    
  token = response.json('token');
  console.log('Token:', token);
  
  group('Realizar Checkout', function() {
    let checkout = http.post(
      getUrl(`${config.API_CHECKOUT}`),
      JSON.stringify({
        items: [{ productId: 1, quantity: 2 }],
        freight: 20,
        paymentMethod: 'boleto'
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        } 
      }
    );    
    check(checkout, {
      'checkout status 200': (r) => r.status === 200,
    });

    postCheckoutDurationTrend.add(checkout.timings.duration);
  });

  sleep(1);
}