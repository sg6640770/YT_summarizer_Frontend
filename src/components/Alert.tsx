import React from 'react';

interface AlertProps {
  alert: { msg: string; type: string } | null;
}

const Alert: React.FC<AlertProps> = ({ alert }) => {
  const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

  return (
    alert && (
      <div
        className={`alert alert-${alert.type} fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded shadow-md ${
          alert.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}
        role="alert"
      >
        <strong>{capitalize(alert.type)}:</strong> {alert.msg}
      </div>
    )
  );
};

export default Alert;
