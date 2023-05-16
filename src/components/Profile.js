import React, { useContext } from 'react';
import BlogForm from './BlogForm.js';
import BlogList from './BlogList.js';
import { UserContext } from '../context/UserProvider.js';

export default function Profile() {
  const { user: { username, _id}, addBlog, blogs } = useContext(UserContext);

  const userBlogs = blogs.filter(blog => blog.user === _id);


  
  return (
    <div className="profile">
      <div className='profile-text'>
        <h1>Welcome <span className='profile-title'>{username}</span>!</h1>
      </div>
      <div className='profile-wrapper'>
        <div className='profile-form'>
          <div className='add-blog-title'>Add A Blog</div>
          <div className='title-border'></div>
          <BlogForm addBlog={addBlog} />
        </div>
        <BlogList blogs={userBlogs} />
      </div>
    </div>
  );
}
