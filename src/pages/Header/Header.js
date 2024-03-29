import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import OffCanvas from '../Cart/OffCanvas/OffCanvas';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Slide, toast } from 'react-toastify';
import { logoutUser } from '../../features/authSlice';
function CollapsibleExample() {
    //This function is for hide navbar after clicking nav-items (here 'collapse navbar-collapse is a bootstrap class)
    const navCollapse = () => {
        document.getElementById('responsive-navbar-nav').className = 'collapse navbar-collapse';
    }
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleLogout = () => {
        toast.success("Logout Successful", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition: Slide,
            theme: "light",
        });
        setTimeout(() => {
            dispatch(logoutUser());
        }, 2000)
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand className='logo-name' as={Link} to='/home'>FEANE</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" id='me-auto'>
                        {
                            (path === '/home/cart' || path === "/login" || path === "/register" || path === "/profile") && <Nav.Link as={Link} to='/home' onClick={() => navCollapse()}>
                                HOME
                            </Nav.Link>
                        }
                        {
                            (path === '/' || path === "/home") && <Nav.Link href="#menu">
                                MENU
                            </Nav.Link>
                        }
                        {
                            (path === '/' || path === "/home") && <Nav.Link href="#about">
                                ABOUT
                            </Nav.Link>
                        }
                        {
                            (path === '/' || path === "/home") && <Nav.Link href="#book-table">
                                BOOK TABLE
                            </Nav.Link>
                        }
                        {
                            userData?.login[0] &&
                            <Nav.Link as={Link} to='/profile' onClick={() => navCollapse()}>
                                PROFILE
                            </Nav.Link>
                        }
                    </Nav>
                    <div className='nav-icons'>
                        {
                            !userData?.login[0] &&
                            <p onClick={() => { navigate("/login"); navCollapse() }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                </svg>
                            </p>
                        }

                        <Nav.Link onClick={() => navCollapse()}>
                            < OffCanvas />
                        </Nav.Link>

                        {
                            userData?.login[0] && <button className='logout-btn' onClick={() => { handleLogout(); navCollapse() }}>Logout <FontAwesomeIcon icon={faRightFromBracket} /></button>
                        }
                        <p onClick={() => navCollapse()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z" clipRule="evenodd" />
                            </svg>
                        </p>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CollapsibleExample;