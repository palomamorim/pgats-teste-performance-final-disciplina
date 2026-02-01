// test/k6/config.js
const environments = {
  local: {
    BASE_URL: 'http://localhost:3000',
    API_USERS: '/api/users',
    API_CHECKOUT: '/api/checkout',
  },
  dev: {
    BASE_URL: 'https://dev-api.example.com',
    API_USERS: '/api/users',
    API_CHECKOUT: '/api/checkout',
  },

};

// Pega o ambiente da variável K6_ENV ou usa 'local' como padrão
const ENV = __ENV.K6_ENV || 'local';

export const config = environments[ENV];

// Funções auxiliares
export function getUrl(endpoint) {
  return `${config.BASE_URL}${endpoint}`;
}