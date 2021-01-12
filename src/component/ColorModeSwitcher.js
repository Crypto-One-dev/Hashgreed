import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

import themes from 'theme';

export const ColorModeSwitcher = props => {
  const text = props.theme === themes.light ? 'light' : 'dark';
  const SwitchIcon = props.theme === themes.light ? FaSun : FaMoon;

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={() => props.setTheme(props.theme === themes.light ? themes.dark : themes.light)}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};