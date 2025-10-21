import {
	Modal,
	View,
	Text,
	ScrollView,
	Pressable,
	SafeAreaView,
} from "react-native"
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system/legacy"
import { colors } from "../../../constants/theme"

interface ExportModalProps {
	visible: boolean
	exportText: string
	onClose: () => void
}

export default function ExportModal({
	visible,
	exportText,
	onClose,
}: ExportModalProps) {
	const handleShare = async () => {
		try {
			const fileUri = FileSystem.cacheDirectory + "board-foot-export.txt"
			await FileSystem.writeAsStringAsync(fileUri, exportText)

			if (await Sharing.isAvailableAsync()) {
				await Sharing.shareAsync(fileUri)
			}
		} catch (error) {
			console.error("Error sharing file:", error)
		}
	}

	return (
		<Modal
			visible={visible}
			animationType="slide"
			presentationStyle="pageSheet"
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
						padding: 16,
						borderBottomWidth: 1,
						borderBottomColor: colors.woodPrimary,
					}}
				>
					<View style={{ width: 60 }} />
					<Text
						style={{
							fontSize: 18,
							fontWeight: "bold",
							color: colors.darkBrown,
						}}
					>
						Export Data
					</Text>
					<Pressable onPress={onClose}>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "600",
								color: colors.woodPrimary,
							}}
						>
							Done
						</Text>
					</Pressable>
				</View>

				{/* Export Text */}
				<ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
					<View
						style={{
							backgroundColor: "white",
							padding: 16,
							borderRadius: 10,
						}}
					>
						<Text
							style={{
								fontFamily: "Courier",
								fontSize: 14,
								color: colors.darkBrown,
								lineHeight: 20,
							}}
						>
							{exportText}
						</Text>
					</View>
				</ScrollView>

				{/* Share Button */}
				<View style={{ padding: 20 }}>
					<Pressable
						onPress={handleShare}
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							gap: 8,
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
						<Text style={{ fontSize: 18 }}>📤</Text>
						<Text
							style={{
								color: "white",
								fontSize: 16,
								fontWeight: "600",
							}}
						>
							Share / Save
						</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		</Modal>
	)
}
