/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */

/*
- originais da netflix
- recomendados (trending)
- em alta (top rated)
- ação
- comédia
- terror
- romance
- documentários
*/
require('dotenv').config();

const basicFetch = async (endpoint) => {
    const req = await fetch(`${process.env.REACT_APP_API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=${process.env.REACT_APP_LANGUAGE}&api_key=${process.env.REACT_APP_API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=${process.env.REACT_APP_LANGUAGE}&api_key=${process.env.REACT_APP_API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=${process.env.REACT_APP_LANGUAGE}&api_key=${process.env.REACT_APP_API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`${process.env.REACT_APP_DISCOVER_MOVIE_GENRES}=28&language=${process.env.REACT_APP_LANGUAGE}&api_key=${process.env.REACT_APP_API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`${process.env.REACT_APP_DISCOVER_MOVIE_GENRES}=35&language=${process.env.REACT_APP_LANGUAGE}&api_key=${process.env.REACT_APP_API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`${process.env.REACT_APP_DISCOVER_MOVIE_GENRES}=27&language=${process.env.REACT_APP_LANGUAGE}&api_key=${process.env.REACT_APP_API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`${process.env.REACT_APP_DISCOVER_MOVIE_GENRES}=10749&language=${process.env.REACT_APP_LANGUAGE}&api_key=${process.env.REACT_APP_API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`${process.env.REACT_APP_DISCOVER_MOVIE_GENRES}=99&language=${process.env.REACT_APP_LANGUAGE}&api_key=${process.env.REACT_APP_API_KEY}`)
            }
        ]
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if (movieId) {
            switch(type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=${process.env.REACT_APP_LANGUAGE}&api_key=${process.env.REACT_APP_API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=${process.env.REACT_APP_LANGUAGE}&api_key=${process.env.REACT_APP_API_KEY}`);
                break;
                default:
                    info = null;
                break;
            }
        }

        return info;
    }
}