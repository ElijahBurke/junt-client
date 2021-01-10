import { useHistory } from 'react-router-dom';

const handleClick = (history) => (name) => () => history.push(`/${name}`);

const UseNavigate = () => handleClick(useHistory());

export default UseNavigate;
