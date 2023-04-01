import { Route, Routes } from 'react-router-dom';
import { Container } from 'reactstrap';

// import routes
import NavBar from './components/views/NavBar/NavBar'
import Footer from './components/views/Footer/Footer'
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import Ad from './components/features/Ad/Ad';
import AdAdd from './components/features/AdAdd/AdAdd';
import AdEdit from './components/features/AdEdit/AdEdit';
import AdRemove from './components/features/AdRemove/AdRemove';
import Search from './components/features/Search/Search';
import Login from './components/pages/Login/Login';
import Register from './components/features/Register/Register';
import Logout from './components/features/Logout/Logout';

function App() {

  return (
    <Container>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ad/:id" element={<Ad />} />
        <Route path="/ad/add" element={<AdAdd />} />
        <Route path="/ad/edit/:id" element={<AdEdit />} />
        <Route path="/ad/remove/:id" element={<AdRemove />} />
        <Route path="/search/:searchPhrase" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  )
}

export default App;