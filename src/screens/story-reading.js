import DefaultLayout from "../layouts/defaultlayout";
import "./../styles/storyreading.css";
import { useParams, Link } from "react-router-dom";
import Comment from "./../components/comment";
import { useState, useEffect } from "react";
import StoryItem2 from "./../components/storyitem2";


const StoryReading = () => {
  const [top5Views, setTop5Views] = useState([]);
  //get top 5 views
  useEffect(() => {
    fetch("http://localhost:9999/story")
      .then((response) => response.json())
      .then((json) =>
        setTop5Views(json.sort((a, b) => b.views - a.views).slice(0, 4))
      );
  }, []);

  const { id } = useParams();
  const [story, setStory] = useState({});
  const [content, setContent] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [chapter, setChapter] = useState({});

  const [ContinueRead, setContinueRead] = useState({});
  const username = sessionStorage.getItem("username");
  const [indexChap, setIndexChap] = useState(0);

  // get user ContinueRead
  useEffect(() => {
    fetch(`http://localhost:9999/continueRead?username=${username}&storyId=${id}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.length > 0) {
          setContinueRead(json[0]);
          setIndexChap(json[0].indexOfChapter);
        }
      });
  }, []);
  // handle postContinueRead
  function handleContinueRead(indexOfChapter, username, storyId) {
    if (ContinueRead.id) {
      const newContinueRead = { ...ContinueRead, indexOfChapter };
      if (newContinueRead != null) {
        fetch("http://localhost:9999/continueRead/" + ContinueRead.id, {
          method: "PUT",
          headers: { "Content-Type": "Application/Json" },
          body: JSON.stringify(newContinueRead),
        })
          // .then(() => { changed++; setChanged(changed) })
          .catch((err) => {
            console.log(err.message);
          });
      }
    } else {
      const newContinueRead = { username, storyId, indexOfChapter };
      if (newContinueRead != null) {
        fetch("http://localhost:9999/continueRead", {
          method: "POST",
          headers: { "Content-Type": "Application/Json" },
          body: JSON.stringify(newContinueRead),
        })
          // .then(() => { changed++; setChanged(changed) })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
  }

  // Handle comment
  const [contentCmt, setContentCmt] = useState("");
  function handleSubmit(e) {
    e.preventDefault();

    const content = contentCmt;
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

  //get story by id
  useEffect(() => {
    fetch(`http://localhost:9999/story/${id}`)
      .then((response) => response.json())
      .then((json) => setStory(json));
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:9999/chapter")
      .then((response) => response.json())
      .then((json) => setContent(json));
  }, []);

  useEffect(() => {
    fetch("http://localhost:9999/chapter")
      .then((response) => response.json())
      .then((json) => {
        const chapterByStory = json.filter(
          (chapter) => chapter.storyId === parseInt(id)
        );
        setChapters(
          chapterByStory.sort((a, b) =>
            a.chapterName > b.chapterName ? 1 : -1
          )
        );
        setChapter(chapterByStory[indexChap]);
      });
  }, [indexChap]);


  return (
    <DefaultLayout>
      <section className="anime-details spad">
        <div className="container">
          <div className="row">
            <div className="section-title">
              <h5>{story.storyName}</h5>
            </div>
            <div className="col-lg-12">
              <div className="content-story mb-3" style={{ height: "50vh" }}>
                <div className="chapter_name" style={{ marginBottom: "10px" }}>
                  <h3>{chapter.chapterName}</h3>
                </div>
                <div className="content-story" style={{ fontSize: "3rem" }}>
                  <p style={{ fontSize: "3rem", textAlign: "justify", paddingRight: "8px" }}>
                    {/* {content.map((c) => {
                      if (c.storyId == id && c.chapterName === "chapter 1") {
                        return c.content;
                      }
                    })} */}
                    {
                      chapter.content
                    }
                  </p>
                </div>
                {/* </div> */}
              </div>
              <div className="anime__details__episodes">
                <div className="section-title">
                  <h5>List Chapter</h5>
                </div>
                {chapters.length > 0 &&
                  chapters.map((c) => <Link onClick={() => { setChapter(c); handleContinueRead(chapters.indexOf(c), username, id) }} className={c.id === chapter.id ? "current-chap" : ""}>{c.chapterName}</Link>)
                }
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
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
                    onChange={(e) => setContentCmt(e.target.value)}
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
    </DefaultLayout>
  );
};
export default StoryReading;
