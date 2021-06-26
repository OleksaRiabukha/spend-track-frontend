import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Container from '@material-ui/core/Container';
import SpendingEditForm from './SpendingEditForm';

const SpendingEditPopUp = (props ) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose} >
      <Container>
        <SpendingEditForm 
        handleClose={props.handleClose} 
        handleSubmit={props.handleSubmit}
        onSubmit={props.onSubmit}
        control={props.control}
        categories={props.categories}
        spendingId={props.spendingId}
        token={props.token}
        isError={props.isError}
        setIsError={props.setIsError}
        count={props.count}
        setCount={props.setCount}
        />
      </Container>
    </Dialog>
  )
};

export default SpendingEditPopUp;