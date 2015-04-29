var ContentClass = {};
ContentClass.root = React.createClass({
    render: function () {
		return  <div className="content" id="articleContainer">
		</div>
	}
});

ContentClass.header = React.createClass({
	render: function () {
		return <div>
			<h3> {this.props.title}</h3>
		</div>
	}
});

ContentClass.body = React.createClass({
	render: function () {
		return <div dangerouslySetInnerHTML={{__html: this.props.content}}></div>
	}
});