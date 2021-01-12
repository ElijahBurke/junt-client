import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as R from 'ramda';
import actionCreators from '../../Redux/actionCreators';

const handleClick = (history, dispatchError) => (name) => () => {
  history.push(`/${name}`);
  dispatchError({ error: '' });
};

const UseNavigate = () => handleClick(useHistory(), R.compose(
  useDispatch(),
  actionCreators.setError,
));

export default UseNavigate;
