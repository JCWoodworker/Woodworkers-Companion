import AsyncStorage from "@react-native-async-storage/async-storage"
import { BoardEntry, SavedOrder } from "../../types"

const WORK_IN_PROGRESS_KEY = "@BoardFootCalculator:workInProgress"
const SAVED_ORDERS_KEY = "@BoardFootCalculator:savedOrders"
const ORDER_COUNTER_KEY = "@BoardFootCalculator:orderCounter"

/**
 * Save work in progress boards
 */
export async function saveWorkInProgress(boards: BoardEntry[]): Promise<void> {
	try {
		await AsyncStorage.setItem(WORK_IN_PROGRESS_KEY, JSON.stringify(boards))
	} catch (error) {
		console.error("Error saving work in progress:", error)
	}
}

/**
 * Load work in progress boards
 */
export async function loadWorkInProgress(): Promise<BoardEntry[] | null> {
	try {
		const data = await AsyncStorage.getItem(WORK_IN_PROGRESS_KEY)
		if (data) {
			return JSON.parse(data)
		}
		return null
	} catch (error) {
		console.error("Error loading work in progress:", error)
		return null
	}
}

/**
 * Clear work in progress
 */
export async function clearWorkInProgress(): Promise<void> {
	try {
		await AsyncStorage.removeItem(WORK_IN_PROGRESS_KEY)
	} catch (error) {
		console.error("Error clearing work in progress:", error)
	}
}

/**
 * Save an order
 */
export async function saveOrder(order: SavedOrder): Promise<void> {
	try {
		const existingOrders = await loadOrders()
		const updatedOrders = [...existingOrders, order]
		await AsyncStorage.setItem(SAVED_ORDERS_KEY, JSON.stringify(updatedOrders))
	} catch (error) {
		console.error("Error saving order:", error)
	}
}

/**
 * Load all saved orders
 */
export async function loadOrders(): Promise<SavedOrder[]> {
	try {
		const data = await AsyncStorage.getItem(SAVED_ORDERS_KEY)
		if (data) {
			const orders = JSON.parse(data)
			// Convert date strings back to Date objects
			return orders.map((order: any) => ({
				...order,
				createdAt: new Date(order.createdAt),
			}))
		}
		return []
	} catch (error) {
		console.error("Error loading orders:", error)
		return []
	}
}

/**
 * Delete an order
 */
export async function deleteOrder(orderId: string): Promise<void> {
	try {
		const orders = await loadOrders()
		const updatedOrders = orders.filter((o) => o.id !== orderId)
		await AsyncStorage.setItem(SAVED_ORDERS_KEY, JSON.stringify(updatedOrders))
	} catch (error) {
		console.error("Error deleting order:", error)
	}
}

/**
 * Get next order number
 */
export async function getNextOrderNumber(): Promise<number> {
	try {
		const counterStr = await AsyncStorage.getItem(ORDER_COUNTER_KEY)
		const counter = counterStr ? parseInt(counterStr, 10) : 1
		await AsyncStorage.setItem(ORDER_COUNTER_KEY, String(counter + 1))
		return counter
	} catch (error) {
		console.error("Error getting order number:", error)
		return 1
	}
}

/**
 * Update an existing order
 */
export async function updateOrder(order: SavedOrder): Promise<void> {
	try {
		const orders = await loadOrders()
		const index = orders.findIndex((o) => o.id === order.id)
		if (index !== -1) {
			orders[index] = order
			await AsyncStorage.setItem(SAVED_ORDERS_KEY, JSON.stringify(orders))
		}
	} catch (error) {
		console.error("Error updating order:", error)
	}
}
