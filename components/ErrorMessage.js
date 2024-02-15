import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

const ErrorMessage = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return visible ? <Text>{message}</Text> : null;
};

export default ErrorMessage;