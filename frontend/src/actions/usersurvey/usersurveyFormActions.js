import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'USERSURVEY_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'USERSURVEY_FORM_FIND_STARTED',
      });

      axios.get(`/usersurvey/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'USERSURVEY_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERSURVEY_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/usersurvey'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'USERSURVEY_FORM_CREATE_STARTED',
      });

      axios.post('/usersurvey', { data: values }).then(res => {
        dispatch({
          type: 'USERSURVEY_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Usersurvey created' });
        dispatch(push('/admin/usersurvey'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERSURVEY_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'USERSURVEY_FORM_UPDATE_STARTED',
      });

      await axios.put(`/usersurvey/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'USERSURVEY_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Usersurvey updated' });
        dispatch(push('/admin/usersurvey'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERSURVEY_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
