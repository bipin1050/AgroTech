import axios from "axios";
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
      <div>
        <h1>{blog.title}</h1>
      </div>
      <div>
        <img
          className="w-[70%] h-[500px]"
          src={`http://localhost:8000/images/${blog.image}`}
        />
      </div>
      { blogLoading 
      ? <div>Loading...</div>
      :  <div>
          {paragraphs.map((para, id) => {
            return (
            <p>{para}</p>
            )
          })}
        </div>
      }

      {/* {blog.content} */}
    </div>
  );
};

export default BlogDetails;
