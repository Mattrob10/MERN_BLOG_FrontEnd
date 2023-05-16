import React, { useState, useEffect } from 'react'
import axios from 'axios'
export const UserContext = React.createContext()

const userAxios = axios.create({
  baseURL: 'https://blog-react-app.herokuapp.com/'
})

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function UserProvider(props){
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    blogs: [],
    errMsg: ""
  }

  const [userState, setUserState] = useState(initState)

  useEffect(() => {
    getUserBlogs()
  }, [])

  const [publicBlogs, setPublicBlogs] = useState([]);
  useEffect(() => {
    axios.get('/api/blog')
      .then(response => {
        console.log(response.data)
        setPublicBlogs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function signup(credentials){
    userAxios.post("/auth/signup", credentials)
      .then(res => {
        const {user, token} = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user, token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }


  function login(credentials){
    userAxios.post("/auth/signup", credentials)
    .then(res => {
      const {user, token} = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      getUserBlogs()
      setUserState(prevUserState => ({
        ...prevUserState,
        user, token
      }))})
    .catch(err => handleAuthErr(err.response.data.errMsg))
  }

 function logout(){
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  setUserState({
    user: {},
     token: "",
      blogs: []
  })
 }

 function handleAuthErr(errMsg){
  setUserState(prevState => ({
    ...prevState,
    errMsg
  }))
 }

 function resetAuthErr(){
  setUserState(prevState => ({
    ...prevState,
    errMsg: ""
  }))
 }

  function getUserBlogs(){
  userAxios.get("/api/blog/user/")
  .then(res => {
    setUserState(prevState => ({
      ...prevState,
      blogs: res.data
    }))
  })
  .catch(err => console.log(err.response.data.errMsg))
}

// ALL BLOGS
  function getAllBlogs(){
  userAxios.get("/api/blog/")
  .then(res => {
    setUserState(prevState => ({
      ...prevState,
      blogs: res.data
    }))
  })
  .catch(err => console.log(err.response.data.errMsg))
}

 function addBlog(newBlog){
  userAxios.post("/api/blog", newBlog)
  .then(res => {
    setUserState(prevState => ({
      ...prevState,
      blogs: [...prevState.blogs, res.data]
    }))
    })
  .catch(err => console.log(err))
 }

 function deleteBlog(blogId) {
  userAxios
    .delete(`/api/blog/${blogId}`)
    .then((res) => {
      setUserState((prevState) => ({
        ...prevState,
        blogs: prevState.blogs.filter((blog) => blog._id !== blogId),
      }));
    })
    .catch((err) => console.log(err));
}

//EDIT BLOG
function editBlog(blogId, newBlog) {
  userAxios.put(`/api/blog/${blogId}`, newBlog)
    .then(res => {
      const updatedBlog = res.data;
      setUserState(prevState => ({
        ...prevState,
        blogs: prevState.blogs.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog)
      }));
    })
    .catch(err => console.log(err.response.data.errMsg));
}

// LIKE BLOG
function likeBlog(blogId) {
  if (!userState.token) {
    alert("You must be logged in to like a blog.");
    return;
  }

  userAxios
    .put(`/api/blog/like/${blogId}`)
    .then(res => {
      const updatedLikes = res.data;
      setUserState(prevState => {
        const updatedBlogs = prevState.blogs.map(blog => {
          if (blog._id === blogId) {
            return {
              ...blog,
              likes: updatedLikes
            };
          }
          return blog;
        });
        setPublicBlogs(prevState => {
        return prevState.map(blog => {
            if (blog._id === blogId){
              return {
                ...blog,
                likes: updatedLikes
              }
            } else {
            return blog;
          }})
        })
        return {
          ...prevState,
          blogs: updatedBlogs
        };
      });
    })
    .catch(err => console.log(err.response.data.errMsg));
}

// UNLIKE BLOG
function unlikeBlog(blogId) {
  if (!userState.token) {
    alert("You must be logged in to like a blog.");
    return;
  }

  userAxios
    .put(`/api/blog/unlike/${blogId}`)
    .then(res => {
      const updatedLikes = res.data;
      setUserState(prevState => {
        const updatedBlogs = prevState.blogs.map(blog => {
          if (blog._id === blogId) {
            return {
              ...blog,
              likes: updatedLikes
            };
          }
          return blog;
        });
        setPublicBlogs(prevState => {
          return prevState.map(blog => {
              if (blog._id === blogId){
                return {
                  ...blog,
                  likes: updatedLikes
                }
              } else {
              return blog;
            }})
          })
        return {
          ...prevState,
          blogs: updatedBlogs
        };
      });
    })
    .catch(err => console.log(err.response.data.errMsg));
}



  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addBlog,
        getAllBlogs,
        resetAuthErr,
        deleteBlog,
        publicBlogs,
        setPublicBlogs,
        editBlog,
        likeBlog,
        unlikeBlog
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}