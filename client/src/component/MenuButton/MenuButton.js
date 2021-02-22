import React, {useContext} from 'react';
import { Button } from '@chakra-ui/react';
import cx from 'classnames';

import ThemeContext from 'context/UserContext';
import themes from 'theme';
import styles from './MenuButton.module.scss';

const MenuButton = ({children, active, sub, ...props}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <div
      className={styles.main}
      style={{borderBottomColor: theme.menuItemBorder}}
    >
      <Button
        className={cx(styles.menuButton, active ? styles.active : sub && theme !== themes.dark ? styles.subinactive : styles.inactive)}
        style={{backgroundColor: theme.buttonBack, color: theme.primaryText}}
        fontWeight={400}
        {...props}
      >
        {children}
      </Button>
    </div>
  )
};

export default MenuButton;