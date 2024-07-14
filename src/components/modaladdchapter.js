import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalAddChapter(props) {
  const [content, setContent] = useState("");
  const [currentChap, setCurrentChap] = useState(1);
  const [chapters, setChapters] = useState([]);

  let { show, handleClose, story } = props;

  useEffect(() => {
    fetch("http://localhost:9999/chapter")
      .then((res) => res.json())
      .then((data) => {
        const dataChapter = data.filter(
          (chapter) => chapter.storyId === parseInt(story.id)
        );
        setChapters(dataChapter);
      });
  }, [story]);

  const validate = () => {
    let isValid = true;
    let duplicateChapter = chapters.filter((chapter) => {
      return parseInt(chapter.chapterName.slice(-1)) === currentChap;
    });
    if (content.length === 0) {
      isValid = false;
    } else if (currentChap < 1 || currentChap > story.totalChap) {
      isValid = false;
    } else if (duplicateChapter.length > 0) {
      isValid = false;
    }
    return isValid;
  };

  const addChapter = (objNewChapter) => {
    if (objNewChapter != null) {
      fetch("http://localhost:9999/chapter", {
        method: "POST",
        body: JSON.stringify(objNewChapter),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(() => {
        // navigate("/");
      });
    }
  };

  const addNotification = (objNewNotification) => {
    if (objNewNotification != null) {
      fetch("http://localhost:9999/notification", {
        method: "POST",
        body: JSON.stringify(objNewNotification),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(() => {
        // navigate("/");
      });
    }
  };

  const handleAdd = (e) => {
    const valid = validate();
    if (valid) {
      const newChapter = {
        storyId: story.id,
        chapterName: "chapter " + +currentChap,
        content: content,
      };

      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, "0");
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const year = currentDate.getFullYear().toString();
      const formattedDate = `${day}-${month}-${year}`;
      const newNotification = {
        userIds: story.follower,
        content: `Truyện mà bạn đang quan tâm ${story.storyName} đã ra mắt chương mới, cùng đọc ngay thôi nào !!!`,
        storyId: story.id,
        timeCreated: formattedDate,
        isRead: 0,
      };
      addChapter(newChapter);
      addNotification(newNotification);
      //   addStoryRef.current(storyObj);
      handleClose();
      toast.success("Successfully !");
    } else if (!valid) {
      toast.error("Please enter again !");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <ToastContainer />
        <Modal.Header closeButton>
          <Modal.Title>Add New Story</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col xs={12}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Story Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Example: Bảy Chú Lùn"
                  style={{ width: "100%" }}
                  required
                  value={story.storyName}
                />
              </Form.Group>
              <Row>
                <Col xs={6}>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>
                      Chapter<span style={{ color: "red" }}> *</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Example: 10"
                      style={{ width: "100%" }}
                      required
                      onChange={(e) => setCurrentChap(parseInt(e.target.value))}
                    />
                    {(currentChap < 1 || currentChap > story.totalChap) && (
                      <Form.Text className="text-danger">
                        Chapter in range 1-{story.totalChap}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => setContent(e.target.value)}
                />
                {content.length === 0 && (
                  <Form.Text className="text-danger">Enter content</Form.Text>
                )}
              </Form.Group>
              {/* </Form> */}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddChapter;
