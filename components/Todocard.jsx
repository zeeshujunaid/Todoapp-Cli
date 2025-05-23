import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import getPriorityStyles from '../helper/prioritystyle';

export default function TodoCard({ item, onDelete, onEdit, onComplete }) {
  const { backgroundColor, textColor } = getPriorityStyles(item.priority);

  return (
    <View style={[styles.card, { backgroundColor }]}>
      {/* Title + Top Right Info */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>
          {item.text}
        </Text>
        <View style={styles.rightInfo}>
          <Text style={[styles.priorityBadge, { borderColor: textColor, color: textColor }]}>
            {item.priority.toUpperCase()}
          </Text>
          <Text style={[styles.date, { color: textColor }]}>
            {new Date(item.dueDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
        </View>
      </View>

      {/* Description */}
      {item.description ? (
        <Text style={[styles.description, { color: textColor }]}>
          {item.description}
        </Text>
      ) : null}

      {/* Completed At */}
      {item.completed && item.completedAt && (
        <Text style={[styles.completedAt, { color: textColor }]}>
          ✅ Completed: {new Date(item.completedAt).toLocaleDateString('en-GB')}
        </Text>
      )}

      {/* Action Buttons */}
      {!item.completed && (
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => onEdit(item.id)} style={styles.iconBtn}>
            <Text style={styles.iconText}>📝</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onComplete(item.id)} style={styles.iconBtn}>
            <Text style={styles.iconText}>✔️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.iconBtn}>
            <Text style={styles.iconText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    marginRight: 10,
  },
  rightInfo: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
  },
  description: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  completedAt: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 6,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  iconBtn: {
    marginLeft: 12,
  },
  iconText: {
    fontSize: 18,
  },
});
