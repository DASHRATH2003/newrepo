import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo4.jpg';

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar sticky-top  bg-white">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" width="100" height="100" className="me-2" />
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            {/* Home */}
            <li className="nav-item">
              <Link className="nav-link text-dark custom-hover-red" to="/">
                <i className="fas fa-home me-1"></i>HOME
              </Link>
            </li>

            {/* Jobs */}
            <li className="nav-item">
              <Link className="nav-link text-dark custom-hover-red" to="/jobs">
                <i className="fas fa-briefcase me-1"></i> JOBS
              </Link>
            </li>

            {/* About Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-dark custom-hover-red"
                href="#"
                id="aboutDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user me-1"></i> ABOUT
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="aboutDropdown">
                {/* <li>
                  <Link className="dropdown-item" to="/about">Overview</Link>
                </li> */}
                <li>
                  <Link className="dropdown-item" to="/about/mission">Mission & Values</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/about/company">Our Company</Link>
                </li>
              </ul>
            </li>


            {/* Services Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-dark custom-hover-red"
                href="#"
                id="servicesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-cogs me-1"></i> SERVICES
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="servicesDropdown">
                <li>
                  <Link className="dropdown-item" to="/services/staffing">Staffing Solutions</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/services/compliance">HR & Statutory Compliance</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/services/industries">Industries We Serve</Link>
                </li>
              </ul>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <Link className="nav-link text-dark custom-hover-red" to="/contact">
                <i className="fas fa-phone-alt me-1"></i> CONTACT
              </Link>
            </li>

            {/* Search */}
            <li className="nav-item">
              <button
                className="btn btn-link nav-link text-dark custom-hover-red"
                onClick={toggleSearch}
              >
                <i className="fas fa-search"></i>
              </button>
            </li>
          </ul>

          {/* Search Box */}
          {showSearch && (
            <form
              className="d-flex ms-2"
              onSubmit={handleSearchSubmit}
              style={{ maxWidth: '200px' }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
