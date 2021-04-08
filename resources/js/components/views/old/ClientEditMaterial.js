import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const ClientEditMaterial = () => {
  const { activeTab: tabIndex } = useSelector(state => state.app);
  const data = useSelector(state => state.app.panes[tabIndex].data);
  return (
    <form autoComplete="off" className="pt-3">
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <TextField label="Код" margin="dense" variant="outlined" fullWidth value={data.id} />
        </Grid>
        <Grid item xs={10}>
          <TextField label="Наименование" margin="dense" variant="outlined" fullWidth value={data.Наименование} />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Фамилия" margin="dense" variant="outlined" fullWidth value={data.Фамилия} />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Имя" margin="dense" variant="outlined" fullWidth value={data.Имя} />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Отчество" margin="dense" variant="outlined" fullWidth value={data.Отчество} />
        </Grid>
      </Grid>
    </form>

  )

}

export default ClientEditMaterial;
