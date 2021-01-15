import React, {useContext} from 'react';

import ThemeContext from 'context/UserContext';

const Text = ({ color, children, ...props }) => {
  const {theme} = useContext(ThemeContext);

  return (
    <span style={{color: color || theme.textColor}} {...props}>
      {children}
    </span>
  )
}

export default Text