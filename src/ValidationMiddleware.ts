/* eslint-disable @typescript-eslint/ban-types */

import { Context } from 'sierra';

export interface ValidationFunction<T> {
    <U>(value: U): T;
}

export class ValidationMiddleware<
    CONTEXT extends Context<{
        params: any;
        query: any;
        body: any;
        input: { params: PARAMS; query: QUERY; body: BODY };
    }>,
    PARAMS extends {},
    QUERY extends {},
    BODY extends {}
> {
    params: ValidationFunction<PARAMS>;
    query: ValidationFunction<QUERY>;
    body: ValidationFunction<BODY>;

    constructor({
        params,
        query,
        body,
    }: {
        params: ValidationFunction<PARAMS>;
        query: ValidationFunction<QUERY>;
        body: ValidationFunction<BODY>;
    }) {
        this.params = params;
        this.query = query;
        this.body = body;
    }

    callback = async (context: CONTEXT) => {
        const result = {
            params: this.params(context.data.params),
            query: this.query(context.data.query),
            body: this.body(context.data.body),
        };
        context.data.input = result;
        return result;
    };
}
