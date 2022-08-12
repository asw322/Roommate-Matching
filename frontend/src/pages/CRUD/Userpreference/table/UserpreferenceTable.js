// eslint-disable-next-line
import * as dataFormat from 'pages/CRUD/Userpreference/table/UserpreferenceDataFormatters';

import actions from 'actions/userpreference/userpreferenceListActions';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { uniqueId } from 'lodash';
import { withStyles } from '@mui/styles';
import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Link as LinkMaterial } from '../../../../components/Wrappers';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import Widget from 'components/Widget';
import Actions from '../../../../components/Table/Actions';
import Dialog from '../../../../components/Dialog';

const useStyles = makeStyles({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
    '& a': {
      textDecoration: 'none',
      color: '#fff',
    },
  },
});

const UserpreferenceTable = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [width, setWidth] = React.useState(window.innerWidth);

  const [filters, setFilters] = React.useState([
    { label: 'Q 1', title: 'q1', number: 'true' },
    { label: 'Q 2', title: 'q2', number: 'true' },
    { label: 'Q 3', title: 'q3', number: 'true' },
    { label: 'Q 4', title: 'q4', number: 'true' },
    { label: 'Q 5', title: 'q5', number: 'true' },
    { label: 'Q 6', title: 'q6', number: 'true' },
    { label: 'Q 7', title: 'q7', number: 'true' },
    { label: 'Q 8', title: 'q8', number: 'true' },
    { label: 'Q 9', title: 'q9', number: 'true' },
    { label: 'Q 10', title: 'q10', number: 'true' },
    { label: 'Q 11', title: 'q11', number: 'true' },
    { label: 'Q 12', title: 'q12', number: 'true' },
    { label: 'Q 13', title: 'q13', number: 'true' },
    { label: 'Q 14', title: 'q14', number: 'true' },
    { label: 'Q 15', title: 'q15', number: 'true' },
    { label: 'Q 16', title: 'q16', number: 'true' },
    { label: 'Q 17', title: 'q17', number: 'true' },
    { label: 'Q 18', title: 'q18', number: 'true' },
    { label: 'Q 19', title: 'q19', number: 'true' },
    { label: 'Q 20', title: 'q20', number: 'true' },
    { label: 'Q 21', title: 'q21', number: 'true' },
    { label: 'Q 22', title: 'q22', number: 'true' },
  ]);

  const [filterItems, setFilterItems] = React.useState([]);
  const [filterUrl, setFilterUrl] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [sortModel, setSortModel] = React.useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);

  const count = useSelector((store) => store.userpreference.list.count);
  const modalOpen = useSelector((store) => store.userpreference.list.modalOpen);
  const rows = useSelector((store) => store.userpreference.list.rows);
  const idToDelete = useSelector(
    (store) => store.userpreference.list.idToDelete,
  );

  const [rowsState, setRowsState] = React.useState({
    page: 0,
    pageSize: 5,
  });

  const loadData = async (limit, page, orderBy, request) => {
    setLoading(true);
    await dispatch(actions.doFetch({ limit, page, orderBy, request }));
    setLoading(false);
  };

  React.useEffect(() => {
    loadData(rowsState.pageSize, rowsState.page, sortModel[0], filterUrl);
  }, [sortModel, rowsState]);

  React.useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  const handleSortModelChange = (newModel) => {
    setSortModel(newModel);
  };

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
  };

  const handleChange = (id) => (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFilterItems(
      filterItems.map((item) =>
        item.id === id
          ? { id, fields: { ...item.fields, [name]: value } }
          : item,
      ),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let request = '&';
    filterItems.forEach((item) => {
      filters[
        filters.map((filter) => filter.title).indexOf(item.fields.selectedField)
      ].hasOwnProperty('number')
        ? (request += `${item.fields.selectedField}Range=${item.fields.filterValueFrom}&${item.fields.selectedField}Range=${item.fields.filterValueTo}&`)
        : (request += `${item.fields.selectedField}=${item.fields.filterValue}&`);
    });

    loadData(rowsState.pageSize, 0, sortModel[0], request);
    setFilterUrl(request);
  };

  const handleReset = () => {
    setFilterItems([]);
    setFilterUrl('');
    dispatch(
      actions.doFetch({ limit: rowsState.pageSize, page: 0, request: '' }),
    );
  };

  const addFilter = () => {
    let newItem = {
      id: uniqueId(),
      fields: {
        filterValue: '',
        filterValueFrom: '',
        filterValueTo: '',
      },
    };
    newItem.fields.selectedField = filters[0].title;
    setFilterItems([...filterItems, newItem]);
  };

  const deleteFilter = (value) => (e) => {
    e.preventDefault();
    const newItems = filterItems.filter((item) => item.id !== value);
    if (newItems.length) {
      setFilterItems(newItems);
    } else {
      dispatch(actions.doFetch({ limit: 10, page: 1 }));
      setFilterItems(newItems);
    }
  };

  const handleDelete = () => {
    dispatch(
      actions.doDelete({ limit: 10, page: 0, request: filterUrl }, idToDelete),
    );
  };

  const openModal = (event, cell) => {
    const id = cell;
    event.stopPropagation();
    dispatch(actions.doOpenConfirm(id));
  };

  const closeModal = () => {
    dispatch(actions.doCloseConfirm());
  };

  function NoRowsOverlay() {
    return (
      <Stack height='100%' alignItems='center' justifyContent='center'>
        No results found
      </Stack>
    );
  }

  const columns = [
    {
      field: 'q1',

      flex: 0.6,

      headerName: 'Q 1',
    },

    {
      field: 'q2',

      flex: 0.6,

      headerName: 'Q 2',
    },

    {
      field: 'q3',

      flex: 0.6,

      headerName: 'Q 3',
    },

    {
      field: 'q4',

      flex: 0.6,

      headerName: 'Q 4',
    },

    {
      field: 'q5',

      flex: 0.6,

      headerName: 'Q 5',
    },

    {
      field: 'q6',

      flex: 0.6,

      headerName: 'Q 6',
    },

    {
      field: 'q7',

      flex: 0.6,

      headerName: 'Q 7',
    },

    {
      field: 'q8',

      flex: 0.6,

      headerName: 'Q 8',
    },

    {
      field: 'q9',

      flex: 0.6,

      headerName: 'Q 9',
    },

    {
      field: 'q10',

      flex: 0.6,

      headerName: 'Q 10',
    },

    {
      field: 'q11',

      flex: 0.6,

      headerName: 'Q 11',
    },

    {
      field: 'q12',

      flex: 0.6,

      headerName: 'Q 12',
    },

    {
      field: 'q13',

      flex: 0.6,

      headerName: 'Q 13',
    },

    {
      field: 'q14',

      flex: 0.6,

      headerName: 'Q 14',
    },

    {
      field: 'q15',

      flex: 0.6,

      headerName: 'Q 15',
    },

    {
      field: 'q16',

      flex: 0.6,

      headerName: 'Q 16',
    },

    {
      field: 'q17',

      flex: 0.6,

      headerName: 'Q 17',
    },

    {
      field: 'q18',

      flex: 0.6,

      headerName: 'Q 18',
    },

    {
      field: 'q19',

      flex: 0.6,

      headerName: 'Q 19',
    },

    {
      field: 'q20',

      flex: 0.6,

      headerName: 'Q 20',
    },

    {
      field: 'q21',

      flex: 0.6,

      headerName: 'Q 21',
    },

    {
      field: 'q22',

      flex: 0.6,

      headerName: 'Q 22',
    },

    {
      field: 'id',
      headerName: 'Actions',
      sortable: false,
      flex: 0.6,
      maxWidth: 80,
      renderCell: (params) => (
        <Actions
          classes={classes}
          entity='userpreference'
          openModal={openModal}
          {...params}
        />
      ),
    },
  ];

  return (
    <div>
      <Widget title={<h4>Userpreference</h4>} disableWidgetMenu>
        <Box className={classes.actions}>
          <Link to='/admin/userpreference/new'>
            <Button variant='contained'>New</Button>
          </Link>
          <Button type='button' variant='contained' onClick={addFilter}>
            Add Filter
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          {filterItems.map((item) => (
            <Grid
              container
              alignItems='center'
              columns={12}
              spacing={1}
              className={classes.container}
            >
              <Grid item xs={3}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Field</InputLabel>
                  <Select
                    label='Field'
                    name='selectedField'
                    size='small'
                    value={item.fields.selectedField}
                    onChange={handleChange(item.id)}
                  >
                    {filters.map((selectOption) => (
                      <MenuItem
                        key={selectOption.title}
                        value={`${selectOption.title}`}
                      >
                        {selectOption.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {filters
                .find((filter) => filter.title === item.fields.selectedField)
                .hasOwnProperty('number') ? (
                <>
                  <Grid item xs={2}>
                    <TextField
                      label='From'
                      type='text'
                      name='filterValueFrom'
                      size='small'
                      fullWidth
                      onChange={handleChange(item.id)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label='To'
                      type='text'
                      name='filterValueTo'
                      size='small'
                      fullWidth
                      onChange={handleChange(item.id)}
                    />
                  </Grid>
                </>
              ) : (
                <Grid item xs={4}>
                  <TextField
                    label='Contained'
                    type='text'
                    name='filterValue'
                    size='small'
                    fullWidth
                    onChange={handleChange(item.id)}
                  />
                </Grid>
              )}

              <Grid item xs={2}>
                <Button
                  variant='outlined'
                  color='error'
                  onClick={deleteFilter(item.id)}
                >
                  <CloseIcon />
                </Button>
              </Grid>
            </Grid>
          ))}
          {filterItems.length > 0 && (
            <Grid container spacing={1}>
              <Grid item>
                <Button variant='outlined' onClick={(e) => handleSubmit(e)}>
                  Apply
                </Button>
              </Grid>
              <Grid item>
                <Button color='error' variant='outlined' onClick={handleReset}>
                  Clear
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>

        <div
          style={{
            minHeight: 500,
            width: '100%',
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <DataGrid
            rows={loading ? [] : rows}
            columns={columns}
            sortingMode='server'
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            pageSize={5}
            pagination
            {...rowsState}
            rowCount={count}
            paginationMode='server'
            components={{ NoRowsOverlay, LoadingOverlay: LinearProgress }}
            onPageChange={(page) => {
              setRowsState((prev) => ({ ...prev, page }));
            }}
            onPageSizeChange={(pageSize) => {
              setRowsState((prev) => ({ ...prev, pageSize }));
            }}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
            checkboxSelection
            disableSelectionOnClick
            disableColumnMenu
            loading={loading}
            onRowClick={(e) => {
              history.push(`/admin/userpreference/${e.id}/edit`);
            }}
            autoHeight
          />
        </div>

        <div>
          <LinkMaterial
            color={'primary'}
            target={'_blank'}
            href={
              process.env.NODE_ENV === 'production'
                ? window.location.origin + '/api-docs/#/Userpreference'
                : 'http://localhost:8080/api-docs/#/Userpreference'
            }
          >
            API documentation for userpreference
          </LinkMaterial>
        </div>
      </Widget>

      <Dialog
        open={modalOpen}
        title='Confirm delete'
        contentText='Are you sure you want to delete this item?'
        onClose={closeModal}
        onSubmit={handleDelete}
      />
    </div>
  );
};

export default UserpreferenceTable;
