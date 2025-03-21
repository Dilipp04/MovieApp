import React, { useEffect, useState } from 'react'
import MovieList from '../components/MovieList'
import { FormControl, TextField, InputLabel, Select, MenuItem, ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import { useAuth } from '../context/AuthContext'
import SortIcon from "@mui/icons-material/Sort";


const Search = () => {

    const { token } = useAuth()
    const [searchedMovie, setSearchedMovie] = useState("")
    const [moviesData, setMoviesData] = useState([])
    const [sortField, setSortField] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        getAllMovie()
    }, [searchedMovie])
    useEffect(() => {
        onSortChange()
    }, [sortField, sortOrder])

    const onSortChange = async (field, order) => {
        const url = `${import.meta.env.VITE_API}/movies/sorted?order=${sortOrder}&sortBy=${sortField}`
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

    const getAllMovie = async () => {
        const url = `${import.meta.env.VITE_API}/movies/search?search=${searchedMovie}`
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

    const handleSortFieldChange = (event) => {
        const newSortField = event.target.value;
        setSortField(newSortField);
        onSortChange(newSortField, sortOrder);
    };

    const handleSortOrderChange = (_, newSortOrder) => {
        if (newSortOrder !== null) {
            setSortOrder(newSortOrder);
            onSortChange(sortField, newSortOrder);
        }
    };



    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-row items-center gap-8 justify-center py-8'>
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    value={searchedMovie}
                    onChange={(e) => setSearchedMovie(e.target.value)}
                    sx={{

                        width: "80%",
                        maxWidth: 400,
                        bgcolor: "black",
                        color: "white",
                        borderRadius: 2,
                        input: { color: "white" },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "white" },
                            "&:hover fieldset": { borderColor: "lightgray" },
                            "&.Mui-focused fieldset": { borderColor: "white" },
                        },
                    }}

                />

                {/* Sort by Dropdown */}
                <FormControl variant="filled" sx={{ minWidth: 150, bgcolor: "white", borderRadius: 1, height: "55px" }}>
                    <Select value={sortField} onChange={handleSortFieldChange}>
                        <MenuItem value="title">Title</MenuItem>
                        <MenuItem value="year">Year</MenuItem>
                        <MenuItem value="duration">Duration</MenuItem>
                        <MenuItem value="rating">Rating</MenuItem>
                    </Select>
                </FormControl>

                {/* Asc/Desc Toggle */}
                <ToggleButtonGroup
                    value={sortOrder}
                    exclusive
                    onChange={handleSortOrderChange}
                    sx={{ bgcolor: "white", borderRadius: 1, height: "55px" }}
                >
                    <ToggleButton value="asc">
                        <SortIcon sx={{ mr: 1 }} /> Asc
                    </ToggleButton>
                    <ToggleButton value="desc">
                        <SortIcon sx={{ mr: 1, transform: "rotate(180deg)" }} /> Desc
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <MovieList moviesData={moviesData} />
        </div>
    )
}

export default Search