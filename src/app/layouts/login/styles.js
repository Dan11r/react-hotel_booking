import { makeStyles } from '@material-ui/styles';
import background from '../../assets/img/signIn-background.jpg';

const useStyles = makeStyles(theme => ({
  rootWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&:after': {
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
      background: `url(${background}) no-repeat center center`,
      backgroundSize: 'cover',
      zIndex: -1,
      display: 'block',
      top: '-10%',
    },
  },
  formFooter: {
    marginTop: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formWrapper: {
    padding: '30px',
    paddingTop: '40px',
    marginTop: '100px',
    width: '480px',
  },
}));

export default useStyles;
