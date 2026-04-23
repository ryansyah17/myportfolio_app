import { useParams, Link } from "react-router-dom";
import { useBlogBySlug } from "../../hooks/useBlog";
import Loading from "../../components/ui/Loading";

const BlogDetailPage = () => {
  const { slug = "" } = useParams();
  const { data: blog, isLoading, isError } = useBlogBySlug(slug);

  if (isLoading)
    return (
      <div className="pt-20">
        <Loading />
      </div>
    );

  if (isError)
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <p className="text-red-500 mb-4">Artikel tidak ditemukan.</p>
        <Link to="/blog" className="text-blue-600 hover:underline">
          ← Kembali ke Blog
        </Link>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        to="/blog"
        className="text-blue-600 text-sm hover:underline mb-8 block"
      >
        ← Kembali ke Blog
      </Link>

      {blog?.image_url && (
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-2xl mb-8"
        />
      )}

      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
        {blog?.category}
      </span>

      <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-2">
        {blog?.title}
      </h1>

      <p className="text-gray-400 text-sm mb-8">
        {blog &&
          new Date(blog.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
      </p>

      {/* Render konten blog sebagai plain text — phase 6 kita tambah rich text editor */}
      <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
        {blog?.content}
      </div>
    </div>
  );
};

export default BlogDetailPage;
