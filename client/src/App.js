import './App.css';
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from './index';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';
import NavBar from './components/NavBar';

const App = observer(()=> {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <Spinner animation={'grow'}/>
  }

  return (
    <BrowserRouter>
      {user.isAuth?
        <NavBar/>
        :
        <div/>
      }
      <AppRouter/>
    </BrowserRouter>
  );
})

export default App;
