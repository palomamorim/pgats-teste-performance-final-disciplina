const request = require('supertest');
const sinon = require('sinon');
const {expect} = require('chai');

const app = require('../../rest/app');

describe('Checkout Controller', () => {
    describe('POST /api/checkout', () => {       
        it('Valida token inválido', async() => {
            const resposta = await request(app)
                .post('/api/checkout')
                .send({
                    items: [{
                        productId: 1,
                        quantity: 2
                    }],
                    freight: 20,
                    paymentMethod: 'boleto'
                    
            });

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('error', 'Token inválido');
            
            sinon.restore();
        });

        it('Valida token válido', async() => {
            const respostaLogin = await request(app)
                .post('/api/users/login')
                .send({
                    email: "paloma.deus@gmail.com",
                    password: "mudar123"
            });

            const token = respostaLogin.body.token;

            const resposta = await request(app)
                .post('/api/checkout')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    items: [{
                        productId: 1,
                        quantity: 2
                    }],
                    freight: 20,
                    paymentMethod: 'boleto'
                    
            });

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('error', 'Token inválido');
            
            sinon.restore();
        });
    })
    
    
})