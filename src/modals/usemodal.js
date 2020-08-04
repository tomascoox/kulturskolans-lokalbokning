import React from 'react';

const ToggleUpdateModal = ({ toggle, content }) => {
  const [isShown, setIsShown] = React.useState(false);
  const hideUpdateModal = () => setIsShown(false);
  const showUpdateModal = () => setIsShown(true);

  return (
    <React.Fragment>
      {toggle(showUpdateModal)}
      {isShown && content(hideUpdateModal)}
    </React.Fragment>
  );
};

export default ToggleUpdateModal;
