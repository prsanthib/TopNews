import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {

    static defaultProps = {
      country:'in',
      pagesize:'5',
      category:"business"
    }

    static propTypes = {
        country:PropTypes.string,
        pagesize:PropTypes.number,
        category:PropTypes.string
    }

    constructor(props)
    {
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0
      }
      document.title=`NewsMonkey-${props.category}`;
    }

    capitilize (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
    update= async()=>
    {
      this.props.setProgress(0);
      this.setState({loading:true});
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7199b2b4a2044638a92a0c86bdd8aa3&page=${this.state.page}&pagesize=${this.props.pagesize}`;
      this.props.setProgress(20);
      let data = await fetch(url); //returns promise
      this.props.setProgress(50);
      let parsedata = await data.json();//convert to json format
      this.props.setProgress(70);
      this.setState({articles:parsedata.articles,totalResults:parsedata.totalResults,loading:false});
      this.props.setProgress(100);
    }

    async componentDidMount()
    {
        this.update();
    }

    fetchMore = async()=>{
      this.props.setProgress(0);
      this.setState({page:this.state.page+1});
      this.props.setProgress(25);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7199b2b4a2044638a92a0c86bdd8aa3&page=${this.state.page}&pagesize=${this.props.pagesize}`;
      this.props.setProgress(50);
      let data = await fetch(url); //returns promise
      let parsedata = await data.json();//convert to json format
      this.props.setProgress(70);
      this.setState({articles:this.state.articles.concat(parsedata.articles)});
      this.props.setProgress(100);
    }

  render() {
    return (
      
      <div>
        <h1 className='text-center'> <b>NewsMonkey</b> - Top {this.capitilize(this.props.category)} Headlines</h1>
        {this.state.loading && <Loading/>}

        <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMore}
        hasMore={this.state.articles.length < this.state.totalResults}
        loader={<Loading/>}
        endMessage={
          <p style={{textAlign:'center'}}><b>Yahoo! You Have Read Everything</b> </p>
        }>
          <div className="container">
        <div className="row">
        {!this.state.loading && this.state.articles.map((ele,index)=>{
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
}

export default News