import React, { useState } from 'react'
import "./Header.css";
import { Link, useNavigate } from 'react-router-dom';



const Header = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const path = location.pathname;
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else (
      navigate(`/products`)
    )
  }

  const delayInSeconds = 0;

  const reloadPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, delayInSeconds * 1000);
  };
  // const { user, isAuthenticated, loading } = useState((state) => state.user);
  return (
    <div class="main-navbar shadow-sm sticky-top">
      <div class="top-navbar">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
              <h5 class="brand-name"><a className="logo" href='/'>OutfitZen</a></h5>
            </div>
            <div class="col-md-5 my-auto">
              <form role="search" onSubmit={handleSubmit}>
                <div class="input-group">
                  <input type="search" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search your product" class="form-control" />
                  <button class="btn bg-white" type="submit">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
            <div class="col-md-5 my-auto">
              <ul class="nav justify-content-end">

                <li class="nav-item">
                  <a class="nav-link" href="/cart">
                    <i class="fa fa-shopping-cart"></i> Cart
                  </a>
                </li>
                {/* <li class="nav-item">
                    <a class="nav-link" href="#">
                      <i class="fa fa-heart"></i> Wishlist
                    </a>
                  </li> */}
                {/* {isAuthenticated === false ? (
                    <li class="nav-item">
                      <a class="nav-link" href="/login">
                        <i class="fa fa-heart"></i> Loging/Singup
                      </a>
                    </li>
                  ) : (
                    <li class="nav-item">
                      <a class="nav-link" href="/account">
                      Account
                      </a>
                    </li>
                  )} */}
                <li class="nav-item">
                  <Link class="nav-link" to="/account">
                    <i class="fa fa-user"></i>
                    Account
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand d-block d-sm-block d-md-none d-lg-none logo" href="/">
            Outfitzen
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/products">All Categories</a>

              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/products?category=Men" onClick={reloadPage}>Men</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/products?category=Women" onClick={reloadPage}>Women</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/products?category=Kid" onClick={reloadPage}>Kid</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/products?category=Furniture" onClick={reloadPage}>Furniture</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/products?category=Electronic" onClick={reloadPage}>Electronic</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/products?category=New Arrival" onClick={reloadPage}>New Arrival</Link>
              </li>
              {/* <li class="nav-item">
                  <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Appliances</a>
                </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header