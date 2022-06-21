import React from 'react'

export default class NewsItem extends React.Component {
	render() {
		let {title,desc,image,newsUrl} = this.props;
		return (
			<div>
				<div className="card" style={{width: '18rem'}}>
					<img src={image} className="card-img-top" alt="..."/>
					<div className="card-body">
						<h5 className="card-title">{title} ...</h5>
						<p className="card-text">{desc} ....</p>
						<a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
					</div>
				</div>
			</div>
		)
	}
}