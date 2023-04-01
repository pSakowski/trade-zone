import { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink } from 'reactstrap';
import { useSelector } from 'react-redux';
import styles from './NavBar.module.scss';
import { getUser } from '../../../redux/usersRedux';



const NavBar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector(getUser);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          <span className={styles['navbar-brand']}>Bulletin Board</span>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="justify-content-end flex-grow-1 pe-3" navbar>
            <NavLink href="/">Home</NavLink>
            {!isLoggedIn && <NavLink href="/login">Sign in</NavLink>}
            {isLoggedIn && <NavLink href="/logout">Sign out</NavLink>}
            {isLoggedIn && <NavLink href="/ad/add" className="btn btn-success ms-3">Add Ad</NavLink>}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;