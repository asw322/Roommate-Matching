import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'LOCATIONPREFERENCE_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'LOCATIONPREFERENCE_FORM_FIND_STARTED',
      });

      axios.get(`/locationpreference/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'LOCATIONPREFERENCE_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'LOCATIONPREFERENCE_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/locationpreference'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'LOCATIONPREFERENCE_FORM_CREATE_STARTED',
      });

      axios.post('/locationpreference', { data: values }).then(res => {
        dispatch({
          type: 'LOCATIONPREFERENCE_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Locationpreference created' });
        dispatch(push('/admin/locationpreference'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'LOCATIONPREFERENCE_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'LOCATIONPREFERENCE_FORM_UPDATE_STARTED',
      });

      await axios.put(`/locationpreference/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'LOCATIONPREFERENCE_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Locationpreference updated' });
        dispatch(push('/admin/locationpreference'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'LOCATIONPREFERENCE_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
