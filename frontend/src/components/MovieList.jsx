import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Grid, Pagination, Container, Grid2, Box } from "@mui/material";


const MovieList = ({ moviesData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 15;

    const pageCount = Math.ceil(moviesData.length / moviesPerPage);

    // Get movies for current page
    const startIndex = (currentPage - 1) * moviesPerPage;
    const currentMovies = moviesData.slice(startIndex, startIndex + moviesPerPage);

    // Handle page change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>

            {/* Movie Grid */}
            <Grid2 container spacing={3} sx={{ justifyContent: "center" }}>
                {currentMovies.map((movie) => (
                    <Grid2 key={movie.imdbID}>
                        <Card sx={{ width: 200, height: 350, display: "flex", flexDirection: "column" }}>
                            <CardMedia
                                component="img"
                                sx={{ width: "100%", height: 250, objectFit: "cover" }}
                                image={movie.poster}
                                alt={movie.title}
                            />
                            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", overflow: "hidden" }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
                                    {movie.title}
                                </Typography>
                                <Box sx={{ display: "flex", gap: 3, color: "GrayText" }}>
                                    <Typography>{movie.year}</Typography>
                                    <Typography>{movie.duration} m</Typography>
                                    <Typography>⭐{movie.rating}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>

            {/* Pagination */}
            <Grid2 container justifyContent="center" sx={{ mt: 4 }}>
                <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="standard"
                    sx={{
                        '& .MuiPaginationItem-root': { color: 'white' }, // Ensure all items are white
                        '& .Mui-selected': { backgroundColor: 'gray', }, // Highlight selected page
                        '& .MuiPaginationItem-ellipsis': { color: 'white' } // Ensure ellipsis are visible
                    }}
                />
            </Grid2>

        </Container>
    );
};

export default MovieList;
