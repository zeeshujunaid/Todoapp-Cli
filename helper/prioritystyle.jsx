// utils/priorityStyles.js

const getPriorityStyles = priority => {
  const normalizedPriority = priority?.toLowerCase();

  const styles = {
    high: { backgroundColor: '#ff4d4d', textColor: '#000' },
    medium: { backgroundColor: '#ffeb3b', textColor: '#000' },
    low: { backgroundColor: '#4caf50', textColor: '#000' },
  };

  return styles[normalizedPriority] || { backgroundColor: '#fff', textColor: '#000' };
};

export default getPriorityStyles;
