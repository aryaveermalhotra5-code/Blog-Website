import { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'

function Home() {
  const [post, setPost] = useState(null)

  useEffect(() => {
    appwriteService.getAllPost([]).then((res) => {
      if (res) setPost(res.documents)
    })
  }, [])

  if (!post || post.length === 0) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-gray-800">You can add new Post</h1>
      </div>
    )
  }

  return (
    <div className="w-full py-10">
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {post.map((p) => (
            <PostCard key={p.$id} {...p} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home