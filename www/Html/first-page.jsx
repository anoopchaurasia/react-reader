var LoginClass = {};
LoginClass.root = React.createClass({
	feedlyLogin: function (){
		this.props.signup('feedly');
	},
	render: function (){
		return <div>
			<button onClick={this.feedlyLogin}> Feddly Login </button>
		</div>
	}
});