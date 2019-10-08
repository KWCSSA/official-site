import React from 'react';

import '../../css/freshman/freshmanList.css';

export default props => {
  return (
    <ul className="list-group post-list-group shadow">
      {props.posts.map(post => {
        return (
          <a className="list-group-item list-group-item-action post-list-item" key={post.title} href={post.link}>{post.title}</a>
        );
      })}
    </ul>
  );
}