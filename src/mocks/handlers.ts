import { rest } from 'msw';
import { BACKEND_URL } from '../util/globalConstants';
import { dummyComponents, dummyFavorites } from './mockData';

export const handlers = [

    rest.get(`${BACKEND_URL}/components`, (req, res, ctx) => {
        
    return res(
        ctx.status(200), ctx.json(dummyComponents)
    )

  }),

  rest.get(`${BACKEND_URL}/favorites`, (req, res, ctx) => {
        
    return res(
        ctx.status(200), ctx.json(dummyFavorites)
    )

  }),

  rest.get(`${BACKEND_URL}/currencies/EUR/EUR`, (req, res, ctx) => {
        
    return res(
        ctx.status(200), ctx.json(dummyFavorites)
    )

  })
]