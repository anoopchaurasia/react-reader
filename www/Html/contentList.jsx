var ContentListClass = {};
ContentListClass.root = React.createClass({
	getInitialState: function () {
		return {contentList: this.props.starter.contentList}
	},
    render: function () {
		return  <div>
				<ContentListClass.header/>
				<div className="content">
					<ContentListClass.list contents={this.state.contentList}/>
				</div>
		</div>
	}
});

ContentListClass.header = React.createClass({
	render: function () {
		return <div>
			<h3> Select Atleast Three Your Interests </h3>
		</div>
	}
});

ContentListClass.list = React.createClass({
	render: function (){
		var list =  this.props.contents.items.map(function(content){
			return <li className="table-view-cell"> <a href={"#/contents/"+content.id}> {content.title} </a></li>
		});

		return <ul className="table-view">
			{list}
			</ul>
	}
});

