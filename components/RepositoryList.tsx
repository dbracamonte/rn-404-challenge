import React from 'react';
import { FlatList, StyleSheet, Image, RefreshControl, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as Linking from 'expo-linking';
import { useRepositoriesStore } from '@/store/repositories';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

type RepositoryItemProps = {
  id: number;
  full_name: string;
  html_url: string;
  owner: {
    avatar_url: string;
    login: string;
  };
  name: string;
  stargazers_count: number;
};

type RepositoryListProps = {
  data: RepositoryItemProps[];
  loading: boolean;
  searchQuery: string;
  onRefresh?: (query: string, page: number, perPage: number) => Promise<void>;
};

const RepositoryItem = ({ item }: { item: RepositoryItemProps }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { toggleRepository, selectedRepositories } = useRepositoriesStore();
  const isSelected = selectedRepositories.includes(item.id);

  return (
    <ThemedView style={styles.itemContainer}>
      <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
      <ThemedView style={styles.infoContainer}>
        <ThemedText>{item.owner.login}</ThemedText>
        <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.sideContainer}>
        <ThemedView style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => Linking.openURL(item.html_url)}>
            <Ionicons name="log-out-outline" size={24} color={isDarkMode ? '#666' : '#999'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleRepository(item.id)}>
            <Ionicons name={isSelected ? "checkbox" : "checkbox-outline"} size={24} color={isDarkMode ? '#666' : '#999'} />
          </TouchableOpacity>
        </ThemedView>
        <ThemedView style={styles.starsContainer}>
          <ThemedText type="defaultSemiBold">⭐ {item.stargazers_count}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export const RepositoryList = ({ data, loading, onRefresh, searchQuery }: RepositoryListProps) => {
  const handleRefresh = () => {
    if (searchQuery.length >= 3 && onRefresh) {
      onRefresh(searchQuery, 1, 20);
    }
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
      }
      ItemSeparatorComponent={() => <ThemedView style={styles.divider} />}
      ListEmptyComponent={
        !loading && searchQuery.length >= 3 ? (
          <ThemedView style={styles.emptyContainer}>
            <ThemedText>No se encontraron repositorios</ThemedText>
          </ThemedView>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    borderRadius: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
  },
  sideContainer: {
    alignItems: 'flex-end',
    gap: 8,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  starsContainer: {
    paddingLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 6,
  },
});