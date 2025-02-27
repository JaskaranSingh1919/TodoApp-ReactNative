import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Switch, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const App = () => {
  // State for managing tasks and input
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  // Function to add a new task
  const addTask = () => {
    if (taskTitle.trim()) {
      const newTask = {
        id: Date.now().toString(), // Unique ID for each task
        title: taskTitle,
        status: 'due', // Default status
      };
      setTasks([...tasks, newTask]); // Add the new task to the list
      setTaskTitle(''); // Clear the input field
    }
  };

  // Function to toggle task status between 'due' and 'done'
  const toggleStatus = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: task.status === 'due' ? 'done' : 'due' } : task
    );
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My ToDo App</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="#999"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <TouchableOpacity
          style={[styles.addButton, !taskTitle.trim() && styles.disabledButton]}
          onPress={addTask}
          disabled={!taskTitle.trim()}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            {/* Switch to toggle task status */}
            <Switch
              value={item.status === 'done'}
              onValueChange={() => toggleStatus(item.id)}
              trackColor={{ false: '#ccc', true: '#4CAF50' }}
              thumbColor={item.status === 'done' ? '#fff' : '#fff'}
            />
            <Text
              style={[
                styles.taskTitle,
                item.status === 'done' && styles.taskCompleted,
              ]}
            >
              {item.title}
            </Text>
            {/* Delete Button */}
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.taskList}
      />
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#6200EE',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: '#6200EE',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  addButtonText: {
    fontSize: 24,
    color: '#FFF',
  },
  taskList: {
    padding: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    fontSize: 20,
    color: '#FF4444',
  },
});

export default App;