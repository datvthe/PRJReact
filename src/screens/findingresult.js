import { useEffect, useState } from "react";
import Content from "../components/content";
import DefaultLayout from "../layouts/defaultlayout";
import { Link } from "react-router-dom";

export default function FindingResult() {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [story, setStory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9999/story")
      .then((response) => response.json())
      .then((json) => setStory(json));
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setIsSearching(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearching(true);
  };

  const filteredStories = story.filter(s =>
    s.storyName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const displayedStories = isSearching ? filteredStories : [];
  return (
    <DefaultLayout>
      <section className="product spad">
        <div class="row">
          <div class="col-lg-8">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8">
                <div className="section-title">
                  <h4>Search Results</h4>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4" style={{ marginLeft: '50%', marginBottom: '30px' }}>
                  <form onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      placeholder="Search stories..."
                      value={searchValue}
                      onChange={handleSearchChange}
                    />
                    <button type="submit">Search</button>
                  </form>
                </div>
              </div>

            </div>
            <div className="row">
              {displayedStories.map(s => (
                <div className="col-lg-4 col-md-6 col-sm-6" key={s.id}>
                  <div className="product__item" >
                    <div class="product__item">
                      <div
                        class="product__item__pic"
                        style={{
                          backgroundImage: `url(${require("../components/image/" +
                            s.image)})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        <div class="ep">
                          {s.currentChap} / {s.totalChap}
                        </div>
                        <div class="like">
                          <i class="bi bi-hand-thumbs-up-fill"></i>{" "}
                          {s.likes.length}
                        </div>
                        <div class="view">
                          <i class="bi bi-eye-fill"></i> {s.views}
                        </div>
                      </div>
                      <div class="product__item__text">
                        <h5>
                          <Link to={`/story/${s.id}`}>{s.storyName}</Link>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-8">
            <div class="product__sidebar">
              <div class="product__sidebar__view">
                <div class="section-title">
                  <h5>Top Likes Of Week</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  )
}