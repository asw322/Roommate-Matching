import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'USERPREFERENCE_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'USERPREFERENCE_FORM_FIND_STARTED',
      });

      axios.get(`/userpreference/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'USERPREFERENCE_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERPREFERENCE_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/userpreference'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'USERPREFERENCE_FORM_CREATE_STARTED',
      });

      axios.post('/userpreference', { data: values }).then(res => {
        dispatch({
          type: 'USERPREFERENCE_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Userpreference created' });
        dispatch(push('/admin/userpreference'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERPREFERENCE_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'USERPREFERENCE_FORM_UPDATE_STARTED',
      });

      await axios.put(`/userpreference/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'USERPREFERENCE_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Userpreference updated' });
        dispatch(push('/admin/userpreference'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERPREFERENCE_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
