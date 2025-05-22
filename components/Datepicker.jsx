// components/DatePicker.js
import React, { useContext, useState } from 'react';
import { Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemeContext } from '../Theme/themecontext';

export default function DatePicker({ dueDate, setDueDate }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <>
      <Button
        title={dueDate.toDateString()}
        onPress={() => setShowDatePicker(true)}
        color={isDark ? '#bbb' : undefined}
      />

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDueDate(selectedDate);
          }}
        />
      )}
    </>
  );
}
