const { spec, request } = require ('pactum');

describe('GET Users Test Suite', () => {
    before(() => {
        request.setDefaultTimeout(10000);
    });
    const getUsersSchema = require ('../data/response/get-users-schema-validation.json');
    const invalidUserId = 23;
    const id = 7;
    const email = "michael.lawson@reqres.in";
    const firstName = "Michael";
    const lastName = "Lawson";
    const avatar = "https://reqres.in/img/faces/7-image.jpg";
    const pageQueryParam = "page=2"
    
    it('GET list of users - validating response body', async () => {
        await spec()
        .get(`https://reqres.in/api/users?${pageQueryParam}`)
        .expectJsonLike({
            "data": [{
                "id": id,
                "email": email,
                "first_name": firstName,
                "last_name": lastName,
                "avatar": avatar
            }]
          });
    });
    it('GET list of users - 200 OK', async () => {
        await spec()
        .get(`https://reqres.in/api/users?${pageQueryParam}`)
        .expectStatus(200);
    });
    it('GET single user - invalid user id - verifying 404 Not Found', async () => {
        await spec()
        .get(`https://reqres.in/api/users/${invalidUserId}`)
        .expectStatus(404)
    });
    it('GET single user - invalid user id - verifying API response', async () => {
        await spec()
        .get(`https://reqres.in/api/users/${invalidUserId}`)
        .expectBody(
            {}
          );
    });
    it('GET list of users - schema validation', async () => {
        await spec()
        .get(`https://reqres.in/api/users?${pageQueryParam}`)
        .expectJsonSchema(getUsersSchema)
    });
});