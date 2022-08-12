import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'USERMATCHES_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'USERMATCHES_FORM_FIND_STARTED',
      });

      axios.get(`/usermatches/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'USERMATCHES_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERMATCHES_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/usermatches'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'USERMATCHES_FORM_CREATE_STARTED',
      });

      axios.post('/usermatches', { data: values }).then((res) => {
        dispatch({
          type: 'USERMATCHES_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Usermatches created' });
        dispatch(push('/admin/usermatches'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERMATCHES_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'USERMATCHES_FORM_UPDATE_STARTED',
      });

      await axios.put(`/usermatches/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'USERMATCHES_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Usermatches updated' });
        dispatch(push('/admin/usermatches'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERMATCHES_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
