import React, { useState, useEffect } from 'react';
import UserDemographicsSurveyForm from 'pages/UserSurvey/demographics/UserDemographicsSurveyForm';
import { push } from 'connected-react-router';
import actions from 'actions/usersurvey/usersurveyFormActions';
import { connect } from 'react-redux';

const UserDemographicsSurveyPage = (props) => {

	const {
		dispatch,
		match,
		saveLoading,
		findLoading,
		record,
		currentUser
	} = props;

	const [dispatched, setDispatched] = useState(false);

	const isEditing = () => {
		return !!match.params.id;
		// return true;
	};

	const isProfile = () => {
		return match.url === '/user/survey/demographics';
	};

	const doSubmit = (id, data) => {
		if (isEditing() || isProfile()) {
			dispatch(actions.doUpdate(id, data, isProfile()))
		} else {
			dispatch(actions.doCreate(data))
		}
	};

	useEffect(() => {
		if (isEditing()) {
			dispatch(actions.doFind(match.params.id));
		} else {
			if (isProfile()) {
				const user = JSON.parse(localStorage.getItem('user'));
				dispatch(actions.doEmailFind(user.email));
			} else {
				dispatch(actions.doNew())
			}
		}
		setDispatched(true);
	}, [match, dispatch])

	return (
		<React.Fragment>
			{dispatched && (
				<UserDemographicsSurveyForm
					saveLoading={saveLoading}
					findLoading={findLoading}
					currentUser={currentUser}
					record={(isEditing() || isProfile()) ? record : {}}
					isEditing={isEditing()}
					isProfile={isProfile()}
					onSubmit={doSubmit}
					onCancel={() => dispatch(push('/admin/userpreference'))} //where to go after clicking cancel
				/>
			)}
		</React.Fragment>
	);
}

function mapStateToProps(store) {
	return {
		findLoading: store.userpreference.form.findLoading,
		saveLoading: store.userpreference.form.saveLoading,
		record: store.userpreference.form.record,
		currentUser: store.auth.currentUser,
	};
}

export default connect(mapStateToProps)(UserDemographicsSurveyPage);

