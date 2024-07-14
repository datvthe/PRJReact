import { useEffect, useState } from "react";
import Content from "../components/content";
import DefaultLayout from "../layouts/defaultlayout";
import { Link } from "react-router-dom";
import StoryItem3 from "../components/storyitem3";
import StoryItem2 from "../components/storyitem2";

export default function Home() {
  const [story, setStory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9999/story")
      .then((response) => response.json())
      .then((json) => setStory(json));
  }, []);

  //get top 5 likes
  const [top5Liked, setTop5Liked] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9999/story")
      .then((response) => response.json())
      .then((json) =>
        setTop5Liked(json.sort((a, b) => b.likes.length - a.likes.length).slice(0, 5))
      );
  }, []);


  return (
    <DefaultLayout>
      <Content></Content>
      <section className="product spad">
        <div class="row">
          <div class="col-lg-8">
            <div class="trending__product">
              <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="section-title">
                    <h4>Trending Now</h4>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                  <div class="btn__all">
                    <Link to="/categories" class="primary-btn">
                      View All <span class="arrow_right"></span>
                    </Link>
                  </div>
                </div>
              </div>
              <div class="row">
                {
                  story.map(s => {
                    if (s.id <= 6) {
                      return (
                        <div class="col-lg-4 col-md-6 col-sm-6">
                          <div class="product__item">
                            <div class="product__item__pic" style={{ backgroundImage: `url(${require("../components/image/" + s.image)})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                              <div class="ep">{s.currentChap} / {s.totalChap}</div>
                              <div class="like"><i class="bi bi-hand-thumbs-up-fill"></i> {s.likes.length}</div>
                              <div class="view"><i class="bi bi-eye-fill"></i> {s.views}</div>
                            </div>
                            <div class="product__item__text">
                              <h5><Link to={`/story/${s.id}`}>{s.storyName}</Link></h5>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                }
              </div>
            </div>
            <div class="popular__product">
              <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="section-title">
                    <h4>Popular</h4>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                  <div class="btn__all">
                    <Link to="/categories" class="primary-btn">
                      View All <span class="arrow_right"></span>
                    </Link>
                  </div>
                </div>
              </div>
              <div class="row">
                {
                  story.map(s => {
                    if (s.id > 6 && s.id <= 12) {
                      return (
                        <div class="col-lg-4 col-md-6 col-sm-6">
                          <div class="product__item">
                            <div class="product__item__pic" style={{ backgroundImage: `url(${require("../components/image/" + s.image)})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                              <div class="ep">{s.currentChap} / {s.totalChap}</div>
                              <div class="like"><i class="bi bi-hand-thumbs-up-fill"></i> {s.likes.length}</div>
                              <div class="view"><i class="bi bi-eye-fill"></i> {s.views}</div>
                            </div>
                            <div class="product__item__text">
                              <h5><Link to={`/story/${s.id}`}>{s.storyName}</Link></h5>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                }
              </div>
            </div>
            <div class="recent__product">
              <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="section-title">
                    <h4>Recently Added</h4>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                  <div class="btn__all">
                    <Link to="/categories" class="primary-btn">
                      View All <span class="arrow_right"></span>
                    </Link>
                  </div>
                </div>
              </div>
              <div class="row">
                {
                  story.map(s => {
                    if (s.id >= 13 && s.id <= 18) {
                      return (
                        <div class="col-lg-4 col-md-6 col-sm-6">
                          <div class="product__item">
                            <div class="product__item__pic" style={{ backgroundImage: `url(${require("../components/image/" + s.image)})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                              <div class="ep">{s.currentChap} / {s.totalChap}</div>
                              <div class="like"><i class="bi bi-hand-thumbs-up-fill"></i> {s.likes.length}</div>
                              <div class="view"><i class="bi bi-eye-fill"></i> {s.views}</div>
                            </div>
                            <div class="product__item__text">
                              <h5><Link to={`/story/${s.id}`}>{s.storyName}</Link></h5>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                }
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-8">
            <div class="product__sidebar">
              <div class="product__sidebar__view">
                <div class="section-title">
                  <h5>Top Likes</h5>
                </div>
                {top5Liked.map((story) => (
                  <StoryItem3 story={story} key={story.id} />
                ))}
              </div>
              <div class="product__sidebar__view" style={{ marginTop: "5rem" }} >
                <div class="section-title">
                  <h5>Top Views</h5>
                </div>
                {top5Liked.map((story) => (
                  <StoryItem2 story={story} key={story.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout >
  );
}
