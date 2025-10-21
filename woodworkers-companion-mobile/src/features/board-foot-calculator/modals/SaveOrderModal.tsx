import { useState } from "react"
import {
	Modal,
	View,
	Text,
	TextInput,
	Pressable,
	SafeAreaView,
} from "react-native"
import { BoardEntry } from "../../../types"
import { colors } from "../../../constants/theme"
import { getNextOrderNumber, saveOrder } from "../storage"

interface SaveOrderModalProps {
	visible: boolean
	boards: BoardEntry[]
	onSave: () => void
	onCancel: () => void
}

export default function SaveOrderModal({
	visible,
	boards,
	onSave,
	onCancel,
}: SaveOrderModalProps) {
	const [orderName, setOrderName] = useState("")

	const handleSave = async () => {
		const name = orderName.trim()
		const finalName = name || `Order ${await getNextOrderNumber()}`

		await saveOrder({
			id: Date.now().toString(),
			orderName: finalName,
			boards,
			createdAt: new Date(),
		})

		setOrderName("")
		onSave()
	}

	const handleCancel = () => {
		setOrderName("")
		onCancel()
	}

	return (
		<Modal
			visible={visible}
			animationType="slide"
			presentationStyle="pageSheet"
			transparent={false}
		>
			<SafeAreaView
				style={{ flex: 1, backgroundColor: colors.creamBackground }}
			>
				<View style={{ flex: 1, padding: 20, gap: 24 }}>
					<Text
						style={{
							fontSize: 24,
							fontWeight: "bold",
							color: colors.darkBrown,
							marginTop: 20,
							textAlign: "center",
						}}
					>
						Save Order
					</Text>

					<Text
						style={{
							fontSize: 14,
							color: colors.darkBrown,
							opacity: 0.7,
							textAlign: "center",
						}}
					>
						Give your order a name (optional)
					</Text>

					<TextInput
						value={orderName}
						onChangeText={setOrderName}
						placeholder="Order name"
						style={{
							fontSize: 16,
							color: colors.darkBrown,
							padding: 12,
							backgroundColor: "white",
							borderRadius: 8,
							borderWidth: 1,
							borderColor: `${colors.woodPrimary}4D`,
						}}
					/>

					<View style={{ flex: 1 }} />

					<View style={{ gap: 12 }}>
						<Pressable
							onPress={handleSave}
							style={{
								paddingVertical: 14,
								borderRadius: 10,
								backgroundColor: colors.forestGreen,
								shadowColor: "#000",
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.2,
								shadowRadius: 4,
								elevation: 4,
							}}
						>
							<Text
								style={{
									color: "white",
									fontSize: 16,
									fontWeight: "600",
									textAlign: "center",
								}}
							>
								{orderName.trim() ? "Save" : "Skip Naming and Save"}
							</Text>
						</Pressable>

						<Pressable
							onPress={handleCancel}
							style={{
								paddingVertical: 14,
								borderRadius: 10,
								backgroundColor: "rgba(255, 255, 255, 0.6)",
								borderWidth: 1,
								borderColor: `${colors.woodPrimary}4D`,
							}}
						>
							<Text
								style={{
									color: colors.darkBrown,
									fontSize: 16,
									fontWeight: "500",
									textAlign: "center",
								}}
							>
								Cancel
							</Text>
						</Pressable>
					</View>
				</View>
			</SafeAreaView>
		</Modal>
	)
}
