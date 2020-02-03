import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {Button, Modal, Backdrop, Fade} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

interface IErrorModalProps {
    error?: any
}

const ErrorModal: React.FC<IErrorModalProps> = ({error}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        if (error) {
            console.log(error);
            setOpen(true)
        }
    }, [error])
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {
                error && <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                      timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <div className={classes.paper}>
                      <h2 id="transition-modal-title">에러</h2>
                      <p id="transition-modal-description">에러가 발생하였습니다.</p>
                      <p id="transition-modal-description">확인 수 다시 시작하세요.</p>
                      <Button
                        onClick={handleClose}>확인</Button>
                    </div>
                  </Fade>
                </Modal>
            }
        </div>
    );
}
export default ErrorModal
