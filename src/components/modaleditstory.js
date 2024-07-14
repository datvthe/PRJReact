import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalEditStory(props) {
  let { show, handleClose, story, editStoryRef } = props;
  console.log(story);
  const [categories, setCategories] = useState([]);
  const [storyName, setStoryName] = useState("");
  const [author, setAuthor] = useState("");
  //   const [storyName, setStoryName] = useState(story.storyName);
  //   const [author, setAuthor] = useState(story.author);
  //   console.log(storyName);
  //   console.log(author);
  const [categoryName, setCategoryName] = useState("");
  const [totalChap, setTotalChap] = useState(0);
  const [discription, setDiscription] = useState("");
  const [image, setImage] = useState("");

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
    console.log(image);
    console.log(file);
  };

  useEffect(() => {
    if (show && story) {
      setStoryName(story.storyName);
      setAuthor(story.author);
      setCategoryName(story.categoryName);
      setTotalChap(story.totalChap);
      setDiscription(story.discription);
      // Set the image value based on the existing story's image property
      const imageFile = new File([], story.image);
      console.log(imageFile);
      //   imageFile.preview = `http://localhost:9999/images/${story.image}`;
      setImage(imageFile);
      console.log(image);
    }
  }, [show, story]);

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

  const handleUpdate = (e) => {
    const valid = validate();
    if (valid) {
   
        story.image = image.name;
        story.storyName = storyName;
        story.categoryName = categoryName;
        story.author = author;
        story.discription = discription;
        story.totalChap = totalChap;
        console.log(story);
      updateAPI(story.id);
      editStoryRef.current(story);
      handleClose();
      toast.success("Successfully !");
    } else if (!valid) {
      toast.error("Please enter again !");
    }
  };

  const updateAPI = (id) => {
    fetch(`http://localhost:9999/story/${id}`, {
      method: "PATCH" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        storyName: storyName,
        image: image.name,
        author: author,
        categoryName: categoryName,
        discription: discription,
        totalChap: totalChap
      }),
    })
      .then((res) => res.json())
      .then(console.log);
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
                  value={storyName}
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
                  value={author}
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
                      value={totalChap}
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
                      value={categoryName}
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
                  value={discription}
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
          <Button variant="primary" onClick={handleUpdate}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditStory;
