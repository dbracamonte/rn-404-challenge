import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useRepositoriesStore } from '@/store/repositories';
import { RepositoryList } from '@/components/RepositoryList';

export default function ModalScreen() {
  const { selectedRepositories, repositories } = useRepositoriesStore();

  return (
    <ThemedView style={styles.container}>
      {repositories && (
        <RepositoryList
          data={repositories.filter((repo) => selectedRepositories.includes(repo.id))}
          loading={false}
          searchQuery={''}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});