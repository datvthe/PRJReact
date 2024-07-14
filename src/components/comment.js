import { useEffect, useState } from "react";
import "../styles/storydetails.css"
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const Comment = (storyId) => {
  const [comment, setComment] = useState([]);
  const [user, setUser] = useState([]);
  const [justChanged, setChanged] = useState(0);
  let countComment = 0;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetch('http://localhost:9999/comment')
      .then(response => response.json())
      .then(json => setComment(json))
  }, [justChanged])

  useEffect(() => {
    fetch('http://localhost:9999/users')
      .then(response => response.json())
      .then(json => setUser(json))
  }, [])

  const [content, setContent] = useState('');
  const username = sessionStorage.getItem("username");
  function handleSubmit(e, replyFor) {
    e.preventDefault();
    const likes = [];
    const dislikes = [];
    const replyComment = { content, replyFor, username, likes, dislikes };
    const form = document.getElementById("reply_form_" + replyFor);
    let changed = justChanged
    if (replyComment != null) {
      fetch('http://localhost:9999/comment', {
        method: "POST",
        headers: { "Content-Type": "Application/Json" },
        body: JSON.stringify(replyComment)
      })
        .then(() => { changed++; setChanged(changed) })
        .catch(err => console.log(err.message))
    }
    form.style.display = "none";
    e.target.reset();
  }

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
  }

  function reply(e, id) {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      const form = document.getElementById("reply_form_" + id);
      if (form.style.display === "block") {
        form.style.display = "none";
      } else {
        form.style.display = "block";
      }
    }
  }

  // Handle like
  function handleLike(e, username, comment) {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      comment.likes.splice(0, 0, username);
      const index = comment.dislikes.indexOf(username);
      if (index > -1)
        comment.dislikes.splice(index, 1);
      let changed = justChanged
      if (comment != null) {
        fetch("http://localhost:9999/comment/" + comment.id, {
          method: 'PUT',
          headers: { 'Content-Type': 'Application/Json' },
          body: JSON.stringify(comment)
        })
          .then(() => { changed++; setChanged(changed) })
          .catch(err => { console.log(err.message); })
      }
    }
  }

  // Handle Unlike
  function handleUnlike(e, username, comment) {
    e.preventDefault();
    const index = comment.likes.indexOf(username);
    if (index > -1)
      comment.likes.splice(index, 1);
    let changed = justChanged
    if (comment != null) {
      fetch("http://localhost:9999/comment/" + comment.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'Application/Json' },
        body: JSON.stringify(comment)
      })
        .then(() => { changed++; setChanged(changed) })
        .catch(err => { console.log(err.message); })
    }
  }

  // Handle Dislike
  function handleDislike(e, username, comment) {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      comment.dislikes.splice(0, 0, username);
      const index = comment.likes.indexOf(username);
      if (index > -1)
        comment.likes.splice(index, 1);
      let changed = justChanged
      if (comment != null) {
        fetch("http://localhost:9999/comment/" + comment.id, {
          method: 'PUT',
          headers: { 'Content-Type': 'Application/Json' },
          body: JSON.stringify(comment)
        })
          .then(() => { changed++; setChanged(changed) })
          .catch(err => { console.log(err.message); })
      }
    }
  }

  // Handle UnDislike
  function handleUndislike(e, username, comment) {
    e.preventDefault();
    const index = comment.dislikes.indexOf(username);
    if (index > -1)
      comment.dislikes.splice(index, 1);
    let changed = justChanged
    if (comment != null) {
      fetch("http://localhost:9999/comment/" + comment.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'Application/Json' },
        body: JSON.stringify(comment)
      })
        .then(() => { changed++; setChanged(changed) })
        .catch(err => { console.log(err.message); })
    }
  }

  return (
    <div className="row">
      {
        comment.map(cmt => {
          if (cmt.storyId == storyId.storyId) {
            countComment = 1;
            return (
              <div className="anime__review__item">
                <div className="anime__review__item__pic">
                  {user.map(u => { if (u.username === cmt.username) return (<img src={require("../components/image/" + u.image)} alt="" />) })}
                </div>
                <div className="anime__review__item__text">
                  <h6>
                    {cmt.username}
                  </h6>
                  <p>
                    {cmt.content}
                  </p>
                  <div>
                    {
                      cmt.likes.includes(username) ? (<a href="#"><i class="bi bi-hand-thumbs-up-fill" onClick={e => handleUnlike(e, username, cmt)}></i>{cmt.likes.length}</a>) : (<a href="#"><i class="bi bi-hand-thumbs-up" onClick={e => handleLike(e, username, cmt)}></i>{cmt.likes.length}</a>)
                    }
                    {
                      cmt.dislikes.includes(username) ? (<a href="#"><i class="bi bi-hand-thumbs-down-fill" onClick={e => handleUndislike(e, username, cmt)}></i>{cmt.dislikes.length}</a>) : (<a href="#"><i class="bi bi-hand-thumbs-down" onClick={e => handleDislike(e, username, cmt)}></i>{cmt.dislikes.length}</a>)
                    }
                    <a href="#" onClick={(e) => reply(e, cmt.id)} id="reply_a">Reply</a>
                  </div>
                </div>
                {
                  comment.map(cmt2 => {
                    if (cmt.id == cmt2.replyFor) {
                      return (
                        <div className="anime__review__item reply">
                          <div className="anime__review__item__pic">
                            {user.map(u => { if (u.username === cmt2.username) return (<img src={require("../components/image/" + u.image)} alt="" />) })}
                          </div>
                          <div className="anime__review__item__text">
                            <h6>
                              {cmt2.username}
                            </h6>
                            <p>
                              {cmt2.content}
                            </p>
                            <div>
                              {
                                cmt2.likes.includes(username) ? (<a href="#"><i class="bi bi-hand-thumbs-up-fill" onClick={e => handleUnlike(e, username, cmt2)}></i>{cmt2.likes.length}</a>) : (<a href="#"><i class="bi bi-hand-thumbs-up" onClick={e => handleLike(e, username, cmt2)}></i>{cmt2.likes.length}</a>)
                              }
                              {
                                cmt2.dislikes.includes(username) ? (<a href="#"><i class="bi bi-hand-thumbs-down-fill" onClick={e => handleUndislike(e, username, cmt2)}></i>{cmt2.dislikes.length}</a>) : (<a href="#"><i class="bi bi-hand-thumbs-down" onClick={e => handleDislike(e, username, cmt2)}></i>{cmt2.dislikes.length}</a>)
                              }
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })
                }
                <div className="anime__review__item reply__form" id={"reply_form_" + cmt.id}>
                  <form onSubmit={e => handleSubmit(e, cmt.id)}>
                    <div className="anime__review__item reply__input">
                      <textarea placeholder="Reply here" id="reply" onChange={e => setContent(e.target.value)}></textarea>
                      <button type="submit"><i class="bi bi-send-fill"></i></button>
                    </div>
                  </form>
                </div>
              </div>
            )
          }
        })
      }
      {countComment == 0 ? (<h6>Hiện chưa có bình luận nào Hãy là người bình luận đầu tiên</h6>) : ""}
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
    </div>
  )



};

export default Comment