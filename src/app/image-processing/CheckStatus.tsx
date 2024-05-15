import React, { useEffect, useState } from 'react';

interface CheckStatusProps {
  taskId: string;
}

const CheckStatus: React.FC<CheckStatusProps> = ({ taskId }) => {
  const [status, setStatus] = useState<string>('Checking...');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('https://staging.api.dragonflyai.co/pipeline/assets/status', {
          method: 'POST',
          headers: {
            'Authorization': 'api_key',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ taskId }),
        });
        const data = await response.json();
        setStatus(data.status);
      } catch (error) {
        console.error("Error checking status:", error);
        setStatus('Error checking status');
      }
    };

    checkStatus();
  }, [taskId]);

  return (
    <div className="text-center">
      <h3>Processing Status</h3>
      <p>{status}</p>
    </div>
  );
};

export default CheckStatus;
