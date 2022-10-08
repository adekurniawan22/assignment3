const app = require('../app');
const request = require('supertest');
const { sequelize } = require('../models');

describe('POST /create', () => {
    test('Success add product and send response 200 status code', (done) => {
        const productData = {
            id: 1,
            name: 'Permen',
            price: 5000,
        };
        request(app)
            .post('/create')
            .send(productData)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(201);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('id');
                expect(res.body).toHaveProperty('name');
                expect(res.body).toHaveProperty('price');
                expect(res.body.name).toEqual(productData.name);
                done();
            })

    });

    test('Failed add product and send response 500 status code ', (done) => {
        const productDataWrong = {
            name: '',
            price: '',
        };
        request(app)
            .post('/create')
            .send(productDataWrong)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(500);
                done();
            })
    });
});

describe('GET /products', () => {
    test('Success get all product with method GET', (done) => {
        request(app)
            .get('/products')
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(200);
                done();
            })
    });

    test('Failed get all product with method POST', (done) => {
        const res = request(app)
            .post('/products');
        expect(res.method).toBe('POST');
        done();

    });
});

describe('GET /products/:id', () => {
    test('Success get product by id and send response 200 status code', (done) => {
        request(app)
            .get(`/products/1`)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(200);
                done();
            })
    })

    test('Failed get data product by id and send response 500 status code', (done) => {
        const wrongParams = 99999;
        request(app)
            .get(`/products/${wrongParams}`)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res.status).toEqual(404);
                done();
            })
    })
})

afterAll((done) => {
    sequelize.queryInterface.bulkDelete('Products', {})
        .then(() => {
            return done();
        }).catch(err => {
            done(err);
        });
});