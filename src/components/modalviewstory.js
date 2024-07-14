import { useState } from "react";
import { Container, Modal, Button, Row, Col } from "react-bootstrap";
import StoryItem1 from "./storyitem1";
function ModalViewStory(props) {
  const { show, handleClose, story } = props;
  console.log(story);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Story</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Row>
              <StoryItem1 s={story} className="col-lg-6 col-md-6 col-sm-6" />
              <Col xs={6}>
                <ul>
                  <li className="list-group-item">
                  <i class="bi bi-bookmark-dash-fill text-warning"></i>
                    <span className="text-dark mx-1">Category:</span> <span className="text-dark">{story.categoryName}</span>
                  </li>
                  <li className="list-group-item my-3">
                  <i class="bi bi-person-bounding-box text-warning"></i>
                    <span className="text-dark mx-1">Author:</span> 
                    <span className="text-dark">{story.author}</span>
                  </li>
                  <li className="list-group-item my-3">
                  <i class="bi bi-book text-warning"></i>
                    <span className="text-dark mx-1">Total Chapter:</span> 
                    <span className="text-dark">{story.totalChap}</span>
                    
                  </li>
                  <li className="list-group-item my-3">
                  <i class="bi bi-suit-heart-fill text-warning"></i>
                    <span className="text-dark mx-1">Likes:</span> 
                    {
                      story.likes && (<span className="text-dark">{story.likes.length}</span>)
                    }
                  </li>
                  <li className="list-group-item my-3">
                  <i class="bi bi-heartbreak text-warning"></i>
                    <span className="text-dark mx-1">Dislikes:</span> 
                    {
                      story.dislikes && (<span className="text-dark">{story.dislikes.length}</span>)
                    }
                  </li>
                  <li className="list-group-item my-3">
                  <i class="bi bi-eye-fill text-warning"></i>
                    <span className="text-dark mx-1">Views:</span> 
                    <span className="text-dark">{story.views}</span>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalViewStory;
