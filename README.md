# Como executar os testes

# powershell (execução simples, sem gráficos)
k6 run test/k6/checkout.test.js
k6 run test/k6/login.test.js

# powershell (execução com dashboard e gráficos k6)
$env:K6_WEB_DASHBOARD="true"
$env:K6_WEB_DASHBOARD_EXPORT="dashboard.html"
k6 run test/k6/checkout.test.js

##
# thresholds - meta de performance
Utilizado no arquivo de login.test.js dentro de options, sendo aplicado percentil variados para determinar tempo.
ex:
 thresholds: {
    http_req_duration: ['p(90)<=11'],
}

# helpers - reutilização de código
Localizado na pasta test/k6/helpers/login.js
foi aplicado no uso de geração de e-mails para não gerar duplicidade.
ex: 
export function login(email, password) {
  let response = http.post(
    getUrl(`${config.API_USERS}/login`),
    JSON.stringify({ email, password }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response;
}

# check - verifica retorno da API
Localizado no arquivo de teste login.test.js, valida as respostas como status do teste.
ex: 
check(registro, {
    'status retornou 201': (r) => r.status === 201,
});

# group - agrupador de requisições
O group foi utilizado nos arquivos login.test.js e checkout.test.js como um agrupador
ex: 
group('Login Usuário', function() {
    response = login(user.email, user.password);
})

# autenticação (token)
O uso de autenticação do token está em extrair o token que está na chamada de login e com ele passar no chamada de checkout.
ex:  
headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        } 

# trend - métricas 
Utilizado para gerar métrica de valor de medida.
Localizado no arquivo checkout.test.js
ex: 
import { Trend } from 'k6/metrics';
    const postCheckoutDurationTrend = new Trend('checkout_duration');

    postCheckoutDurationTrend.add(response.timings.duration);

# faker
Não consegui fazer uso da biblioteca, em todos os meus testes deu falha e ao pesquisar entendi que não tem suporte no k6
como impotação é feita é go

# variável de ambiente
Permite rodar testes em ambientes distintos.
Criado arquivo config.js (como referencia arquivo .env utilizado em aplicações web)
Utilizado no arquivo checkout.test.js
ex: 
const ENV = __ENV.K6_ENV || 'local';
    export const config = environments[ENV];

    getUrl(`${config.API_USERS}/register`)

# stages
Simular carga progressiva
Utilizado no arquivo checkout.test.js 
ex: 
stages: [
        { duration: '3s', target: 4 },
        { duration: '5s', target: 8 },
        { duration: '10s', target: 10 },
],

# reaproveitamento de resposta
Criado no arquivo login.js para utilização nos testes checkout.test.js
ex: 
response = login(user.email, user.password);
    token = response.json('token');

# data-driven testing
Deixar testes com dados dinâmicos.
Utilizado no arquivo randomData localizado pasta helpers para ser utilizado nos testes checkout.test.js
ex: export default function () {
  let user = {
    email: randomEmail(),
    password: 'mudar123',
    name: 'Paloma Deus',
  };
}