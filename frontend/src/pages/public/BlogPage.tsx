import { Link } from "react-router-dom";
import { useBlogs } from "../../hooks/useBlog";
import Loading from "../../components/ui/Loading";

const BlogPage = () => {
  const { data: blogs, isLoading } = useBlogs();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog</h1>
        <p className="text-gray-500">
          Tulisan tentang teknologi, pengalaman, dan hal menarik lainnya.
        </p>
      </div>

      {isLoading && <Loading />}

      <div className="space-y-6">
        {blogs?.map((blog) => (
          <Link
            key={blog.id}
            to={`/blog/${blog.slug}`}
            className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex gap-6">
              {blog.image_url && (
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="w-32 h-24 object-cover rounded-xl shrink-0"
                />
              )}
              <div className="flex-1">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {blog.category || "General"}
                </span>
                <h2 className="text-xl font-bold text-gray-800 mt-2 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {blog.excerpt}
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  {new Date(blog.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
        {blogs?.length === 0 && !isLoading && (
          <p className="text-center text-gray-400 py-20">Belum ada artikel.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
