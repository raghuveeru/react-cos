import React from 'react';
import {Route, DefaultRoute, Redirect} from 'react-router';
import Main from './components/Main';
import BudgetLayout from './components/budgets/Layout';
import NewBudget from './components/budgets/New';
import Users from './components/admin/Users';
import Groups from './components/admin/Groups';
import AdminLayout from './components/admin/Layout';

module.exports = (
	<Route handler = {Main} path = '/'>
		<DefaultRoute handler={BudgetLayout} />
		
		<Route handler={NewBudget} path = "budgets/new" />
		<Route handler={BudgetLayout} path = "budgets/:type" />
		

		<Route handler = {AdminLayout} name='admin'>			
			<Route handler = {Users} path = 'users' />
			<Route handler = {Groups} path = 'groups' />
			<Route handler = {Users} path = 'topics' />			
		</Route>
	</Route>
)