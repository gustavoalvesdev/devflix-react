/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
const API_KEY = 'fd08369ab157b1cadf32cb1f297ae245';
const API_BASE = 'https://api.themoviedb.org/3';
const LANGUAGE = 'pt-BR';
const DISCOVER_MOVIE_GENRES = '/discover/movie?with_genres';
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

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=${LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=${LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=${LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`${DISCOVER_MOVIE_GENRES}=28&language=${LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`${DISCOVER_MOVIE_GENRES}=35&language=${LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`${DISCOVER_MOVIE_GENRES}=27&language=${LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`${DISCOVER_MOVIE_GENRES}=10749&language=${LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`${DISCOVER_MOVIE_GENRES}=99&language=${LANGUAGE}&api_key=${API_KEY}`)
            }
        ]
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if (movieId) {
            switch(type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=${LANGUAGE}&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=${LANGUAGE}&api_key=${API_KEY}`);
                break;
                default:
                    info = null;
                break;
            }
        }

        return info;
    }
}