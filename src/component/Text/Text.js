import React, {useContext} from 'react';

import ThemeContext from 'context/UserContext';

const Text = ({children, ...props}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <div style={{color: theme.textColor}} {...props}>
      {children}
    </div>
  )
}

export default Text