import React from "react";

import { useGlobalContext } from "./context";

const Stories = () => {
  const { loading, stories, search, remove } = useGlobalContext();

  if (loading) {
    return <div className="loading"></div>;
  }

  return (
    <section className="stories">
      {stories.map((story) => {
        const {
          objectID: id,
          title,
          points,
          author,
          num_comments: comments,
          url,
        } = story;
        return (
          <article className="story" key={id}>
            <h4 className="title">{title}</h4>
            <div className="info">
              {points} points by {author} | {comments} comments
            </div>
            <a
              href={url}
              target="_blank"
              className="read-link"
              rel="noopener noreferrer"
            >
              Read more
            </a>
            <button className="remove-btn" onClick={() => remove(id)}>
              Remove
            </button>
          </article>
        );
      })}
    </section>
  );
};

export default Stories;
