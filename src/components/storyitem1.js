import {Link} from "react-router-dom";
// import "./../styles/storyitem1.css";
const StoryItem1 = (props) => {
    const {s, className} = props;
    console.log(s);
  return (
    <div className={className}>
      <div class="product__item">
        <div
          class="product__item__pic"
          style={{
            backgroundImage: `url(${require("../components/image/" +
              s.image)})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div class="ep">
            {s.currentChap} / {s.totalChap}
          </div>
          <div class="like">
            <i class="bi bi-hand-thumbs-up-fill"></i> {s.likes.length}
          </div>
          <div class="view">
            <i class="bi bi-eye-fill"></i> {s.views}
          </div>
        </div>
        <div class="product__item__text">
          <h5>
            <Link to={`/story/${s.id}`}>{s.storyName}</Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default StoryItem1;
