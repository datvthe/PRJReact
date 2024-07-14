import DefaultLayout from "../layouts/defaultlayout";
import img1 from "../assets/images/1.jpg";
import img2 from "../assets/images/2.jpg";
import img3 from "../assets/images/3.jpg";
import img4 from "../assets/images/4.jpg";
import img5 from "../assets/images/5.jpg";
import img6 from "../assets/images/6.jpg";
import img7 from "../assets/images/7.jpg";
import "./../styles/about.css";

export default function AboutUs() {
  return (
    <DefaultLayout className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="wrapper_img_about">
            <img src={img1} alt="" />
          </div>
        </div>
        <div className="col-md-8">
          <div className="wrapper_content">
            <div class="section-title">
              <h4>Some information about our website</h4>
            </div>

            <div class="product__item__text">
              <h5 className="text-light">
                Project Building an online reading website is expected to
                provide a convenient and easily accessible platform for users to
                read and search for stories easily. The website will provide a
                user-friendly interface and rich features to enhance the user
                experience.
              </h5>
            </div>

            <div class="product__item__text">
              <h5 className="text-light">
                The vision of the <span className="text-danger">StoryWeb</span>{" "}
                project is to create an engaging and user-friendly platform that
                allows readers to immerse themselves in a huge collection of
                stories of various genres. Our goal is to provide a seamless and
                enjoyable reading experience that caters to readers of all ages
                and interests. By offering a wide variety of stories, we aim to
                foster a vibrant community of readers who can connect, discuss.
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="row wrapper__introduction">
        <div class="section-title">
          <h4>Introduction</h4>
        </div>
      </div>
      <div className="row p-0 image-gallery-wrapper">
        <div className="col-md-12 h-100">
          <div className="row h-50">
            <div className="col-md-6 h-100">
              <div className="wrapper_img_about">
                <img src={img2} alt="" />
              </div>
            </div>
            <div className="col-md-3 h-100">
              <div className="wrapper_img_about">
                <img src={img3} alt="" />
              </div>
            </div>
            <div className="col-md-3 h-100">
              <div className="wrapper_img_about">
                <img src={img4} alt="" />
              </div>
            </div>
          </div>
          <div className="row h-50">
            <div className="col-md-3 h-100">
              <div className="wrapper_img_about">
                <img src={img5} alt="" />
              </div>
            </div>
            <div className="col-md-3 h-100">
              <div className="wrapper_img_about">
                <img src={img6} alt="" />
              </div>
            </div>
            <div className="col-md-6 h-100">
              <div className="wrapper_img_about">
                <img src={img7} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
