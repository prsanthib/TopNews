import React, { useState,useEffect } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {

    const [articles,setArticles] = useState([]);
    const [loading,setLoading] = useState(false);
    const [page,setPage] = useState(1);
    const [totalResults,setTotalResults] = useState(0);

    const capitilize =  (string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const update = async()=>
    {
      props.setProgress(0);
      setLoading(true);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`;
      props.setProgress(20);
      let data = await fetch(url); //returns promise
      props.setProgress(50);
      let parsedata = await data.json();//convert to json format
      props.setProgress(70);
      setArticles(parsedata.articles);
      setTotalResults(parsedata.totalResults);
      setLoading(false);
      props.setProgress(100);
    }

    useEffect(() => {
      document.title=`NewsOcean-${props.category}`;
      update();
    }, []);
    

    const fetchMore = async()                                                 =>{
      props.setProgress(0);
      props.setProgress(25);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a7199b2b4a2044638a92a0c86bdd8aa3&page=${page+1}&pagesize=${props.pagesize}`;
      setPage(page+1);
      props.setProgress(50);
      let data = await fetch(url); //returns promise
      let parsedata = await data.json();//convert to json format
      props.setProgress(70);
      setArticles(articles.concat(parsedata.articles));
      props.setProgress(100);
    }

  
    return (
      
      <div>
        <h1 className='text-center' style={{marginTop:'60px',marginBottom:'20px'}}> <b>NewsOcean</b> - Top {capitilize(props.category)} Headlines</h1>
        {loading && <Loading/>}

        <InfiniteScroll
        dataLength={articles.length}
        next={fetchMore}
        hasMore={articles.length < totalResults}
        loader={<Loading/>}
        endMessage={
          <p style={{textAlign:'center'}}><b>Yahoo! You Have Read Everything</b> </p>
        }>
          <div className="container">
        <div className="row">
        {!loading && articles.map((ele,index)=>{
                return  <div className="col-md-4 my-3" key={index}>
                <NewsItem title = {ele.title} description={ele.description} imgUrl={ele.urlToImage} url={ele.url} author={ele.author} time={ele.publishedAt} source={ele.source.id} />
                </div>
            })}
          </div>
           </div>
           </InfiniteScroll>
        </div>
     )
  }


// News.defaultProps = {
//   country:'in',
//   pagesize:'5',
//   category:"business"
// }

News.propTypes = {
    country:PropTypes.string,
    pagesize:PropTypes.number,
    category:PropTypes.string
}

export default News