// import Container from '../container/Container'
// import PostForm from '../post-form/PostForm'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'


function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost