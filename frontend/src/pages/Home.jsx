import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import { useAuth } from "../context/AuthContext";
import { Typography } from '@mui/material';
const Home = () => {
    const { token } = useAuth()

    const [moviesData, setMoviesData] = useState([])

    useEffect(() => {
        getAllMovie()
    }, [])

    const getAllMovie = async () => {
        const url = `${import.meta.env.VITE_API}/movies`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        let json = await response.json();
        setMoviesData(json)
    }
    return (
        <div className='text-6xl text-white'>
            <Typography variant="h4" align="center" sx={{ my: 4 }}>
                Top Movie List
            </Typography>
            <MovieList moviesData={moviesData} />
        </div>
    );
}

export default Home

