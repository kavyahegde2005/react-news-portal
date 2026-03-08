import React, { Component } from 'react'
import Newsitem from './Newsitem';


export default class Bitcoin extends Component {

  constructor() {
    super();
    console.log("Hello I am a constructor from bitcoin component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      error: null
    }
  }
  async componentDidMount() {
    console.log("cdm bitcoin");
    let url = "https://newsapi.org/v2/everything?q=bitcoin&apiKey=eb47dd6c708e4f479b8b15fbaad8c905&pageSize=20";
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      if (parsedData.status === "ok") {
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, error: null });
      } else {
        console.error("NewsAPI error", parsedData);
        this.setState({ error: parsedData.message || "Unknown API error" });
      }
    } catch (err) {
      console.error("Fetch failed", err);
      this.setState({ error: err.message });
    }
  }

  previousPage = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=eb47dd6c708e4f479b8b15fbaad8c905&page=${this.state.page - 1}&pageSize=20`;
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      if (parsedData.status === "ok") {
        this.setState({ articles: parsedData.articles, page: this.state.page - 1 });
      } else {
        console.error("NewsAPI error", parsedData);
      }
    } catch (err) {
      console.error("Fetch failed", err);
    }
  }
  
  nextPage = async () => {
    console.log("next");
    let url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=eb47dd6c708e4f479b8b15fbaad8c905&page=${this.state.page + 1}&pageSize=20`;
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      if (parsedData.status === "ok") {
        this.setState({ articles: parsedData.articles, page: this.state.page + 1 });
      } else {
        console.error("NewsAPI error", parsedData);
      }
    } catch (err) {
      console.error("Fetch failed", err);
    }
  }


  render() {
      return (
        <div className='container my-3'>
          {this.state.error && <p className="text-center text-danger">{this.state.error}</p>}
        {this.state.articles.length === 0 && !this.state.error && <p className="text-center">No articles available.</p>}
          <div className='row'>
            {this.state.articles && this.state.articles.map((element) => {
              return <div className='col-md-4' key={element.url}>
                <Newsitem title={element.title?element.title.slice(0, 50):''} description={element.description?element.description.slice(0, 100):''} imageUrl={element.urlToImage} newsUrl={element.url} />
              </div>
            })
            }
  
          </div> 
          <div className='container d-flex justify-content-between my-3'>
          <button disabled={this.state.page <= 1} type="button" onClick={this.previousPage} className="btn btn-primary">&larr;Previous</button>
          <button type="button" onClick={this.nextPage} className="btn btn-primary">Next&rarr;</button>
          </div> 
        </div>
        
      )
    }
  }
  

