const { spec, request } = require ('pactum');
const { faker } = require('@faker-js/faker');

describe('POST Create User Test Suite', () => {
    before(() => {
        request.setDefaultTimeout(10000);
    });
    const randomFirstName = faker.person.firstName();
    const randomJobTitle = faker.person.jobTitle();
    const requestBody = 
    {
        "name": randomFirstName,
        "job": randomJobTitle
    }
    
    it('POST Add a new user - validating response body', async () => {
        await spec()
        .post(`https://reqres.in/api/users`)
        .withBody(requestBody)
        .expectJsonLike(
            {
                "name": randomFirstName,
                "job": randomJobTitle
            }
        )
    });
    it('POST Add a new user - 201 Created', async () => {
        await spec()
        .post(`https://reqres.in/api/users`)
        .withBody(requestBody)
        .expectStatus(201);
    });
});