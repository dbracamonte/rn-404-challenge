import { ApiService } from "./apiService";

export interface IRepository {
	instrument_id: number;
	ticker: string;
	quantity: number;
	last_price: number;
	close_price: number;
	avg_cost_price: number;
}

class RepositoriesService {
	async get(): Promise<IRepository[]> {
		try {
			return await ApiService.get<IRepository[]>("/portfolio");
		} catch (error) {
			console.error("Error fetching portfolios:", error);
			throw error;
		}
	}
}

export const repositoriesService = new RepositoriesService();
