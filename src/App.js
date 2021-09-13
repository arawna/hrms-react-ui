import './App.css';
import Dashboard from './layouts/Dashboard';
import "react-toastify/dist/ReactToastify.min.css"
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from './store/actions/authActions';


function App() {

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if(localStorage.getItem("user")){
      dispatch(userLogin(JSON.parse(localStorage.getItem("user"))))
    }
  })

  return (
    <div className="App">
      <Dashboard/>
    </div>
  );
}

export default App;
