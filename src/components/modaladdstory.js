import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalAddStory(props) {
  const [categories, setCategories] = useState([]);
  const [storyName, setStoryName] = useState("");
  const [author, setAuthor] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [totalChap, setTotalChap] = useState(0);
  const [discription, setDiscription] = useState("");
  const [image, setImage] = useState("");

  let { show, handleClose, addStoryRef } = props; 

  useEffect(() => {
    fetch("http://localhost:9999/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
    if (!show) {
      setImage("");
    }
  }, []);

  useEffect(() => {
    return () => image && URL.revokeObjectURL(image.preview);
  }, [image]);

  const handleLoadImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file);
  };

  const validate = () => {
    let isValid = true;
    if (storyName.length === 0) {
      isValid = false;
    } else if (author.length === 0) {
      isValid = false;
    } else if (categoryName.length === 0) {
      isValid = false;
    } else if (discription.length === 0) {
      isValid = false;
    } else if (image.length === 0) {
      isValid = false;
    } else if (totalChap < 1 || totalChap > 30) {
      isValid = false;
    } 
    return isValid;
  };

  const addStory = (story) => {
    if (story != null) {
      fetch("http://localhost:9999/story", {
        method: "POST",
        body: JSON.stringify(story),
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
      const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    const formattedDate = `${day}-${month}-${year}`;

      const storyObj = {
        image: image.name,
        storyName: storyName,
        author: author,
        categoryName: categoryName,
        discription: discription,
        postDate: formattedDate,
        currentChap: 1,
        dislikes: 0,
        likes: 0,
        totalChap: totalChap,
        views: 0
      }
      addStory(storyObj);
      addStoryRef.current(storyObj);
      handleClose();
      toast.success('Successfully !');
    } else if(!valid) {
      toast.error('Please enter again !');
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
              {/* <Form
                onSubmit={(e) => handleSubmit(e)}
                className="d-flex justify-content-start"
              > */}

              {image && (
                <div
                  className="wrapper_img text-center d-flex justify-content-center w-100"
                  style={{
                    alignItems: "center",
                    maxHeight: "15rem",
                  }}
                >
                  <img
                    src={require("../components/image/" + image.name)}
                    alt="Story"
                    style={{
                      borderRadius: "10px",
                      boxShadow: "2px 2px gray",
                      width: "50%",
                    }}
                  />
                </div>
              )}

              <Form.Group className="mb-3" controlId="">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Example: Bảy Chú Lùn"
                  style={{ width: "100%" }}
                  onChange={handleLoadImage}
                  required
                />
                {image.length === 0 && (
                  <Form.Text className="text-danger">
                    please load image
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="">
                <Form.Label>Story Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Example: Bảy Chú Lùn"
                  style={{ width: "100%" }}
                  required
                  onChange={(e) => setStoryName(e.target.value)}
                />
                {storyName.length === 0 && (
                  <Form.Text className="text-danger">
                    Emter name of story
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>
                  Author<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Example: Nguyễn Văn A"
                  style={{ width: "100%" }}
                  required
                  onChange={(e) => setAuthor(e.target.value)}
                />
                {author.length === 0 && (
                  <Form.Text className="text-danger">Enter author</Form.Text>
                )}
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
                      onChange={(e) => setTotalChap(parseInt(e.target.value))}
                    />
                    {(totalChap < 1 || totalChap > 30) && (
                      <Form.Text className="text-danger">
                        Chapter in range 1-30
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="formGridState">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      onChange={(e) => setCategoryName(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.categoryName}>
                          {category.categoryName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => setDiscription(e.target.value)}
                />
                {discription.length === 0 && (
                  <Form.Text className="text-danger">
                    Enter description
                  </Form.Text>
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

export default ModalAddStory;
