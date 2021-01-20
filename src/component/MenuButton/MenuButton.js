import React from 'react';
import { Button } from '@chakra-ui/react';

import styles from './MenuButton.module.scss';

const MenuButton = ({children, active, ...props}) => {
  return (
    <div className={styles.main}>
      <Button
        className={active ? styles.activeButton : styles.inActiveButton}
        {...props}
      >
        {children}
      </Button>
    </div>
  )
};

export default MenuButton;