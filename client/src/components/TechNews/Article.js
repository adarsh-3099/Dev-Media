import React from 'react'

function Article({ news }) {
    return (
        <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img className="rounded-circle d-none d-md-block" src={news.title}
                alt="" />
            </a>
            </div>
            <br />
            <p className="text-center">{news.description}</p>
            <img src={news.urlToImage} />
          </div>
          <div className="col-md-10">
            <p className="lead">{news.content}</p>
          </div>
          <a href={news.url} className="btn btn-info btn-blue" target="_blank">Click here to read more.</a>
        </div>
    
      

    )
}

export default Article
