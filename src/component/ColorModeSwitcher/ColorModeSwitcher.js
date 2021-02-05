import React from 'react';
import cx from 'classnames';
import { Tooltip  } from '@chakra-ui/react';
import styles from './ColorModeSwitcher.module.scss';

import themes from 'theme';

export const ColorModeSwitcher = props => {
  return (
    <div className={styles.main}>
      <Tooltip hasArrow label="Regular">
        <div
          className={cx(styles.themeIcon, styles.regularTheme, props.theme === themes.regular ? styles.on : null)}
          onClick={() => props.setTheme(themes.regular)}
        > </div>
      </Tooltip>
      <Tooltip hasArrow label="Dark">
        <div
          className={cx(styles.themeIcon, styles.darkTheme, props.theme === themes.dark ? styles.on : null)}
          onClick={() => props.setTheme(themes.dark)}
        > </div>
      </Tooltip>
      <Tooltip hasArrow label="Waves">
        <div
          className={cx(styles.themeIcon, styles.wavesTheme, props.theme === themes.waves ? styles.on : null)}
          onClick={() => props.setTheme(themes.waves)}
        > </div>
      </Tooltip>
    </div>
  );
};