import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { FiEdit, FiTrash } from "react-icons/fi";
// import CommentSection from "./CommentSection";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";


export default function Blog(props) {
  const { title, description, imgUrl, blog_id, createdAt, hideButtons, username, likes, hideCreatedBlog} = props;
  const { deleteBlog, editBlog, likeBlog, unlikeBlog, user:{_id}} = useContext(UserContext);
 
  const maxLength = 230;
  const [isExpanded, setIsExpanded] = React.useState(false);

  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }

  function handleDelete() {
    deleteBlog(blog_id);
  }

console.log(_id)

  function handleEdit() {
    const newTitle = prompt("Enter a new title", title);
    const newDescription = prompt("Enter a new description", description);
    const newImgUrl = prompt("Enter a new image URL", imgUrl);

    if (newTitle || newDescription || newImgUrl) {
      const newBlog = {};
      if (newTitle) {
        newBlog.title = newTitle;
      }
      if (newDescription) {
        newBlog.description = newDescription;
      }
      if (newImgUrl) {
        newBlog.imgUrl = newImgUrl;
      }
      editBlog(blog_id, newBlog);
    }
  }

  function formatCreatedAt(date) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  const truncatedDescription = description.slice(0, maxLength);
  const showToggle = description.length > maxLength;


// console.log(likes)

  return (
    <div className='blog'>
      <div className='blog-image'>
        <img src={imgUrl} alt={imgUrl} width={300} id='blog-img' />
        <div></div>
      </div>
      <div className='blog-text'>
        <div className='blog-title'>{title}</div>
        <h3 className='blog-description'>
          {isExpanded ? description : truncatedDescription}
          {showToggle && (
            <>
              {!isExpanded && "..."}
              <br />
              <button className='read-more' onClick={toggleExpanded}>
                {isExpanded ? "Read less..." : "Read more..."}
              </button>
            </>
          )}
        </h3>
        {!isExpanded && (
          <div className='blog-info'>
           {!hideCreatedBlog && (
              <p className='created-blog'>
                Created by:<span className="created-span">{username} </span>on <span className="created-span">{formatCreatedAt(createdAt)}</span>
              </p>
            )}
            {!hideButtons && (
              <div className='blog-btns'>
                <button onClick={handleEdit} className='edit-btn'>
                  <FiEdit />
                </button>
                <button onClick={handleDelete} className='trash-btn'>
                  <FiTrash />
                </button>
              </div>
            )}
          </div>
        )}
             {/* <CommentSection /> */}
      </div>
              {likes.map(item => item.user === _id).includes(true) ? (
          <div className="blog-votes">
            <button  onClick={() => unlikeBlog(blog_id)}>
              <AiFillHeart />
              <span>{likes.length}</span>
            </button>
          </div>
        ) : (
          <div className="blog-votes">
            <button onClick={() => likeBlog(blog_id)}>
              <AiOutlineHeart />
              <span>{likes.length}</span>
            </button>
          </div>
        )}
    </div>
  );
}
