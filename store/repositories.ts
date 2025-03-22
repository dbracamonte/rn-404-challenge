// src/stores/repositoriesStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TRepository = {
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

interface IRepositoriesState {
	repositories: null | TRepository[];
	selectedRepositories: number[];
	loading: boolean;
	error: string | null;
	clearError: () => void;
	resetRepositories: () => void;
	toggleRepository: (repoId: number) => void;
	fetchRepositories: (
		query: string,
		page: number,
		perPage: number
	) => Promise<void>;
	totalStars: number;
}

export const useRepositoriesStore = create<IRepositoriesState>()(
	persist(
		(set, get) => ({
			repositories: null,
			selectedRepositories: [],
			loading: false,
			error: null,
			totalStars: 0,
			clearError: () => set({ error: null }),
			resetRepositories: () => set({ repositories: null, totalStars: 0 }),
			toggleRepository: (repoId: number) => {
				const { selectedRepositories } = get();
				if (selectedRepositories.includes(repoId)) {
					set({
						selectedRepositories: selectedRepositories.filter(
							(id) => id !== repoId
						),
					});
				} else {
					set({ selectedRepositories: [...selectedRepositories, repoId] });
				}
			},
			fetchRepositories: async (
				query: string,
				page: number,
				perPage: number
			) => {
				try {
					set({ loading: true, error: null });

					const response = await fetch(
						`https://api.github.com/search/repositories?q=${encodeURIComponent(
							query
						)}&page=${page}&per_page=${perPage}&sort=stars&order=desc`
					);

					if (!response.ok) {
						throw new Error(`Error: ${response.status} ${response.statusText}`);
					}

					const { items } = await response.json();

					const totalStars = items.reduce(
						(sum: number, repo: TRepository) => sum + repo.stargazers_count,
						0
					);

					set({
						repositories: items,
						loading: false,
						totalStars,
					});
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: "Error loading repositories",
						loading: false,
						repositories: [],
						totalStars: 0,
					});
				}
			},
		}),
		{
			name: "repositories-storage",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
