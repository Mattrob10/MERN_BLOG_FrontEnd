import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import Blog from './Blog';
import axios from 'axios';
import { AiOutlineLeft, AiOutlineRight} from 'react-icons/ai';



export default function Public() {
  const { publicBlogs, setPublicBlogs,  } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  useEffect(() => {
    axios
      .get('/api/blog')
      .then((response) => {
        setPublicBlogs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setPublicBlogs]);

  const sortedBlogs = publicBlogs?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const totalPages = Math.ceil(sortedBlogs?.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = sortedBlogs?.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  
  return (
    <div className='public'>
      <div className='public-title'>Welcome to ⛰<span>Bloggin!</span></div>
      <div className='public-title-text'>
        Whether you're here to read our latest blog posts or create your own,
        we're happy to have you.
      </div>
      <div className='public-title-text'>Enjoy!</div>
      <div className='public-blog-wrapper'>
        {currentBlogs?.map((blog) => (
          <Blog
            key={blog._id}
            blog_id={blog._id}
            title={blog.title}
            description={blog.description}
            imgUrl={blog.imgUrl}
            username={blog.user.username}
            createdAt={blog.createdAt}
            hideButtons={true}
            hideCreatedBlog={false}
            likes={blog.likes}
          />
        ))}
      </div>
      <div className='public-pagination'>
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className='public-pagination-btn'
        >
          <AiOutlineLeft />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`public-pagination-btn ${
              page === currentPage ? 'public-pagination-btn-active' : ''
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='public-pagination-btn'
        >
          <AiOutlineRight />
        </button>
      </div>
    </div>
  );
}
