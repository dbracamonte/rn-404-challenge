import React from 'react';
import {
  TextInput,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons'

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const showError = value.length > 0 && value.length < 3;

  return (
    <ThemedView style={styles.wrapper}>
      <ThemedView style={styles.container}>
        <Ionicons color={isDarkMode ? '#666' : '#999'} size={20} name="search" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search repository"
          placeholderTextColor={isDarkMode ? '#666' : '#999'}
          style={{ color: isDarkMode ? '#fff' : '#000' }}
        />
      </ThemedView>
      {showError && (
        <ThemedText type='error'>
          Please enter at least 3 characters
        </ThemedText>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 16,
    gap: 6,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
});
