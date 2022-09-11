import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function(SpecificComponent, option, adminRoute = null) {
  //<option>
  //null  => Any one can access the page
  //true  => Only logged user can access the page
  //false => Logged user cannot access the page

  let navigate = useNavigate();

  function AuthenticationCheck() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);

        //Not login
        if (!response.payload.isAuth) {
          if (option) {
            navigate('/login');
          }
        } else {
          //Login
          if (adminRoute && !response.payload.isAdmin) {
            navigate('/');
          } else {
            if (option === false) {
              navigate('/');
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
