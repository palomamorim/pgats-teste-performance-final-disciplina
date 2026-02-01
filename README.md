# Como executar os testes

# powershell (execução simples, sem gráficos)
k6 run test/k6/checkout.test.js
k6 run test/k6/login.test.js

# powershell (execução com dashboard e gráficos k6)
$env:K6_WEB_DASHBOARD="true"
$env:K6_WEB_DASHBOARD_EXPORT="dashboard.html"
k6 run test/k6/checkout.test.js

