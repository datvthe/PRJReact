import DefaultLayout from "../layouts/defaultlayout";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/storydetails.css";
import StoryItem2 from "../components/storyitem2";

export default function Categories() {
  const [story, setStory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9999/story")
      .then((response) => response.json())
      .then((json) => setStory(json));
  }, []);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9999/category")
      .then((response) => response.json())
      .then((json) => setCategory(json));
  }, []);

  //get top 5 views
  const [top5Views, setTop5Views] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9999/story")
      .then((response) => response.json())
      .then((json) =>
        setTop5Views(json.sort((a, b) => b.views - a.views).slice(0, 4))
      );
  }, []);

  const handleOrderChange = (e) => {
    const orderValue = e.target.value;

    if (orderValue === "likes") {
      const sortedStories = [...story].sort((a, b) => {
        return b.likes.length - a.likes.length;
      });

      setStory(sortedStories);
    }

    const orderValueName = e.target.value;

    if (orderValueName === "sortname") {
      const sortedStories = [...story].sort((a, b) => {
        const nameA = a.storyName.toLowerCase();
        const nameB = b.storyName.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      setStory(sortedStories);
    }

    const orderValueViews = e.target.value;

    if (orderValueViews === "views") {
      const sortedStories = [...story].sort((a, b) => {
        return b.views - a.views;
      });

      setStory(sortedStories);
    }
  };

  return (
    <DefaultLayout>
      <section class="product-page spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              {category.map((cate) => (
                <div className="product__page__content">
                  <div className="product__page__title">
                    <div className="row">
                      <div className="col-lg-8 col-md-8 col-sm-6">
                        <div className="section-title">
                          <h4>{cate.categoryName}</h4>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="product__page__filter">
                          Order by:
                          <select onChange={handleOrderChange} style={{ marginLeft: "5px" }}>
                            <option value="sortname">A-Z</option>
                            <option value="likes">Likes</option>
                            <option value="views">Views</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {story.map((s) => {
                      if (s.categoryName === cate.categoryName) {
                        return (
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="product__item">
                              <div
                                className="product__item__pic"
                                style={{
                                  backgroundImage: `url(${require("../components/image/" +
                                    s.image)})`,
                                  backgroundPosition: "center",
                                  backgroundSize: "cover",
                                  backgroundRepeat: "no-repeat",
                                }}
                              >
                                <div className="ep">
                                  {s.currentChap} / {s.totalChap}
                                </div>
                                <div className="like">
                                  <i class="bi bi-hand-thumbs-up-fill"></i>{" "}
                                  {s.likes.length}
                                </div>
                                <div className="view">
                                  <i class="bi bi-eye-fill"></i> {s.views}
                                </div>
                              </div>
                              <div className="product__item__text">
                                <h5>
                                  <Link to={`/story/${s.id}`}>
                                    {s.storyName}
                                  </Link>
                                </h5>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              ))}

            </div>
            <div class="col-lg-4 col-md-6 col-sm-8">
              <div class="product__sidebar">
                <div class="product__sidebar__view">
                  <div class="section-title">
                    <h5>Top Views</h5>
                  </div>
                  {top5Views.map((story) => (
                    <StoryItem2 story={story} key={story.id} />
                  ))}
                </div>
                <div class="product__sidebar__comment">
                  <div class="section-title" style={{ marginTop: "5rem" }}>
                    <h5>Top Comments</h5>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
