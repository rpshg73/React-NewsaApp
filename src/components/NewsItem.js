import React from 'react'

const NewsItem = (props) => {
		let {title,desc,image,newsUrl,author,date,source} = props;
		return (
			<div>
				<div className="card" style={{width: '18rem'}}>
					<img src={image} className="card-img-top" alt="..."/>
					<div className="card-body">
						<span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}> {source} </span>
						<h5 className="card-title">{title} ...</h5>
						<p className="card-text">{desc} ....</p>
						<p className="card-text"><small className="text-danger">By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
						<a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
					</div>
				</div>
			</div>
		)
	
}

export default NewsItem;