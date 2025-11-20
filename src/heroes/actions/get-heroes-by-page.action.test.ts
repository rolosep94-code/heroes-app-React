import { beforeEach, describe, expect, test } from "vitest"
import { getHeroesByPageAction } from "./get-heroes-by-page.action"
import { heroApi } from "../api/hero.api"

import AxiosMockAdapter from 'axios-mock-adapter';

const BASE_URL = import.meta.env.VITE_API_URL;


describe('getHeroByPageAction', () => { 

    const heroesApiMock = new AxiosMockAdapter(heroApi);

    beforeEach(() => {
        heroesApiMock.reset();
    });

    test('should retturn default heroes', async () => {

        heroesApiMock.onGet('/').reply(200, {
            total: 20,
            pages: 2,
            heroes: [
                {
                    image: '1.jpg',
                },
                {
                    image: '2.jpg',
                },
            ],
        });
        

        const response = await getHeroesByPageAction(1);
        expect(response).toStrictEqual({
            total: 20,
            pages: 2,
            heroes: [
                { image: `${BASE_URL}/images/1.jpg` },
                { image: `${BASE_URL}/images/2.jpg` },
            ],
        });
    });

    test('should return the correct heroes when page is string number', async () => {
        const responseObject = {
            total: 10,
            pages: 1,
            heroes: [],
        }

        heroesApiMock.onGet('/').reply(200, responseObject);

        await getHeroesByPageAction('5' as unknown as number);

        const params = heroesApiMock.history.get[0].params;
        expect(params).toStrictEqual({ limit: 6, offset:24, category: 'all' });

    })

    // test('should call the api with correct params', async () => {
    //     const responseObject = {
    //         total: 10,
    //         pages: 1,
    //         heroes: [],
    //     }

    //     heroesApiMock.onGet('/').reply(200, responseObject);

    //     await getHeroesByPageAction(1, 10, 'heroes');

    //     const params = heroesApiMock.history.get[0].params;
    //     expect(params).toStrictEqual({ limit: 2, offset:10, category: 'heroes' });

    // })
 });