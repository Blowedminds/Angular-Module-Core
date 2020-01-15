declare var expect: any;

export class TestingHelper {

    routes = [
        { path: 'login', children: [] }
    ];

    unAuthenticatedError(error: any): Promise<any> {
        expect(error.error.message).toBe(undefined);

        return Promise.reject(error);
    }

    invalidDataError(error: any): Promise<any> {
        expect(error.error.message).toBe('The given data was invalid.');
        expect(error.status).toBe(422);
        expect(error.statusText).toBe('Unprocessable Entity');

        return Promise.reject(error);
    }
}
