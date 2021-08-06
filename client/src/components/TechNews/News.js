import React, { useState, useEffect } from 'react'
import Spinner from '../common/Spinner';
import Article from './Article'

function News() {

    const [articles,setArticles] = useState([])

    const url = 'https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=54827c34744747ceb84ee357b596a09d';

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => setArticles(data.articles))
        .catch(err => console.log(err))
    }, [])


    console.log(articles)

    let content;
    if(articles.length===0){
        content = <Spinner />
    }else{
        content = articles.map((news,idx) =>(
            <Article key={idx} news={news} />
        ))
    }

    
    return (
        <div>
            {content}
        </div>
    )
}

export default News
