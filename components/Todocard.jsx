import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import getPriorityStyles from '../helper/prioritystyle';

export default function TodoCard({ item, onDelete, onEdit, onComplete }) {
  const { backgroundColor, textColor } = getPriorityStyles(item.priority);

  return (
    <View style={[styles.todoCard, { backgroundColor }]}>
      <View style={styles.todoTextContainer}>
        <View style={styles.metaInfo}>
          <Text style={[styles.todoId, { color: textColor }]}>
            Priority:{item.priority}
          </Text>
          <Text style={[styles.todoId, { color: textColor }]}>
            {'  '}
            {new Date(item.dueDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
        </View>

        {/* Todo Text with line-through if completed */}
        <Text
          style={[
            styles.todoTitle,
            { color: textColor },
            item.completed && styles.completedText,
          ]}
        >
          {item.text}
        </Text>

        {item.description ? (
          <Text style={[styles.todoDescription, { color: textColor }]}>
            {item.description}
          </Text>
        ) : null}

        {/* Show Completed At date if completed */}
        {item.completed && item.completedAt ? (
          <Text style={[styles.completedAtText, { color: textColor }]}>
            Completed At: {new Date(item.completedAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
        ) : null}
      </View>

      {/* Only show buttons if NOT completed */}
      {!item.completed && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.actionButton}>
            <Text style={styles.actionText}>🗑️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onEdit(item.id)} style={styles.actionButton}>
            <Text style={styles.actionText}>📝</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onComplete(item.id)} style={styles.actionButton}>
            <Text style={styles.actionText}>✔️</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  todoCard: {
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  todoTextContainer: {
    flex: 1,
  },
  todoId: {
    fontSize: 12,
    marginBottom: 5,
    marginRight: 5,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  todoDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  completedAtText: {
    fontSize: 12,
    marginTop: 6,
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 5,
  },
  actionText: {
    fontSize: 16,
  },
});
