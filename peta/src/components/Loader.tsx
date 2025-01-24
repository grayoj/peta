import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

interface LoadingComponentProps {
  visible: boolean;
}

export const Loader: React.FC<LoadingComponentProps> = ({ visible }) => {
  return visible ? (
    <div className="loading-spinner">
      <RotatingLines
        visible={true}
        width="20"
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  ) : null;
};
