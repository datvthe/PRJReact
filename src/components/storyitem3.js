import "./../styles/storyitem2.css";
import { Link } from "react-router-dom";

const StoryItem3 = ({ story }) => {
    return (
        <div
            className="product__sidebar__view__item view"
            // data-setbg="img/sidebar/tv-1.jpg"
            style={{
                backgroundImage: `url(${require("../components/image/" +
                    story.image)})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="ep"> {story.currentChap} / {story.totalChap}</div>
            <div className="view"><i class="bi bi-hand-thumbs-up-fill"></i>{story.likes.length}</div>
            <h5>
                <Link to={`/story/${story.id}`}>{story.storyName}</Link>
            </h5>
        </div>
    );
};
export default StoryItem3;
