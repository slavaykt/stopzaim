import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const ExtendableButton = withStyles((theme) => ({
  root: {
    paddingRight: 8,
    '& p': {
      transition: theme.transitions.create(["display"], {
        duration: theme.transitions.duration.complex,
      }),
      display: 'none'
    },
    '&:hover p': {
      display: 'inline'
    },
    '&:focus ': {
      outline: 'none'
    },
  },
}))(Button);

export default ExtendableButton;