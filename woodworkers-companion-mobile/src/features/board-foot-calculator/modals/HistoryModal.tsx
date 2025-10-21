import { useState, useEffect } from "react"
import {
	Modal,
	View,
	Text,
	ScrollView,
	Pressable,
	SafeAreaView,
	Alert,
} from "react-native"
import { SavedOrder } from "../../../types"
import { colors } from "../../../constants/theme"
import { loadOrders, deleteOrder } from "../storage"
import {
	calculateBoardFeet,
	calculateCost,
} from "../../../utils/boardFootCalculations"

interface HistoryModalProps {
	visible: boolean
	onClose: () => void
	onLoadOrder?: (order: SavedOrder) => void
}

export default function HistoryModal({
	visible,
	onClose,
	onLoadOrder,
}: HistoryModalProps) {
	const [orders, setOrders] = useState<SavedOrder[]>([])
	const [selectedOrder, setSelectedOrder] = useState<SavedOrder | null>(null)

	useEffect(() => {
		if (visible) {
			loadOrders().then(setOrders)
		}
	}, [visible])

	const handleDelete = async (orderId: string) => {
		Alert.alert("Delete Order", "Are you sure you want to delete this order?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Delete",
				style: "destructive",
				onPress: async () => {
					await deleteOrder(orderId)
					const updatedOrders = await loadOrders()
					setOrders(updatedOrders)
					if (selectedOrder?.id === orderId) {
						setSelectedOrder(null)
					}
				},
			},
		])
	}

	const handleDeleteAll = () => {
		Alert.alert(
			"Delete All Orders",
			"Are you sure you want to delete all saved orders?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete All",
					style: "destructive",
					onPress: async () => {
						for (const order of orders) {
							await deleteOrder(order.id)
						}
						setOrders([])
						setSelectedOrder(null)
					},
				},
			]
		)
	}

	const OrderCard = ({ order }: { order: SavedOrder }) => {
		const totalBoardFeet = order.boards.reduce(
			(sum, b) => sum + calculateBoardFeet(b),
			0
		)
		const totalCost = order.boards.reduce((sum, b) => sum + calculateCost(b), 0)

		return (
			<Pressable
				onPress={() => setSelectedOrder(order)}
				style={{
					backgroundColor: "white",
					padding: 16,
					borderRadius: 12,
					marginBottom: 12,
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.1,
					shadowRadius: 4,
					elevation: 3,
				}}
			>
				<Text
					style={{
						fontSize: 18,
						fontWeight: "bold",
						color: colors.darkBrown,
						marginBottom: 8,
					}}
				>
					{order.orderName}
				</Text>
				<Text
					style={{
						fontSize: 12,
						color: colors.darkBrown,
						opacity: 0.6,
						marginBottom: 8,
					}}
				>
					{new Date(order.createdAt).toLocaleDateString()}
				</Text>
				<View style={{ flexDirection: "row", gap: 16 }}>
					<Text style={{ fontSize: 14, color: colors.darkBrown }}>
						{order.boards.length} board{order.boards.length !== 1 ? "s" : ""}
					</Text>
					{totalBoardFeet > 0 && (
						<Text style={{ fontSize: 14, color: colors.woodPrimary }}>
							{totalBoardFeet.toFixed(2)} bf
						</Text>
					)}
					{totalCost > 0 && (
						<Text
							style={{
								fontSize: 14,
								color: colors.forestGreen,
								fontWeight: "600",
							}}
						>
							${totalCost.toFixed(2)}
						</Text>
					)}
				</View>

				{/* Action Buttons */}
				<View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
					<Pressable
						onPress={() => handleDelete(order.id)}
						style={{
							flex: 1,
							paddingVertical: 8,
							borderRadius: 6,
							backgroundColor: "rgba(255, 0, 0, 0.1)",
							borderWidth: 1,
							borderColor: "rgba(255, 0, 0, 0.3)",
						}}
					>
						<Text
							style={{
								color: "rgba(255, 0, 0, 0.8)",
								fontSize: 12,
								fontWeight: "600",
								textAlign: "center",
							}}
						>
							Delete
						</Text>
					</Pressable>
					{onLoadOrder && (
						<Pressable
							onPress={() => {
								onLoadOrder(order)
								onClose()
							}}
							style={{
								flex: 1,
								paddingVertical: 8,
								borderRadius: 6,
								backgroundColor: colors.woodPrimary,
							}}
						>
							<Text
								style={{
									color: "white",
									fontSize: 12,
									fontWeight: "600",
									textAlign: "center",
								}}
							>
								Load
							</Text>
						</Pressable>
					)}
				</View>
			</Pressable>
		)
	}

	return (
		<Modal
			visible={visible}
			animationType="slide"
			presentationStyle="fullScreen"
		>
			<SafeAreaView
				style={{ flex: 1, backgroundColor: colors.creamBackground }}
			>
				{/* Header */}
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						padding: 20,
						paddingTop: 60,
					}}
				>
					<Pressable onPress={onClose}>
						<Text style={{ fontSize: 24 }}>🏠</Text>
					</Pressable>

					<Text
						style={{
							fontSize: 24,
							fontWeight: "bold",
							color: colors.darkBrown,
						}}
					>
						Order History
					</Text>

					{orders.length > 0 && (
						<Pressable onPress={handleDeleteAll}>
							<Text
								style={{
									fontSize: 12,
									fontWeight: "600",
									color: "rgba(255, 0, 0, 0.7)",
								}}
							>
								Delete All
							</Text>
						</Pressable>
					)}
					{orders.length === 0 && <View style={{ width: 60 }} />}
				</View>

				{/* Content */}
				{orders.length === 0 ? (
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text style={{ fontSize: 60, marginBottom: 12 }}>📋</Text>
						<Text
							style={{
								fontSize: 20,
								color: colors.darkBrown,
								opacity: 0.6,
							}}
						>
							No saved orders yet
						</Text>
					</View>
				) : (
					<ScrollView contentContainerStyle={{ padding: 20, paddingTop: 0 }}>
						{orders.map((order) => (
							<OrderCard key={order.id} order={order} />
						))}
					</ScrollView>
				)}
			</SafeAreaView>
		</Modal>
	)
}
