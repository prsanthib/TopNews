import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import PropTypes from 'prop-types'

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

    constructor()
    {
        super();
        this.state={
            articles:[],
            loading:false,
            page:1,
      }
    }

    update= async()=>
    {
      this.setState({loading:true});
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9e5b0b014b844c66ac8e17aa8f3fda9c&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
      let data = await fetch(url); //returns promise
      let parsedata = await data.json();//convert to json format
      this.setState({articles:parsedata.articles,totalResults:parsedata.totalResults,loading:false});
    }

    async componentDidMount()
    {
        // this.setState({loading:true});
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9e5b0b014b844c66ac8e17aa8f3fda9c&page=1&pagesize=${this.props.pagesize}`;
        // let data = await fetch(url); //returns promise
        // let parsedata = await data.json();//convert to json format
        // this.setState({articles:parsedata.articles,totalResults:parsedata.totalResults,loading:false});
        this.update();
    }

    handlenext = async()=>
    {      
    //   this.setState({loading:true});
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9e5b0b014b844c66ac8e17aa8f3fda9c&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
    //   let data = await fetch(url); //returns promise
    //   let parsedata = await data.json();//convert to json format
    //   this.setState({articles:parsedata.articles,page:this.state.page+1,loading:false});
    //
      this.setState({page:this.state.page+1});
      this.update();
   }

    handleprev= async()=>
    {
      // this.setState({loading:true});
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9e5b0b014b844c66ac8e17aa8f3fda9c&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
      // let data = await fetch(url); //returns promise
      // let parsedata = await data.json();//convert to json format
      // this.setState({articles:parsedata.articles,page:this.state.page-1,loading:false});
      this.setState({page:this.state.page-1});
      this.update();
    }

  render() {
    return (
      <div>
        <div className="container">
        {this.state.loading && <Loading/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((ele)=>{
                return  <div className="col-md-4 my-3" key={ele.url}>
                <NewsItem title = {ele.title} description={ele.description} imgUrl={ele.urlToImage} url={ele.url} author={ele.author} time={ele.publishedAt} source={ele.source.id} />
                </div>
            })}

           </div>
           <div className="d-flex justify-content-between">
           <button type="button" disabled = {this.state.page<=1 ? true:false} onClick={this.handleprev}className="btn btn-dark">Prev..</button>
           <button type="button" disabled = {this.state.page+1 <= Math.ceil(this.state.totalResults/this.props.pagesize) ? false:true} onClick = {this.handlenext} className="btn btn-dark">Next..</button>
        </div>
        </div>
        

      </div>
    )
  }
}

export default News
