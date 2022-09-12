const promiseFunc = require('../../../../app/helpers/async/promiseFunc');

describe('promiseFunc', () => {
    it('Returns the message `Success.` when it receives a truthy value', () => {
        return promiseFunc(true)
            .then(value => {
                expect(value).toBe('Success.');
            });
    });

    it('Returns the message `Error.` when it receives a falsy value', () => {
        return promiseFunc(false)
            .catch(value => {
                expect(value).toBe('Error.');
            });
    });

    it('Returns the message `Success.` when it receives a truthy value', async() => {
        try {
            const value = await promiseFunc(true);
            expect(value).toBe('Success.');
        } catch(error) {
            console.log(error);
        }
    });

    it('Returns the message `Error.` when it receives a falsy value', async() => {
        try {
            await promiseFunc(false);
        } catch(error) {
            expect(error).toBe('Error.');
        }
    });

    it('Returns the message `Success.` when it receives a truthy value', (done) => {
        promiseFunc(true)
            .then(value => {
                expect(value).toBe('Success.');
                done();
            });
    });

    it('Returns the message `Error.` when it receives a falsy value', (done) => {
        promiseFunc(false)
            .catch(value => {
                expect(value).toBe('Error.');
                done();
            });
    });
});
