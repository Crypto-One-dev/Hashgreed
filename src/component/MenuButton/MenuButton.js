import React, {useContext} from 'react';
import { Button } from '@chakra-ui/react';
import cx from 'classnames';

import ThemeContext from 'context/UserContext';
import styles from './MenuButton.module.scss';

const MenuButton = ({children, active, ...props}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <div
      className={styles.main}
      style={{borderBottomColor: theme.menuItemBorder}}
    >
      <Button
        className={cx(styles.menuButton, active ? styles.active : styles.inactive)}
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