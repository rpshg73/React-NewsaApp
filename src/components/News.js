import React from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends React.Component {
	static defaultProps = {
		country : 'in',
		category: 'entertainment',
		pageSize : 5
	}

	static propTypes = {
		country : PropTypes.string,
		catrgory : PropTypes.string,
		pageSize : PropTypes.number
	}

	constructor() {
		super();
		this.state = {
			articles: [],
			loading: false,
			page: 1
		}
	}

	async componentDidMount() {  // this function won't be invoked until promise is resolved
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&pageSize=${this.props.pageSize}&category=${this.props.category}&apiKey=0f27f7d55fbd48828bd81517cd58917d`;
		this.setState({ loading: true });
		let data = await fetch(url);  // fetchapi starts a request and returns a promise
		let parsedData = await data.json();
		this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
	}

	handlePreviousClick = async () => {
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0f27f7d55fbd48828bd81517cd58917d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
		this.setState({ loading: true });
		let data = await fetch(url);
		let parsedData = await data.json();
		this.setState({
			page: this.state.page - 1,
			articles: parsedData.articles,
			loading: false
		})
	}

	handleNextClick = async () => {
		if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
		}

		else {
			let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0f27f7d55fbd48828bd81517cd58917d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
			this.setState({ loading: true });
			let data = await fetch(url);
			let parsedData = await data.json()
			this.setState({
				page: this.state.page + 1,
				articles: parsedData.articles,
				loading: false
			})
		}
	}

	render() {
		return (
			<>
				<div className="container mt-3">
					<h1 className='text-center'>NayaKhabar Top Headlines</h1>
					{this.state.loading && <Spinner />}
					<div className="row my-4">
						{!this.state.loading&&this.state.articles.map((element) => {
							return <div className="col-md-4 my-3" key={element.url}>
								<NewsItem title={element.title ? element.title.slice(0, 45) : ""} desc={element.description ? element.description.slice(0, 88) : ""} image={element.urlToImage ? element.urlToImage : "https://th.bing.com/th/id/OIP.DgXrjoUlbkhALiHYlDf35gHaEw?pid=ImgDet&rs=1"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
							</div>

						})}
					</div>
				</div>

				<div className="container d-flex justify-content-around">
					<button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>

					<button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
				</div>
			</>
		)
	}
}