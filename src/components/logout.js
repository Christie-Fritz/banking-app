import { useContext } from 'react';
import { UserContext } from './context';
import { useNavigate } from 'react-router-dom';

function Logout (){
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogout () {
        userContext.loggedInUser = null;

        navigate('/');
    }

    return <button type="button" className="btn btn-light" onClick={handleLogout}> 
      Logout
    </button>
}

export default Logout;
