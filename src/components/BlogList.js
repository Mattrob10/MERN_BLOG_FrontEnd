import React from "react";
import Blog from "./Blog.js";

export default function BlogList(props) {
  const { blogs } = props;
  const sortedBlogs = [...blogs]?.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className='blog-list'>
         { sortedBlogs.map(blog => <Blog {...blog} blog_id={blog._id} key={blog._id} likes={blog.likes} hideCreatedBlog={true} />)}
    </div>
  );
}
