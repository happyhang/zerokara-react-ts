import * as React from 'react';
import { useDispatch } from 'react-redux';

import logo from 'assets/images/logo.png';
import classes from './homePage.module.scss';
import { homeActions } from './homePageSlice';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(homeActions.init());
  }, []);

  return (
    <div className={classes.wrap}>
      <div>
        <img src={logo} alt="Logo" />
        <h1>
          <span role="img" aria-label="Hi">👋</span>
          Hello from &apos;zerokara-react-ts&apos;
        </h1>
        <p>
          If you are seeing this page.
          You have successfully started this project successfully (yay
          <span role="img" aria-label="party">🎉</span>
          )!
          <br />
          There are some documentation on&nbsp;
          <span role="img" aria-label="book">📖</span>
          README.md that tells you what you can do next, please have a read!
        </p>
        <p>
          If you have any&nbsp;
          <span role="img" aria-label="question">❓</span>
          issues or questions, please try to raise an issue in GitHub!
          <br />
          If you like this, please give a support by giving a ⭐ to the repo! 😛
        </p>
      </div>
    </div>
  );
};

export default HomePage;
