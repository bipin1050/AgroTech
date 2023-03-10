import axios from "axios";
import { useRouter } from "next/router";
import { userAgent } from "next/server";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Authentication/auth";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/review/getBlogs")
      .then((res) => {
        console.log(res.data.blogs);
        setBlogs(res.data.blogs);
      })
      .catch(() => {});
  }, []);

  const auth = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState(auth.name);
  const [paragraphs, setParagraphs] = useState({});
  const [image, setImage] = useState("");

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleStringToArray = (event) => {
    event.preventDefault();

    const unescapedInputValue = unescape(inputValue.replace(/\\n/g, "\n"));

    // Split input value into array of paragraphs
    const paragraphsArray = unescapedInputValue
      .split("\n")
      .map((p) => p.trim());

    // Update state with the array of paragraphs
    setParagraphs(paragraphsArray);
  };

  const handleblogSubmit = (e) => {
    e.preventDefault();

    console.log(paragraphs);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("highlights", "");
    formData.append("image", image);

    paragraphs.forEach((string, index) => {
      formData.append(`content[]`, string);
    });

    axios
      .post("http://localhost:8000/review/createBlogs", formData, {
        headers: {
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setTitle("");
        setAuthor("");
        setImage("");
        setInputValue("");
      })
      .catch((err) => {
        // console.log(err.response?.data?.message || err.message);
        console.log(err);
      });
  };

  const handleFullBlogs = (id) => {
    // router.push(`/products/${id}`)
    router.push({
      pathname: `/blogs/${id}`,
      query: { id: id },
    });
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center w-11/12 lg:w-4/5 m-5">
        {auth.role == "admin" && (
          <div className="bg-white flex  flex-col w-1/2 rounded-xl p-10 justify-center py-10">
            <form
              onSubmit={handleblogSubmit}
              className="flex flex-col gap-5 justify-start items-start w-11/12">
              <div className="">
                <div className="flex flex-col lg:flex-row  w-full">
                  <label className="w-1/3">Title</label>
                  <input
                    placeholder="Enter Blogs Title"
                    type="text"
                    value={title}
                    onChange={handleTitle}
                    name="title"
                  />
                </div>
                <div className="flex flex-col lg:flex-row  w-full">
                  <label className="w-1/3">Author</label>
                  <input
                    placeholder="Default is Admin"
                    type="text"
                    value={author}
                    onChange={handleAuthor}
                    name="author"
                  />
                </div>
                <div className="flex flex-col lg:flex-row  w-full">
                  <label className="w-1/3">Product Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-2/3 "
                    onChange={handleImage}
                  />
                </div>
                <div className="flex flex-col lg:flex-row  w-full">
                  <label className="w-1/3">Blog Description</label>
                  <textarea
                    placeholder="Type \n for new paragraph"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-[90%] m-10"
                    onBlur={handleStringToArray}
                  />
                </div>
              </div>
              <button type="submit">Submit Blog</button>
            </form>
          </div>
        )}
        <div>
          <h1> Recent Blogs </h1>
          {blogs.map((blog, id) => {
            return (
              <div
                key={id}
                onClick={() => {
                  handleFullBlogs(blog._id);
                }}>
                <h6>{blog.publicationDate.slice(0, 10)}</h6>
                <h1>{blog.title}</h1>
                <h1>{blog.highlights}...</h1>
                <h2>-By {blog.author}</h2>
                <img
                  className="w-[70%] h-[500px]"
                  src={`http://localhost:8000/images/${blog.image}`}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;

//review
//http://localhost:8000/review/getBlogs
