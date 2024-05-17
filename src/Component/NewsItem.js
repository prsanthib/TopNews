import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    const { title, description, imgUrl, url, author, time, source } =
      this.props;
    return (
      <div>
        <div className="card">
          <img src={imgUrl?imgUrl: "https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=s0-w300-rw"} height="200px" alt="noimg"/>
          <div className="card-body">
            <h5 className="card-title">
              {title ? title : ""}
              <span class="badge text-bg-warning text-dark">New</span>
              <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger "style={{left:'90%',zIndex:1}}>
               {source?source:"prashu-news"}
               
              </span>
            </h5>
            <p className="card-text">
              {description ? description : ""}{" "}
            </p>
            <p class="card-text">
              <small className="text-body-secondary">
                By {author?author:"Unknown"} on {new Date(time).toGMTString()}
              </small>
            </p>
          </div>
          <a
            href={url}
            rel="noreferrer"
            target="_blank"
            className="btn btn-primary">
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
