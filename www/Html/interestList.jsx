var InteresetClass = {};
InteresetClass.interest = React.createClass({

    render: function () {
		return  <div>
				<InteresetClass.header/>
				<div className="content">
					<InteresetClass.list contents={this.props.contentList}/>
				</div>
		</div>
	}
});

InteresetClass.header = React.createClass({
	render: function () {
		return <div>
			<h3> Select Atleast Three Your Interests </h3>
		</div>
	}
});

InteresetClass.list = React.createClass({
	render: function (){
		var list =  this.props.contents.items.map(function(interest){
			return <li className="table-view-cell"> <a href={"#contents/"+interest.id}> {interest.title} </a></li>
		});

		return <ul className="table-view">
			{list}
			</ul>
	}
});

