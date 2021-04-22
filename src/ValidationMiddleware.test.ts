import { Context, createHandler } from 'sierra';
import { createRequest } from '@cardboardrobots/test-util';

import { ValidationMiddleware } from './ValidationMiddleware';

describe('ValidationMiddleware', function () {
    it('should validate', async function () {
        const handler = createHandler()
            .use<{ params: any }>(async ({ data }) => {
                data.params = {};
            })
            .use<{ query: any }>(async ({ data }) => {
                data.query = {};
            })
            .use<{ body: any }>(async ({ data }) => {
                data.body = {};
            })
            .use(
                new ValidationMiddleware({
                    params: () => ({}),
                    query: () => ({}),
                    body: () => ({}),
                }).callback
            )
            .use(async ({ data }) => {
                return data.input;
            });

        const { value } = await handler.pipeline.run(new Context(...createRequest()));
        expect(value).toStrictEqual({
            params: {},
            query: {},
            body: {},
        });
    });
});
