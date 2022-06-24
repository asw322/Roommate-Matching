import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'USERQUESTIONWEIGHT_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'USERQUESTIONWEIGHT_FORM_FIND_STARTED',
      });

      axios.get(`/userquestionweight/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'USERQUESTIONWEIGHT_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERQUESTIONWEIGHT_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/userquestionweight'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'USERQUESTIONWEIGHT_FORM_CREATE_STARTED',
      });

      axios.post('/userquestionweight', { data: values }).then(res => {
        dispatch({
          type: 'USERQUESTIONWEIGHT_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Userquestionweight created' });
        dispatch(push('/admin/userquestionweight'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERQUESTIONWEIGHT_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'USERQUESTIONWEIGHT_FORM_UPDATE_STARTED',
      });

      await axios.put(`/userquestionweight/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'USERQUESTIONWEIGHT_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Userquestionweight updated' });
        dispatch(push('/admin/userquestionweight'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERQUESTIONWEIGHT_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
