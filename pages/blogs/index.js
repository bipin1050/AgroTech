import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { userAgent } from "next/server";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext, useAuth } from "../../Authentication/auth";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/review/getBlogs")
      .then((res) => {
        console.log(res);
        setBlogs(res.data.blogs);
      })
      .catch(() => {
        console.log(err);
      });
  }, []);

  const { user, isLoading } = useContext(AuthContext);
  
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!user) {
    router.push("/login");
    return null;
  }
  
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState(user.name);
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

    // console.log(title, author, paragraphs, image);

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
      <Head>
        <title>Blogs</title>
        <meta name="description" content="Agro tech - shop fresh here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex flex-col items-center m-5">
        {user.role == "admin" && (
          <>
            <div className="flex justify-center">
              <form
                onSubmit={handleblogSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-screen-md">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="title">
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter Blogs Title"
                    type="text"
                    value={title}
                    onChange={handleTitle}
                    name="title"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="title">
                    Author
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Default is Admin"
                    type="text"
                    value={author}
                    onChange={handleAuthor}
                    name="author"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="title">
                    Product Image
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImage}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="title">
                    Blog Description
                  </label>
                  <textarea
                    placeholder="Type \n for new paragraph"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onBlur={handleStringToArray}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white items-center bg-[#3E9B05] rounded-md p-2">
                  Submit Blog
                </button>
              </form>
            </div>
          </>
        )}
        <div className="flex flex-col">
          <div className="flex justify-around text-4xl font-bold mb-5">
            <h1>Recent Blogs</h1>
          </div>
          {blogs.map((blog, id) => {
            return (
              <div className="flex justify-around items-center">
                <div
                  className="bg-white rounded-lg shadow-lg flex w-full"
                  key={id}
                  onClick={() => {
                    handleFullBlogs(blog._id);
                  }}>
                  <img
                    src={`http://localhost:8000/images/${blog.image}`}
                    alt={blog.title}
                    // className="h-48 w-full object-cover"
                    className="w-48"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="p-4">
                    <p className="text-gray-400 text-sm">
                      {blog.publicationDate.slice(0, 10)}
                    </p>
                    <h2 className="text-2xl font-semibold mb-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-700 mb-4">{blog.highlights}...</p>
                    <div className="flex items-center">
                      <p className="text-gray-700">{blog.author}</p>
                    </div>
                  </div>
                </div>
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
