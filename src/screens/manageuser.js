import AdminLayout from "../layouts/adminlayout";
import {
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  FormGroup,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalViewUser from "../components/modalviewuser";
const ViewListUser = () => {
  const [users, setUsers] = useState([]);

  const [totalStories, setTotalStories] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  let startIndex = currentPage * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let currentUsers = users.slice(startIndex, endIndex);
  

  const [isShowModalViewUser, setIsShowModalViewUser] = useState(false);
  const [user, setUser] = useState({});

  //close modal
  const handleClose = () => {
    setIsShowModalViewUser(false);
  };
  

  //get alll user
  useEffect(() => {
    fetch("http://localhost:9999/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      });
  }, []);

  //sort
  const handleSort = (e) => {
    const option = e.target.value;
    const newUserSorted = [...users];
    if (option === "name_asc") {
        newUserSorted.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (option === "age_asc") {
        newUserSorted.sort((a, b) => a.Age - b.Age);
    } else if (option === "age_desc") {
        newUserSorted.sort((a, b) => b.Age - a.Age);
    }
    if (option === "id_asc") {
        newUserSorted.sort((a, b) => a.id - b.id);
    }
    setUsers(newUserSorted);
  };

 

  //view modal user
  const handleShowUser = (user) => {
    setIsShowModalViewUser(true);
    setUser(user);
  };

 


  return (
    <AdminLayout>
      <ToastContainer />
      <Row>
        <Col xs={12}>
          <h1 className="title-table text-light text-center mb-5">
            List Users
          </h1>
          <div className="table-container">
            <Row>
              <Col xs={12}>
                <Row>
                  <Col md={3}>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => handleSort(e)}
                    >
                      <option value="id_asc">Sort</option>
                      <option value="name_asc">Sort By Name Ascending</option>
                      <option value="age_asc">Sort By Age Ascending</option>
                      <option value="age_desc">Sort By Age Descending</option>
                    </Form.Select>
                  </Col>
                  <Col md={6}>2</Col>
                </Row>
                <Table className="table-story p-2" style={{marginTop: "2rem"}}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th></th>
                      <th className="text-center">
                      </th>
                    </tr>   
                  </thead>
                  <tbody>
                    {currentUsers.map((user) => {
                      return (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                         
                          <td>{user.username}</td>
                          <td>{user.name}</td>
                          <td>{user.Age}</td>
                          <td>{user.email}</td>
                          <td className={user.isAdmin === 1 ? "text-danger" : "text-primary"}>{user.isAdmin === 1 ? "Admin" : "Reader"}</td>
                          <td>
                            <Button
                              onClick={() => handleShowUser(user)}
                              className="btn btn-warning"
                            >
                              <i class="bi bi-eye-fill"></i>
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="btn btn-primary"
                              // onClick={() => handleShowEditForm(user)}
                            >
                              <i class="bi bi-pen"></i>
                            </Button>
                          </td>
                        
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
          <div className="wrapper_paginate mt-10 d-flex justify-content-center p-4">
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              pageCount={totalPages}
              marginPagesDisplayed={10}
              pageRangeDisplayed={5}
              onPageChange={(selectedPage) =>
                setCurrentPage(selectedPage.selected)
              }
              containerClassName="pagination"
              activeClassName="active"
              forcePage={currentPage}
            />
          </div>
        </Col>
       
      </Row>
      <ModalViewUser
        show={isShowModalViewUser}
        handleClose={handleClose}
        user={user}
      />
    </AdminLayout>
  );
};

export default ViewListUser;
