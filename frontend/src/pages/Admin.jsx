import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const Admin = () => {
    const { token } = useAuth()

    // Sample movies data
    const [movies, setMovies] = useState([]);

    const [open, setOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [newMovie, setNewMovie] = useState({ imdbID: "", title: "", year: "", rating: "", duration: "", plot: "", poster: "" })
    const [updateTrigger, setUpdateTrigger] = useState(false);



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
        setMovies(json)
    }
    // Open edit dialog
    const handleEdit = (movie) => {
        setEditingMovie(movie);
        setOpen(true);
    };


    // Handle new movie input change
    const handleNewMovieChange = (e) => {

        setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
        console.log(newMovie)
    };

    // Save edited movie
    const handleSaveEdit = async () => {
        const url = `${import.meta.env.VITE_API}/admin/${editingMovie.imdbID}`
        try {

            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editingMovie)
            })
            let json = await response.json();
            alert(json.message)
        } catch (error) {
            alert("error")
        }
        setOpen(false);
        setUpdateTrigger(prev => !prev);

    };

    // Delete movie
    const handleDelete = async (id) => {
        const url = `${import.meta.env.VITE_API}/admin/${id}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        let json = await response.json();
        alert(json.message)
        setUpdateTrigger(prev => !prev);
    };

    // Add new movie
    const handleAddMovie = async () => {
        if (!newMovie.title || !newMovie.year || !newMovie.rating || !newMovie.duration || !newMovie.plot || !newMovie.poster) return;
        const url = `${import.meta.env.VITE_API}/admin`
        try {

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newMovie)
            })
            let json = await response.json();
            alert(json.message)
        } catch (error) {
            alert("error")
        }
        setUpdateTrigger(prev => !prev);

        setNewMovie({ imdbID: "", title: "", year: "", rating: "", duration: "", plot: "", poster: "" });
    };

    useEffect(() => {
        getAllMovie()
    }, [updateTrigger])


    return (
        <Container >
            <Typography variant="h4" sx={{ color: "white", textAlign: "center", padding: "20px" }} gutterBottom>
                Admin Panel - Manage Movies 🎬
            </Typography>

            {/* Add Movie Section */}
            <Paper sx={{ p: 2, mb: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h6">Add New Movie</Typography>
                <div>

                    <TextField label="Id" name="imdbID" value={newMovie.imdbID} onChange={handleNewMovieChange} sx={{ m: 1 }} />
                    <TextField label="Title" name="title" value={newMovie.title} onChange={handleNewMovieChange} sx={{ m: 1 }} />
                    <TextField label="Year" name="year" value={newMovie.year} onChange={handleNewMovieChange} sx={{ m: 1 }} />
                    <TextField label="Rating" name="rating" value={newMovie.rating} onChange={handleNewMovieChange} sx={{ m: 1 }} />
                    <TextField label="duration" name="duration" value={newMovie.duration} onChange={handleNewMovieChange} sx={{ m: 1 }} />
                    <TextField label="Description" name="plot" value={newMovie.plot} onChange={handleNewMovieChange} sx={{ m: 1 }} />
                    <TextField label="poster" name="poster" value={newMovie.poster} onChange={handleNewMovieChange} sx={{ m: 1 }} />
                </div>
                <Button variant="contained" color="primary" onClick={handleAddMovie}>
                    Add Movie
                </Button>
            </Paper>

            {/* Movies Table */}
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movies.map((movie) => (
                            <TableRow key={movie._id}>
                                <TableCell>{movie.imdbID}</TableCell>
                                <TableCell>{movie.title}</TableCell>
                                <TableCell>{movie.year}</TableCell>
                                <TableCell>{movie.rating}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEdit(movie)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(movie.imdbID)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Movie Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Movie</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        fullWidth
                        value={editingMovie?.title || ""}
                        onChange={(e) => setEditingMovie({ ...editingMovie, title: e.target.value })}
                    />
                    <TextField
                        label="Year"
                        fullWidth
                        value={editingMovie?.year || ""}
                        onChange={(e) => setEditingMovie({ ...editingMovie, year: e.target.value })}
                    />
                    <TextField
                        label="Rating"
                        fullWidth
                        value={editingMovie?.rating || ""}
                        onChange={(e) => setEditingMovie({ ...editingMovie, rating: e.target.value })}
                    />
                    <TextField
                        label="duration"
                        fullWidth
                        value={editingMovie?.duration || ""}
                        onChange={(e) => setEditingMovie({ ...editingMovie, title: e.target.value })}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        value={editingMovie?.plot || ""}
                        onChange={(e) => setEditingMovie({ ...editingMovie, year: e.target.value })}
                    />
                    <TextField
                        label="Poster"
                        fullWidth
                        value={editingMovie?.poster || ""}
                        onChange={(e) => setEditingMovie({ ...editingMovie, rating: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSaveEdit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Container >
    );
};

export default Admin;
