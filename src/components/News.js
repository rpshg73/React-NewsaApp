import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [totalResults, setTotalResults] = useState(0);

	document.title = 'NayaKhabar-' + capitalizeFirstLetter(props.category);

	let updateNews = async() => {
		let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&pageSize=${props.pageSize}&category=${props.category}&page=${page}&apiKey=${props.apiKey}`;
		setLoading(true);
		let data = await fetch(url);  // fetchapi starts a request and returns a promise
		let parsedData = await data.json();
		setArticles(parsedData.articles);
		setTotalResults(parsedData.totalResults);
		setLoading(false);
	}


	useEffect(() => {
		updateNews();
	}, []);
	

	let fetchMoreData = async() =>{
		setPage(page+1);
		let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&pageSize=${props.pageSize}&category=${props.category}&page=${page}&apiKey=${props.apiKey}`;
		setLoading(true);
		let data = await fetch(url);  // fetchapi starts a request and returns a promise
		let parsedData = await data.json();
		setArticles(articles.concat(parsedData.articles));
		setTotalResults(parsedData.totalResults);
		setLoading(false);
	}

	return (
		<>
			<h1 className='text-center'>Top Headlines - {capitalizeFirstLetter(props.category)}</h1>
			{loading && <Spinner />}
			<InfiniteScroll
				dataLength={articles.length}
				next={fetchMoreData}
				hasMore={articles.length!==totalResults}
				loader={<Spinner />}
			>
				<div className="container">
					<div className="row my-4">

						{articles.map((element) => {
							return <div className="col-md-4 my-3" key={element.url}>
								<NewsItem title={element.title ? element.title.slice(0, 45) : ""} desc={element.description ? element.description.slice(0, 88) : ""} image={element.urlToImage ? element.urlToImage : "https://th.bing.com/th/id/OIP.DgXrjoUlbkhALiHYlDf35gHaEw?pid=ImgDet&rs=1"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
							</div>

						})}
					</div>
				</div>
			</InfiniteScroll>
		</>
	)
	
}


News.defaultProps = {
	country: 'in',
	category: 'general',
	pageSize: 5
}

News.propTypes = {
	country: PropTypes.string,
	catrgory: PropTypes.string,
	pageSize: PropTypes.number
}

export default News;