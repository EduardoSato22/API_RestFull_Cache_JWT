const request = require('supertest');
const app = require('../app');
const db = require('../configs/database');

// Limpa a tabela de usuários antes e depois dos testes
beforeAll(async () => {
    await db.execute('DELETE FROM usuarios');
});

afterAll(async () => {
    await db.execute('DELETE FROM usuarios');
    await db.end(); // Fecha a conexão com o banco
});

describe('Endpoints de Usuários', () => {
    it('deve criar um novo usuário', async () => {
        const response = await request(app)
            .post('/usuarios')
            .send({
                usuario: 'testuser',
                senha: 'password123'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.usuario).toBe('testuser');
    });

    it('deve listar os usuários', async () => {
        // Primeiro, cria um usuário para garantir que a lista não esteja vazia
        await request(app)
            .post('/usuarios')
            .send({
                usuario: 'testuser2',
                senha: 'password123'
            });
        
        const response = await request(app).get('/usuarios');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).not.toHaveProperty('senha');
    });
}); 