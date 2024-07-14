import DefaultLayout from "../layouts/defaultlayout";
import "./../styles/storydetails.css";
import { useState, useEffect } from "react";
import StoryItem2 from "./../components/storyitem2";
import { useParams, Link } from "react-router-dom";
import Comment from "./../components/comment";
import { Modal } from "react-bootstrap";

const StoryDetails = () => {
  const [top5Views, setTop5Views] = useState([]);
  const [story, setStory] = useState({});
  const { id } = useParams();
  const [user, setUser] = useState({});
  const username = sessionStorage.getItem("username");
  const [justChanged, setChanged] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");

  //get user information
  useEffect(() => {
    fetch("http://localhost:9999/users?username=" + username)
      .then((response) => response.json())
      .then((json) => setUser(json[0]));
  }, []);

  //get top 5 views
  useEffect(() => {
    fetch("http://localhost:9999/story")
      .then((response) => response.json())
      .then((json) =>
        setTop5Views(json.sort((a, b) => b.views - a.views).slice(0, 4))
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:9999/story/" + id)
      .then((response) => response.json())
      .then((data) => {
        setStory(data);
        setImage(data.image);
      });
  }, []);

  // lay cac thuoc tinh cua story
  const [follower, setFollower] = useState([]);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9999/story/" + id)
      .then((response) => response.json())
      .then((data) => {
        setStory(data);
        setFollower(data.follower);
        setLikes(data.likes);
        setDislikes(data.dislikes);
      });
  }, [justChanged]);

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    checkLogin();
  }, []);

  // Hàm kiểm tra trạng thái đăng nhập
  const checkLogin = () => {
    if (username) {
      setIsLoggedIn(true);
    }
  };

  // Đóng Modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Mở Modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Handle View
  function handleView(e) {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowModal(true);
    } else {
      let views = story.views;
      views++;
      const newStory = { ...story, views };
      if (newStory != null) {
        fetch("http://localhost:9999/story/" + id, {
          method: "PUT",
          headers: { "Content-Type": "Application/Json" },
          body: JSON.stringify(newStory),
        })
          // .then(() => { changed++; setChanged(changed) })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
  }

  // handle follow
  function handleFollow(e, username) {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      setFollower(follower.splice(0, 0, username));
      const newStory = { ...story, follower };
      let changed = justChanged;
      if (newStory != null) {
        fetch("http://localhost:9999/story/" + id, {
          method: "PUT",
          headers: { "Content-Type": "Application/Json" },
          body: JSON.stringify(newStory),
        })
          .then(() => {
            changed++;
            setChanged(changed);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
  }
  // handleUnfollow
  function handleUnFollow(e, username) {
    e.preventDefault();
    const index = follower.indexOf(username);
    if (index > -1) setFollower(follower.splice(index, 1));
    const newStory = { ...story, follower };
    let changed = justChanged;
    if (newStory != null) {
      fetch("http://localhost:9999/story/" + id, {
        method: "PUT",
        headers: { "Content-Type": "Application/Json" },
        body: JSON.stringify(newStory),
      })
        .then(() => {
          changed++;
          setChanged(changed);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  // Handle like
  function handleLike(e, username) {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      setLikes(likes.splice(0, 0, username));
      const index = dislikes.indexOf(username);
      if (index > -1) setDislikes(dislikes.splice(index, 1));
      const newStory = { ...story, likes, dislikes };
      let changed = justChanged;
      if (newStory != null) {
        fetch("http://localhost:9999/story/" + id, {
          method: "PUT",
          headers: { "Content-Type": "Application/Json" },
          body: JSON.stringify(newStory),
        })
          .then(() => {
            changed++;
            setChanged(changed);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
  }

  // Handle Unlike
  function handleUnlike(e, username) {
    e.preventDefault();
    const index = likes.indexOf(username);
    if (index > -1) setLikes(likes.splice(index, 1));
    const newStory = { ...story, dislikes };
    let changed = justChanged;
    if (newStory != null) {
      fetch("http://localhost:9999/story/" + id, {
        method: "PUT",
        headers: { "Content-Type": "Application/Json" },
        body: JSON.stringify(newStory),
      })
        .then(() => {
          changed++;
          setChanged(changed);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  // Handle Dislike
  function handleDislike(e, username) {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      setDislikes(dislikes.splice(0, 0, username));
      const index = likes.indexOf(username);
      if (index > -1) setLikes(likes.splice(index, 1));
      const newStory = { ...story, likes, dislikes };
      let changed = justChanged;
      if (newStory != null) {
        fetch("http://localhost:9999/story/" + id, {
          method: "PUT",
          headers: { "Content-Type": "Application/Json" },
          body: JSON.stringify(newStory),
        })
          .then(() => {
            changed++;
            setChanged(changed);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
  }

  // Handle UnDislike
  function handleUndislike(e, username) {
    e.preventDefault();
    const index = dislikes.indexOf(username);
    if (index > -1) setDislikes(dislikes.splice(index, 1));
    const newStory = { ...story, dislikes };
    let changed = justChanged;
    if (newStory != null) {
      fetch("http://localhost:9999/story/" + id, {
        method: "PUT",
        headers: { "Content-Type": "Application/Json" },
        body: JSON.stringify(newStory),
      })
        .then(() => {
          changed++;
          setChanged(changed);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  // Handle comment
  const [content, setContent] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      const likes = [];
      const dislikes = [];
      const storyId = id;
      const comment = { content, storyId, username, likes, dislikes };
      if (comment != null) {
        fetch("http://localhost:9999/comment", {
          method: "POST",
          headers: { "Content-Type": "Application/Json" },
          body: JSON.stringify(comment),
        })
          .then(() => window.location.reload())
          .catch((err) => {
            console.log(err.message);
          });
      }
      e.target.reset();
    }
  }
  return (
    <DefaultLayout>
      <section className="anime-details spad">
        <div className="container">
          <div className="anime__details__content">
            <div className="row">
              <div className="col-lg-3">
                <div className="anime__details__pic set-bg">
                  {
                    image.length > 0 && (
                      <div class="product__item">
                      <div class="product__item__pic" style={{ backgroundImage: `url(${require("../components/image/" + image)})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                        <div class="ep">{story.currentChap} / {story.totalChap}</div>
                        <div class="like"><i class="bi bi-hand-thumbs-up-fill"></i> {story.likes.length}</div>
                        <div class="view"><i class="bi bi-eye-fill"></i> {story.views}</div>
                      </div>
                    </div>
                    )
                  }
                </div>
              </div>
              <div className="col-lg-9">
                <div className="anime__details__text">
                  <div className="anime__details__title">
                    <h3 className="text-light">{story.storyName}</h3>
                    <span>{story.author}</span>
                  </div>
                  <div className="anime__details__rating">
                    <div className="rating">
                      {likes.includes(username) ? (
                        <a href="/">
                          <i
                            class="bi bi-hand-thumbs-up-fill"
                            onClick={(e) => handleUnlike(e, username)}
                          ></i>
                        </a>
                      ) : (
                        <a href="#">
                          <i
                            class="bi bi-hand-thumbs-up"
                            onClick={(e) => handleLike(e, username)}
                          ></i>
                        </a>
                      )}
                      {dislikes.includes(username) ? (
                        <a href="/">
                          <i
                            class="bi bi-hand-thumbs-down-fill"
                            onClick={(e) => handleUndislike(e, username)}
                          ></i>
                        </a>
                      ) : (
                        <a href="#">
                          <i
                            class="bi bi-hand-thumbs-down"
                            onClick={(e) => handleDislike(e, username)}
                          ></i>
                        </a>
                      )}
                    </div>
                    <span>
                      {likes.length} Likes - {dislikes.length} Dislikes
                    </span>
                  </div>
                  <p>{story.discription}</p>
                  <div className="anime__details__widget">
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <ul>
                          <li>
                            <span>Category:</span> {story.categoryName}
                          </li>
                          <li>
                            <span>Total Chapter:</span> {story.totalChap}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="anime__details__btn">
                    {follower.includes(username) ? (
                      <a
                        href="/"
                        className="follow-btn"
                        onClick={(e) => handleUnFollow(e, username)}
                      >
                        <i class="bi bi-heart-fill"></i> Unfollow
                      </a>
                    ) : (
                      <a
                        href="/"
                        className="follow-btn"
                        onClick={(e) => handleFollow(e, username)}
                      >
                        <i class="bi bi-heart"></i> Follow
                      </a>
                    )}
                    <Link
                      to={`/story/reading/${story.id}`}
                      className="watch-btn"
                      onClick={(e) => handleView(e)}
                    >
                      <span>Read Now</span>
                      <i class="bi bi-chevron-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="anime__details__review">
                <div className="section-title">
                  <h5>Reviews</h5>
                </div>
                <Comment storyId={id} />
              </div>
              <div className="anime__details__form">
                <div className="section-title">
                  <h5>Your Comment</h5>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <textarea
                    placeholder="Your Comment"
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <button type="submit">
                    <i className="fa fa-location-arrow"></i> Review
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="anime__details__sidebar">
                <div className="section-title">
                  <h5>you might like...</h5>
                </div>
                {top5Views.map((story) => (
                  <StoryItem2 story={story} key={story.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chưa đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn cần đăng nhập để sử dụng chức năng năy.</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCloseModal}
          >
            Đóng
          </button>
          <Link to="/login" className="btn btn-primary">
            Đăng nhập
          </Link>
        </Modal.Footer>
      </Modal>
    </DefaultLayout>
  );
};

export default StoryDetails;
