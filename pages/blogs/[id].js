import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const BlogDetails = () => {
  const router = useRouter();

  const { id } = router.query;

  const [blog, setBlog] = useState([]);
  const [paragraphs, setParagraphs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);

  useEffect(() => {
    setBlogLoading(true);
    axios
      .get(`http://localhost:8000/review/getBlogs/${id}`)
      .then((res) => {
        console.log(res.data);
        setBlog(res.data.blogs);
        setParagraphs(res.data.blogs.content);
        setBlogLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setBlogLoading(false);
      });
  }, [id]);

  return (
    <div>
      <Head>
        <title>Blogs | {blog.title}</title>
        <meta name="description" content="Agro tech - shop fresh here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-screen-lg mx-auto">
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
            {/* <p className="text-gray-400 text-sm">
              {blog.publicationDate.slice(0, 10)}
            </p> */}
            <img
              src={`http://localhost:8000/images/${blog.image}`}
              alt={blog.title}
              className="w-full"
              style={{ height: "400px", objectFit: "cover" }}
            />
            {blogLoading ? (
              <div>Loading...</div>
            ) : (
              <div className="mb-4">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-7">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
            <div className="flex items-center">
              <p className="text-gray-700">{blog.author}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
