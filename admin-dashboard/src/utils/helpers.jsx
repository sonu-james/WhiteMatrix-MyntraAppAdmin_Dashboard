// helpers.js
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
};

export const getFormattedDate = (date) => {
  return date.toISOString().split('T')[0];
};


export const getStatusBadge = (status) => {
  const colorMap = {
    Pending: 'text-danger',
    Shipped: 'text-success',
    Delivered: 'text-secondary',
  };
  return (
    <span className={`d-inline-flex align-items-center gap-1 fw-semibold ${colorMap[status] || ''}`}>
      <span
        className="dot"
        style={{
          height: 8,
          width: 8,
          borderRadius: '50%',
          backgroundColor: 'currentColor',
          display: 'inline-block',
        }}
      ></span>
      {status}
    </span>
  );
};
