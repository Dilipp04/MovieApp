import './App.css'
import { AuthState } from './context/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import { ProtectedRoute } from './components/ProtectedRoutes'
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search'
import { Layout } from './components/Layout'


function App() {
  return (
    <AuthState>
      <BrowserRouter>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/search" element={<Layout><Search /></Layout>} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/admin"
              element={
                <Layout>
                  <Admin />
                </Layout>
              }
            />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;