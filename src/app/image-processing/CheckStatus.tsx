import React, { useEffect, useState } from 'react';

interface CheckStatusProps {
  taskId: string;
}

const CheckStatus: React.FC<CheckStatusProps> = ({ taskId }) => {
  const [status, setStatus] = useState<string>('Checking...');

  return (
    <div className="text-center">
      <h3>Processing Status</h3>
      <p>{status}</p>
    </div>
  );
};

export default CheckStatus;
