const { spec, request } = require ('pactum');

describe('DELETE user test suite', () => {
    before(() => {
        request.setDefaultTimeout(10000);
    });
    //declaring userId variable to be used in the request URI of the API
    const userId = 2;
    //invalid user id
    const invalidUserId = 3;
    it('DELETE User - Validating 204 Response Code', async () => {
        await spec()
        .delete(`https://reqres.in/api/users/${userId}`)
        .expectStatus(204)
    });
    it('DELETE User - Incorrect user id', async () => {
        await spec()
        .delete(`https://reqres.in/api/users/${invalidUserId}`)
        .expectStatus(404)
    });
});