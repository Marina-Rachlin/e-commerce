'use client'
import React, { useEffect, useState } from 'react';
import { useLoadUserQuery } from '../redux/features/api/apiSlice';
import Loader from './Loader/Loader';

const CustomLoading = ({ children }) => {
  const { isLoading, data } = useLoadUserQuery({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { // to ensure that initial ssr and csr will match (isClient will be changed after the component mounted)
    setIsClient(true);
  }, []);

  if (isLoading || !isClient) {
    return <Loader />;
  }

  return <div>{children}</div>;
};

export default CustomLoading;