import React from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
// import LoadingBar from 'react-top-loading-bar';

export default class News extends React.Component {
	capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	static defaultProps = {
		country: 'in',
		category: 'general',
		pageSize: 5
	}

	static propTypes = {
		country: PropTypes.string,
		catrgory: PropTypes.string,
		pageSize: PropTypes.number
	}

	constructor(props) {
		super(props);
		this.state = {
			articles: [],
			loading: false,
			page: 1,
			totalResults: 0
		}
		document.title = 'NayaKhabar-' + this.capitalizeFirstLetter(this.props.category);
	}

	async updateNews() {
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&pageSize=${this.props.pageSize}&category=${this.props.category}&page=${this.state.page}&apiKey=${this.props.apiKey}`;
		this.setState({ loading: true });
		let data = await fetch(url);  // fetchapi starts a request and returns a promise
		let parsedData = await data.json();
		this.setState({
			articles: parsedData.articles,
			totalResults: parsedData.totalResults,
			loading: false
		});
	}

	async componentDidMount() {  // this function won't be invoked until promise is resolved
		this.updateNews();
	}

	fetchMoreData = async() =>{
		this.setState({page:this.state.page+1});
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&pageSize=${this.props.pageSize}&category=${this.props.category}&page=${this.state.page}&apiKey=${this.props.apiKey}`;
		this.setState({ loading: true });
		let data = await fetch(url);  // fetchapi starts a request and returns a promise
		let parsedData = await data.json();
		this.setState({
			articles: this.state.articles.concat(parsedData.articles),
			totalResults: parsedData.totalResults,
			loading: false
		});
	}

	// handlePreviousClick = async () => {
	// 	this.updateNews();
	// 	this.setState({ page: this.state.page - 1 });
	// }

	// handleNextClick = async () => {
	// 	if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))){
	// 		this.updateNews();
	// 		this.setState({ page: this.state.page + 1 });
	// 	}
	// }

	render() {
		return (
			<>
					<h1 className='text-center'>Top Headlines - {this.capitalizeFirstLetter(this.props.category)}</h1>
					{this.state.loading && <Spinner />}
					<InfiniteScroll
						dataLength={this.state.articles.length}
						next={this.fetchMoreData}
						hasMore={this.state.articles.length!==this.state.totalResults}
						loader={<Spinner />}
					>
						<div className="container">
							<div className="row my-4">
								{/* {!this.state.loading && this.state.articles.map((element) => { */}
								{this.state.articles.map((element) => {
									return <div className="col-md-4 my-3" key={element.url}>
										<NewsItem title={element.title ? element.title.slice(0, 45) : ""} desc={element.description ? element.description.slice(0, 88) : ""} image={element.urlToImage ? element.urlToImage : "https://th.bing.com/th/id/OIP.DgXrjoUlbkhALiHYlDf35gHaEw?pid=ImgDet&rs=1"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
									</div>

								})}
							</div>
						</div>
					</InfiniteScroll>
				

				{/* <div className="container d-flex justify-content-around">
					<button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>

					<button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
				</div> */}
			</>
		)
	}
}