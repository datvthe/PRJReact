import "../styles/defaultlayout.css";

export default function Footer() {
  return (
    // <div className="container fluid">
    //     <div className="row">
    //         <div className="col-12">Footer</div>
    //     </div>
    // </div>

    <footer className="footer">
      <div className="page-up">
        <a href="#" id="scrollToTopButton">
          <i class="bi bi-chevron-bar-up"></i>
        </a>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="footer__logo">
              <a href="/">
                <img src={require("./image/logo.png")} alt="" />
              </a>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            {/* <div className="footer__nav">
              <ul>
                <li className="active">
                  <a href="./index.html">Homepage</a>
                </li>
                <li>
                  <a href="./categories.html">Categories</a>
                </li>
                <li>
                  <a href="./blog.html">Our Blog</a>
                </li>
                <li>
                  <a href="#">Contacts</a>
                </li>
              </ul>
            </div> */}
            <div>
              <i className="fa fa-map-marker"></i>
              <p className="text-light">
                <span className="text-light"> Street name and number</span>{" "}
                City, Country
              </p>
            </div>
            <div>
              <i className="fa fa-phone" aria-hidden="true"></i>
              <p className="text-light"> (+00) 0000 000 000</p>
            </div>
            <div>
              <i className="fa fa-envelope"></i>
              <p className="text-light">
                <a href="#"> office@company.com</a>
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <p>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              Copyright &copy;
              <script>document.write(new Date().getFullYear());</script> All
              rights reserved | This template is made with{" "}
              <i className="fa fa-heart" aria-hidden="true"></i> by <br />
              <a href="/" target="_blank">
                Colorlib
              </a>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            </p>
          </div>
        </div>
      </div>
    </footer >
  );
}
