import AdminLayout from "../layouts/adminlayout";
import SideBar from "../components/sidebar";
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
import ModalAddStory from "./../components/modaladdstory";
import ModalViewStory from "../components/modalviewstory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalEditStory from "./../components/modaleditstory";
import ModalAddChapter from "../components/modaladdchapter";
const ViewListStory = () => {
  const [stories, setStories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const [totalStories, setTotalStories] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  let startIndex = currentPage * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let currentStories = stories.slice(startIndex, endIndex);

  const [checkBoxValue, setCheckBoxValue] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [storiesCopy, setStoriesCopy] = useState([]);

  const [isShowModalAddStory, setIsShowModalAddStory] = useState(false);
  const [isShowModalViewStory, setIsShowModalViewStory] = useState(false);
  const [isShowModalEditStory, setIsShowModalEditStory] = useState(false);
  const [isShowModalAddChapter, setIsShowModalAddChapter] = useState(false);
  const [story, setStory] = useState({});
  const addStoryRef = useRef();
  const editStoryRef = useRef();

  const handleClose = () => {
    setIsShowModalAddStory(false);
    setIsShowModalViewStory(false);
    setIsShowModalEditStory(false);
    setIsShowModalAddChapter(false);
  };

  addStoryRef.current = (newStory) => {
    setStories([...stories, newStory]);
  };

  editStoryRef.current = (story) => {
    //
    let cloneStories = [...stories];
    let index = stories.findIndex((s) => s.id === story.id);
    cloneStories[index] = story;
  };

  useEffect(() => {
    fetch("http://localhost:9999/story")
      .then((res) => res.json())
      .then((data) => {
        setStories(data);
        setTotalStories(data.length);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      });
  }, []);

  useEffect(() => {
    //get all stories
    fetch("http://localhost:9999/story")
      .then((res) => res.json())
      .then((data) => {
        setStoriesCopy(data);
      });
    //check story have categoryName is exist in array checkbox
    const isExist = (categoryName) =>
      checkBoxValue.length === 0 ? true : checkBoxValue.includes(categoryName);
    const storiesByCheckBox = storiesCopy.filter((story) => {
      return isExist(story.categoryName);
    });

    setCurrentPage(0);
    setTotalPages(Math.ceil(storiesByCheckBox.length / itemsPerPage));
    setStories(storiesByCheckBox);
  }, [checkBoxValue]);

  //get all author
  useEffect(() => {
    fetch("http://localhost:9999/author")
      .then((res) => res.json())
      .then((data) => {
        setAuthors(data);
      });
  }, []);
  //get all category
  useEffect(() => {
    fetch("http://localhost:9999/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const handleSort = (e) => {
    const option = e.target.value;
    const newStoriesSorted = [...stories];
    if (option === "story_name_asc") {
      newStoriesSorted.sort((a, b) => (a.storyName > b.storyName ? 1 : -1));
    } else if (option === "likes_desc") {
      newStoriesSorted.sort((a, b) => b.likes - a.likes);
    } else if (option === "views_desc") {
      newStoriesSorted.sort((a, b) => b.views - a.views);
    }
    if (option === "id_asc") {
      newStoriesSorted.sort((a, b) => a.id - b.id);
    }
    setStories(newStoriesSorted);
  };

  const handleCheckBoxValue = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCheckBoxValue([...checkBoxValue, value]);
    } else {
      setCheckBoxValue(checkBoxValue.filter((id) => id !== value));
    }
  };

  const handleShowStory = (story) => {
    setIsShowModalViewStory(true);
    setStory(story);
  };

  const handleShowEditForm = (story) => {
    setIsShowModalEditStory(true);
    setStory(story);
  };

  const handleDeleteStory = (story) => {
    if (
      window.confirm("Are you sure you want to delete:  " + story.storyName)
    ) {
      fetch(`http://localhost:9999/story/${story.id}`, {
        method: "DELETE",
      })
        .then(() => {
          setStories((prevStories) =>
            prevStories.filter((prevStory) => prevStory.id !== story.id)
          );
          toast.success("Story deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };

  const handleShowAddChapter = (story) => {
    setIsShowModalAddChapter(true);
    setStory(story);
  };

  return (
    <AdminLayout>
      <ToastContainer />
      <Row>
        <Col xs={9}>
          <h1 className="title-table text-light text-center mb-5">
            List Story
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
                      <option value="story_name_asc">Story Name</option>
                      <option value="likes_desc">Likes</option>
                      <option value="views_desc">Views</option>
                    </Form.Select>
                  </Col>
                  <Col md={6}>2</Col>
                </Row>
                <Table
                  className="table-story p-2"
                  style={{ marginTop: "2rem" }}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Story</th>
                      <th>Author</th>
                      <th>Category</th>
                      <th>Post Date</th>
                      <th>Likes</th>
                      <th>Views</th>
                      <th></th>
                      <th className="text-center">
                        <Button
                          className="btn-success"
                          onClick={() => setIsShowModalAddStory(true)}
                        >
                          <i class="bi bi-plus-circle-fill"></i>
                        </Button>
                      </th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStories.map((story) => {
                      return (
                        <tr key={story.id}>
                          <td>{story.id}</td>
                          <td>
                            <div className="wrapper_img">
                              <img
                                src={require("../components/image/" +
                                  story.image)}
                                alt="Story"
                              />
                            </div>
                          </td>
                          <td>{story.storyName}</td>
                          <td>{story.author}</td>
                          <td>{story.categoryName}</td>
                          <td>{story.postDate}</td>
                          <td>{story.likes.length}</td>
                          <td>{story.views}</td>
                          <td>
                            <Button
                              onClick={() => handleShowStory(story)}
                              className="btn btn-warning"
                            >
                              <i class="bi bi-eye-fill"></i>
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="btn btn-primary"
                              onClick={() => handleShowEditForm(story)}
                            >
                              <i class="bi bi-pen"></i>
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="btn btn-danger"
                              onClick={() => handleDeleteStory(story)}
                            >
                              <i class="bi bi-trash3-fill"></i>
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="btn btn-success"
                              onClick={() => handleShowAddChapter(story)}
                            >
                              <i class="bi bi-node-plus-fill"></i>
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
        <Col xs={3}>
          <ul className="text-decoration-none list-category mx-2">
            <h2 className="text-warning text-start mb-2" style={{}}>
              Category
            </h2>
            {categories.map((category) => (
              <li
                className="text-decoration-none"
                style={{ listStyle: "none" }}
                key={category.categoryName}
              >
                <div
                  className="form-check form-check-inline"
                  key={category.categoryName}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={category.categoryName}
                    onChange={(e) => handleCheckBoxValue(e)}
                  />

                  <label className="form-check-label" htmlFor="inlineCheckbox1">
                    {category.categoryName}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <ModalAddStory
        show={isShowModalAddStory}
        handleClose={handleClose}
        addStoryRef={addStoryRef}
      />
      <ModalViewStory
        show={isShowModalViewStory}
        handleClose={handleClose}
        story={story}
      />
      <ModalEditStory
        show={isShowModalEditStory}
        handleClose={handleClose}
        story={story}
        editStoryRef={editStoryRef}
      />
      <ModalAddChapter
        show={isShowModalAddChapter}
        handleClose={handleClose}
        story={story}
      />
    </AdminLayout>
  );
};

export default ViewListStory;
