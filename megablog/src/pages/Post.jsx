import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import Container from "../components/container/Container";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-10">
      <Container>
        <div className="relative mb-6 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          <img
            src={appwriteService.filePreview(post.featuredImage)}
            alt={post.title}
            className="max-h-[480px] w-full object-cover"
          />
          {isAuthor && (
            <div className="absolute right-4 top-4 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-600">Edit</Button>
              </Link>
              <Button bgColor="bg-red-600" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <h1 className="mb-6 text-3xl font-bold text-gray-900">{post.title}</h1>
        <div className="browser-css prose max-w-none">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null
}