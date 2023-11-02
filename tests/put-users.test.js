const { spec, request } = require ('pactum');
const { faker } = require('@faker-js/faker');

describe('PUT Update Existing User Test Suite', () => {
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
    const userId = 2;

    it('PUT Update an existing user - verifying response body', async () => {
        await spec()
        .put(`https://reqres.in/api/users/${userId}`)
        .withBody(requestBody)
        .expectJsonLike(
            {
                "name": randomFirstName,
                "job": randomJobTitle
            }
        )
    });
    it('PUT Update an existing user - 200 OK', async () => {
        await spec()
        .put(`https://reqres.in/api/users/${userId}`)
        .withBody(requestBody)
        .expectStatus(200);
    });
});