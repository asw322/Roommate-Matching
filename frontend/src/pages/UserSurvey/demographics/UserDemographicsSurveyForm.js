import { Formik } from 'formik';
import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Loader from 'components/Loader';
// eslint-disable-next-line no-unused-vars
import InputFormItem from 'components/FormItems/items/InputFormItem';
// eslint-disable-next-line no-unused-vars
import SwitchFormItem from 'components/FormItems/items/SwitchFormItem';
// eslint-disable-next-line no-unused-vars
import RadioFormItem from 'components/FormItems/items/RadioFormItem';
// eslint-disable-next-line no-unused-vars
import SelectFormItem from 'components/FormItems/items/SelectFormItem';
// eslint-disable-next-line no-unused-vars
import DatePickerFormItem from 'components/FormItems/items/DatePickerFormItem';
// eslint-disable-next-line no-unused-vars
import ImagesFormItem from 'components/FormItems/items/ImagesFormItem';
// eslint-disable-next-line no-unused-vars
import FilesFormItem from 'components/FormItems/items/FilesFormItem';
// eslint-disable-next-line no-unused-vars

import usersurveyFields from 'pages/CRUD/Usersurvey/helpers/usersurveyFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

const UserDemographicsSurveyForm = (props) => {

  const {
  isEditing,
  isProfile,
  findLoading,
  saveLoading,
  record,
  onSubmit,
  onCancel,
  modal
  } = props;

  const iniValues = () => {
  return IniValues(usersurveyFields, record || {});
  }

  const formValidations = () => {
  return FormValidations(usersurveyFields, record || {});
  }

  const handleSubmit = (values) => {
  const { id, ...data } = PreparedValues(usersurveyFields, values || {});
  onSubmit(id, data);
  };

  const title = () => {
  if(isProfile) {
  return 'Edit My Profile';
  }

  return isEditing
  ? 'Edit Usersurvey'
  : 'Add Usersurvey';
  };

  const renderForm = () => (
  <Widget title={<h4>{title()}</h4>} collapse close>
  <Formik
          onSubmit={handleSubmit}
  initialValues={iniValues()}
  validationSchema={formValidations()}
  >
  {(form) => (
  <form onSubmit={form.handleSubmit}>
    <Grid container spacing={3} direction="column">

      <Grid item>
        <InputFormItem
          name={'q1'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q2'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q3'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q4'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q5'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q6'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q7'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q8'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q9'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q10'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q11'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q12'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q13'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q14'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q15'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q16'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q17'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q18'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q19'}
          schema={usersurveyFields}
        />
      </Grid>

      <Grid item>
        <InputFormItem
          name={'q20'}
          schema={usersurveyFields}
        />
      </Grid>

  </Grid>
  <Grid container spacing={3} mt={2}>
    <Grid item>
      <Button
        color="primary"
        variant="contained"
        onClick={form.handleSubmit}
      >
        Save
      </Button>
    </Grid>
    <Grid item>
      <Button
        color="primary"
        variant="outlined"
        onClick={form.handleReset}
      >
        Reset
      </Button>
    </Grid>
    <Grid item>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => onCancel()}
      >
        Cancel
      </Button>
    </Grid>
  </Grid>
      </form>
      )
      }
    </Formik>
  </Widget>
  );
  if (findLoading) {
  return <Loader />;
  }
  if (isEditing && !record) {
  return <Loader />;
  }
  return renderForm();
  }
  export default UserDemographicsSurveyForm;
