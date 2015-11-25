import React from 'react';
import NewMapping from './NewMapping';
import Modal from 'react-modal';
import {customStyles} from '../../constants';
import {arrayJoin} from '../../utilities';
import {StoreWatchMixin} from 'fluxxor';

var Mapping = React.createClass({
	mixins: [StoreWatchMixin('AdminStore')],
	componentDidMount: function(){

		this.props.flux.actions.AdminActions.getMappingMpToHods();

		this.props.flux.actions.AdminActions.getMappingHodToLiasons();
	},
	getStateFromFlux: function(){

		return {
			AdminStore: this.props.flux.stores.AdminStore.getState()
		}
	},
	getInitialState: function(){

		return {
			isModalOpen: false,
			selectedMapping: {},
			selectedMappingType: null
		}
	},
	openModal: function(){

		this.setState({
			isModalOpen: true,
			selectedMapping: {},
			selectedMappingType: ''
		})
	},
	closeModal: function(){
		
		this.setState({
			isModalOpen: false
		})
	},
	deleteMapping: function(obj, index, type){

		if(confirm('Are you sure you want to delete?')){		
		
			switch(type){
				case 1:
					
					this.props.flux.actions.AdminActions.deleteMappingMpToHods({
						mapping: obj,
						userId: CURRENT_USER.id,
						index: index
					})
					break;

				case 2:
					
					this.props.flux.actions.AdminActions.deleteMappingHodToLiasons({
						mapping: obj,
						userId: CURRENT_USER.id,
						index: index
					})
					break;
			}		
		}
	},
	editMapping: function(item, type){

		this.setState({
			selectedMapping: item,
			selectedMappingType: type,
			isModalOpen: true
		})
	},
	render: function(){

		var {
			isModalOpen,
			selectedMapping,
			AdminStore,
			selectedMappingType
		} = this.state;

		
		var {
			mappingMPHods,
			mappingHodLiasons
		} = AdminStore;

		return (
			<div>
				<a className="card-link" onClick = {this.openModal}><em className='fa fa-plus' />Add mapping</a>
				<Modal 
					isOpen = {isModalOpen}
					style={customStyles}
					onRequestClose={this.closeModal}
					>
					<NewMapping {...this.props} closeModal = {this.closeModal} selectedMapping = {selectedMapping} selectedMappingType = {selectedMappingType} />
				</Modal>	
				<h4>MP to HODs</h4>

				<table className="table table-admin">
					<thead>
						<tr>
							<th width="250">MP</th>
							<th>HODs</th>
							<th className="cell-actions"></th>
						</tr>
					</thead>
					<tbody>
						{mappingMPHods.map( (item, idx) => {

							var deleteFn = this.deleteMapping.bind(this, item, idx, 1);
							var editFn = this.editMapping.bind(this, item, idx, 1);

							return (
								<tr key = {idx}>
									<td>{item.memberOfParliament.name}</td>
									<td>{arrayJoin(item.hods, 'name')}</td>
									<td className="cell-actions">
										<a className="link-edit" onClick = {editFn}>Edit</a> 
										<a className="link-delete" onClick = {deleteFn}>Delete</a>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>

				<br />

				<h4>HOD to Liason officers</h4>

				<table className="table table-admin">
					<thead>
						<tr>
							<th width="250">HOD</th>
							<th>Liason officers</th>
							<th className="cell-actions"></th>
						</tr>
					</thead>
					<tbody>
						{mappingHodLiasons.map( (item, idx) => {

							var deleteFn = this.deleteMapping.bind(this, item, idx, 2)
							var editFn = this.editMapping.bind(this, item, idx, 2);

							return (
								<tr key = {idx}>
									<td>{item.hod.name}</td>
									<td>{arrayJoin(item.liasonOfficers, 'name')}</td>
									<td className="cell-actions">
										<a className="link-edit" onClick = {editFn}>Edit</a> 
										<a className="link-delete" onClick = {deleteFn}>Delete</a>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
});

module.exports = Mapping;