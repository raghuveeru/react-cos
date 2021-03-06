import React from 'react';
import BudgetActivity from './BudgetActivity';
import BudgetViewBody from './BudgetViewBody';


var BudgetView = React.createClass({		
	goBack: function(){
		if(window.history.length){
			window.history.go(-1)
		}
	},
	render: function(){			
		
		return (
			<div>
				<nav className="nav-crumb">
					<a onClick = {this.goBack}>
						<em className="fa fa-home" />
					</a>
				</nav>
				<h1>Budget cut details</h1>
				<div className="row">
					<div className="sp-content">
						<BudgetViewBody id = {this.props.params.id} />
					</div>
					<div className="sp-sidebar">
						<BudgetActivity id = {this.props.params.id} {...this.props} />
					</div>
				</div>
			</div>
		)
	}
});

module.exports = BudgetView