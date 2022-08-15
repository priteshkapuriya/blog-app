import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetch("https://js1.10up.com/wp-json/wp/v2/posts")
      .then((respose) => respose.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((error) => console.log("Error", error));
  }, []);
  return (
    <>
      <section className="welcome logged-in">
        Welcome {user.user_display_name}!
      </section>

      <div itemScope itemType="https://schema.org/Blog">
        {posts.map((post) => {
          let date = new Date(
            post.yoast_head_json.article_published_time
          ).toDateString();
          return (
            <article
              itemScope
              itemType="http://schema.org/BlogPosting"
              className="post"
              key={post.id}
            >
              <header>
                <h2 itemProp="headline">{post.yoast_head_json.og_title}</h2>

                <div className="date">
                  <strong>Publish Date</strong>:
                  <span itemProp="datePublished">
                    <time dateTime="2016-05-01">{date}</time>
                  </span>
                </div>

                <div className="author">
                  <strong>Author</strong>:
                  <span itemProp="author">
                    {post["yoast_head_json"]["twitter_misc"]["Written by"]}
                  </span>
                </div>
              </header>

              <div
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                itemProp="articleBody"
                className="content"
              ></div>
            </article>
          );
        })}
      </div>
    </>
  );
};
