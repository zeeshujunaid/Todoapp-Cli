// utils/priorityStyles.js

const getPriorityStyles = priority => {
    const styles = {
      High: { backgroundColor: '#ff4d4d', textColor: '#000' },
      Medium: { backgroundColor: '#ffeb3b', textColor: '#000' },
      Low: { backgroundColor: '#4caf50', textColor: '#000' },
    };
    return styles[priority] || { backgroundColor: '#fff', textColor: '#000' };
  };
  
  export default getPriorityStyles;
  