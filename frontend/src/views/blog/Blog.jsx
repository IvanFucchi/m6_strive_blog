import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import posts from "../../data/posts.json";
import "./styles.css";

const Blog = props => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  async function getPost(id) {
    return await fetch(process.env.REACT_APP_APIURL + '/blog/' + id)
      .then(res => {
        console.log(res)
        if (res.status != 200) {
          navigate("/404")
        }
        return res.json()
      })
      .then(data => {
        return data
      })
      .catch(err => {
        console.error('Errore nel fetch:', err);
      });
  };

  useEffect(() => {
    const { id } = params;
    getPost(id).then(blog => {
      setBlog(blog);
      setLoading(false);
    })
  }, []);

  return (

    <>
      {loading && <div>loading</div>}

      {!loading && <div className="blog-details-root">
        <Container>
          <Image className="blog-blog-details-cover w-25 rounded mx-auto d-block shadow-sm border-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>
      </div>}
    </>
  );

};

export default Blog;
