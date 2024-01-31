import About from './About';
import Newpost from './Newpost';
import Postpage from './Postpage';
import Post from './Post';
import Home from './Home';
import React, { useEffect, useState }  from 'react'; 
import Missing from './Missing'
import {Routes , Route, Link, Navigate, useNavigate} from "react-router-dom";
import PostLayout from './PostLayout';
import Nav from './Nav';
import Head from './Head';
import { format } from 'date-fns';
import api from './api/Posts';



function App() {



  const [search , setSearch] = useState('') 
  const [posts, setPosts] = useState([]);
  const [searchResults , setSearchResults] = useState([])
  const [postTitle ,setPostTitle] =useState('')
  const [postBody , setPostBody] =useState('')
  const [editTitle ,setEditTitle] =useState('')
  const [editBody , setEditBody] =useState('')
  const navigate = useNavigate()



  const handleSubmit = async(e) => {
    e.preventDefault(); // Fix the typo here
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    // console.log(posts.lengt)
    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    // console.log(dateTime)
    const newPost = { id, title: postTitle, dateTime, body: postBody };
    const response = await api.post('/posts' , newPost)
    try{
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      Navigate('/')
    }
     catch(err){
       console.log(`Error:${err.message}`)
  }
  }
  const handleDelete = async(id) => {
   try{
    await api.delete(`/posts/${id}`)
    const postList = posts.filter((post) => post.id !== id)
    setPosts(postList)
    navigate('/')
   }
   catch(err){
    console.log(`Error:${err.message}`)
   }
  }

  const handleEdit = async(id) => {
    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatePost = { id, title: editTitle, dateTime, body: editBody };
    try{
      const response = await api.put(`/post/${id}`,updatePost)
      setPosts(posts.map(post => post.id === id) ? {...response.data} : posts);
      setEditTitle('');
      setEditBody('');
      Navigate('/')
    }
    catch(err){
      console.log(`Error:${err.message}`)
    }
  }




useEffect(() =>{
  const fetchPosts = async() =>{
  try{
    const response =await api.get('/posts')
    setPosts(response.data)
  }
  catch(err){
    if(err.response){
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)
    }
    else{
    console.log(`Error:${err.message}`)
    }
  }
}
  fetchPosts()
},[])

useEffect(()=>{
  const filterResults = posts.filter((post)=>
  ((post.body).toLowerCase()).includes(search.toLowerCase()))
  || ((posts.title).toLocaleLowerCase()).includes(search.toLocaleLowerCase())

  setSearchResults(filterResults.reverse());
} , [posts , search])
  return (
    // <div className="App">
    //   <nav>
    //    <ul> 
    //       <li><Link to="/">Home</Link> </li>
    //      <li><Link to="/about">About</Link> </li>
    //      <li><Link to="/newpost">Newpost</Link> </li> 
    //       <li><Link to="/postpage">Postpage</Link> </li> 
    //     </ul> 
    //    </nav>
    //   <Routes>
    //     <Route path="/" element ={<Home />}/>
    //     <Route path="/about" element ={<About />}/>
    //     <Route path="/newpost" element ={<Newpost />}/>
    //      <Route path="/postpage" element ={<Postpage />} /> 
    //     <Route path="/postpage" element ={<PostLayout />}  >
    //       <Route index element ={<Postpage />}  />
    //       <Route path=":id" element ={<Post />}/>
    //       <Route path="newpost" element ={<Newpost />}/> 
    //     </Route>
    //   <Route path="*" element ={<Missing />}/>
    //   </Routes> 
     
    // </div>
   
    <div className='App'>
      <Head title={"Nit Social Media"}/>
      <Nav 
        search = {search}
        setSearch = {setSearch}
      />
      <Routes>
        <Route path='/' element ={ <Home posts={searchResults}/>} />
        <Route path='/about' element={<About />} />
        <Route path='/post' >
        <Route index element={ <Newpost 
        handleSubmit={handleSubmit} 
        postTitle={postTitle} 
        setPostTitle={setPostTitle} 
        postBody={postBody} 
        setPostBody={setPostBody}
        />} />
        <Route path=':id' element={<Postpage posts={posts} handleDelete={handleDelete}/>}  />
        </Route>
        <Route path='/edit/:id' element={<Postpage posts={posts} 
          handleEdit={handleEdit} 
          editBody ={editBody}
          setEditBody ={setEditBody}
          editTitle ={editTitle}
          setEditTitle={setEditTitle} />} />
        <Route path="*" element ={<Missing />}/>
      </Routes>
    </div>
  );
}

export default App;
