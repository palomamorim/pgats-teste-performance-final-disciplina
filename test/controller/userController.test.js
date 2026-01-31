const request = require('supertest');
const sinon = require('sinon');
const {expect} = require('chai');

const app = require('../../rest/app');

describe('User Controller', () => {
    describe('POST /users/register', () => {       
     it('Quando e-mail já existir na base de dados retornar erro', async() => {
            // usar o supertest para fazer requisições na minha api
            // usar supertest apontando para o app
            const dados = {
                    name: "Paloma Amorim de Deus",
                    email: "paloma.deus@gmail.com",
                    password: "mudar123"
                };

            await request(app).post('/api/users/register').send(dados);

            const resposta = await request(app).post('/api/users/register').send(dados);

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Email já cadastrado');

            sinon.restore();
        });
    })

    describe('POST /users/login', () => {
        it('Validar login usuário', async() => {
            const resposta = await request(app)
                .post('/api/users/login')
                .send({
                    email: "paloma8963",
                    password: "mudar123"
            });

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('error', 'Credenciais inválidas');

            
            sinon.restore();
        });
    })
})