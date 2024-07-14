import { useState } from "react";
import { Container, Modal, Button, Row, Col } from "react-bootstrap";
import StoryItem1 from "./storyitem1";
function ModalViewUser(props) {
  const { show, handleClose, user } = props;
  console.log(user);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Story</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Row>
              <Col xs={6}>
                <ul>
                  <li className="list-group-item">
                  <i class="bi bi-bookmark-dash-fill text-warning"></i>
                    <span className="text-dark mx-1">Username: </span> <span className="text-dark">{user.username}</span>
                  </li>
                  <li className="list-group-item my-3">
                  <i class="bi bi-person-bounding-box text-warning"></i>
                    <span className="text-dark mx-1">Name: </span> 
                    <span className="text-dark">{user.name}</span>
                  </li>
                  <li className="list-group-item my-3">
                  <i class="bi bi-box2-fill text-warning"></i>
                    <span className="text-dark mx-1">Age: </span> 
                    <span className="text-dark">{user.Age}</span>
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

export default ModalViewUser;
