import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block">
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm
        transition duration-200 hover:shadow-lg">
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <img
            src={appwriteService.filePreview(featuredImage)}
            alt={title}
            className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard