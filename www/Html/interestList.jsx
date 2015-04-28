var InteresetClass = {};
InteresetClass.interest = React.createClass({

    render: function () {
		return  <div>
				<InteresetClass.header/>
				<InteresetClass.list interests={this.props.interests}/>
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
		var list =  this.props.interests.items.map(function(interest){
			return <li> {interest.name} </li>
		});

		return <ul>
			{list}
			</ul>
	}
});

