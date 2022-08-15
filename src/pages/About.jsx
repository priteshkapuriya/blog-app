import { useState, useEffect } from "react";

export const About = () => {
  const [aboutData, setAboutData] = useState([]);
  useEffect(() => {
    fetch("https://js1.10up.com/wp-json/wp/v2/pages")
      .then((respose) => respose.json())
      .then((data) => {
        setAboutData(data);
      })
      .catch((error) => console.error("Error", error));
  }, []);
  return (
    <>
      <h1>About</h1>

      {aboutData.map((about) => {
        return (
          <div
            key = {about.id}
            className="content"
            dangerouslySetInnerHTML={{ __html: about.content.rendered }}
            itemProp="articleBody"
          ></div>
        );
      })}
    </>
  );
};
