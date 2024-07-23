import request from "supertest";
import server from "../../server";

describe('POST /api/products',() => {
    it('shoul create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Monitor',
            price : 200
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
    })
})