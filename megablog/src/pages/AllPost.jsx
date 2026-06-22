import appwriteService from '../appwrite/config'
// import { useNavigate } from 'react-router-dom'
// import {PostCard ,Container } from '../index'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import Container from '../components/container/Container'


function AllPost() {
    const[post,setPost] = useState([])

    useEffect(()=> {} 
    
    ,[])


    appwriteService.getAllPost([]).then((post) =>{
        if(post) setPost(post.documents)
    } )

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                 {post.map((post)=> (
                    <div key={post.$id} className='p-2 w-1/4' >
                          <PostCard {...post} />
                    </div>
            ) )}
            </div>
           
        </Container>
    </div>
  )
}

export default AllPost