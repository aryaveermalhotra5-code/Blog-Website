import appwriteService from '../appwrite/config'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import Container from '../components/container/Container'

function AllPost() {
  const [post, setPost] = useState([])

  useEffect(() => {
    appwriteService.getAllPost([]).then((res) => {
      if (res) setPost(res.documents)
    })
  }, [])

  return (
    <div className="w-full py-10">
      <Container>
        {post.length === 0 ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-lg text-gray-500">No posts yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {post.map((p) => (
              <PostCard key={p.$id} {...p} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPost