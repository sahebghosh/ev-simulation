import React, { ReactElement } from 'react';
import { ResponsiveContainer } from 'recharts';

type ChartWrapperProps = {
  children: ReactElement;
};

const RechartsWrapper: React.FC<ChartWrapperProps> = ({ children }) => (
  <ResponsiveContainer width="100%" height={350}>
    {children}
  </ResponsiveContainer>
);

export default RechartsWrapper;
