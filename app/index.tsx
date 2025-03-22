import { useCallback, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { SearchBar } from '@/components/SearchBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRepositoriesStore } from '@/store/repositories';
import { debounce } from '@/utils/debounce';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import { RepositoryList } from '@/components/RepositoryList';

export default function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const {
    error,
    loading,
    repositories,
    totalStars,
    clearError,
    resetRepositories,
    fetchRepositories,
  } = useRepositoriesStore();

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.length >= 3) {
        fetchRepositories(query, 1, 20);
      } else {
        resetRepositories();
      }
    }, 500),
    [fetchRepositories, resetRepositories]
  );

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    clearError();
    debouncedSearch(text);
  };

  const renderContent = () => {
    if (error && searchQuery.length >= 3) {
      return (
        <ThemedView style={styles.centerContainer}>
          <ThemedText type="error">{error}</ThemedText>
        </ThemedView>
      );
    }

    if (loading) {
      return (
        <ThemedView style={styles.centerContainer}>
          <ThemedText>Cargando repositorios...</ThemedText>
        </ThemedView>
      );
    }

    if (!searchQuery || searchQuery.length < 3) {
      return (
        <ThemedView style={styles.centerContainer}>
          <ThemedText>Github repositories</ThemedText>
        </ThemedView>
      );
    }

    return (
      <RepositoryList
        data={repositories || []}
        loading={loading}
        onRefresh={fetchRepositories}
        searchQuery={searchQuery}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <ThemedView style={styles.header}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </ThemedView>
      <ThemedView style={styles.container}>
        {renderContent()}
      </ThemedView>
      <ThemedView style={styles.footer}>
        <ThemedText type='defaultSemiBold'>
          ⭐ {totalStars}
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
});