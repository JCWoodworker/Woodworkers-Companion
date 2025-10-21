import {
	Modal,
	View,
	Text,
	ScrollView,
	Pressable,
	Dimensions,
} from "react-native"
import { colors, shadows } from "../constants/theme"

interface ToolSummaryModalProps {
	visible: boolean
	toolName: string
	summary: string
	onClose: () => void
}

export default function ToolSummaryModal({
	visible,
	toolName,
	summary,
	onClose,
}: ToolSummaryModalProps) {
	const screenHeight = Dimensions.get("window").height

	// Parse markdown-style bold text (**text**)
	const parseSummary = (text: string) => {
		const parts: Array<{ text: string; bold: boolean }> = []
		const regex = /\*\*([^*]+)\*\*/g
		let lastIndex = 0
		let match

		while ((match = regex.exec(text)) !== null) {
			// Add text before the match
			if (match.index > lastIndex) {
				parts.push({
					text: text.substring(lastIndex, match.index),
					bold: false,
				})
			}
			// Add the matched bold text
			parts.push({ text: match[1], bold: true })
			lastIndex = regex.lastIndex
		}

		// Add remaining text
		if (lastIndex < text.length) {
			parts.push({ text: text.substring(lastIndex), bold: false })
		}

		return parts.length > 0 ? parts : [{ text, bold: false }]
	}

	const summaryParts = parseSummary(summary)

	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onClose}
		>
			<Pressable
				style={{
					flex: 1,
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					justifyContent: "center",
					alignItems: "center",
					padding: 20,
				}}
				onPress={onClose}
			>
				<Pressable
					style={{
						width: "100%",
						height: screenHeight * 0.9,
						backgroundColor: colors.creamBackground,
						borderRadius: 20,
						overflow: "hidden",
						...shadows.modal,
					}}
					onPress={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<View
						style={{
							backgroundColor: colors.woodSecondary,
							padding: 16,
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								fontSize: 20,
								fontWeight: "bold",
								color: colors.darkBrown,
								flex: 1,
							}}
						>
							{toolName}
						</Text>
						<Pressable
							onPress={onClose}
							hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
						>
							<Text
								style={{
									fontSize: 28,
									color: colors.darkBrown,
									fontWeight: "600",
								}}
							>
								×
							</Text>
						</Pressable>
					</View>

					{/* Scrollable Content */}
					<ScrollView
						style={{ flex: 1 }}
						contentContainerStyle={{ padding: 20 }}
					>
						<Text
							style={{ fontSize: 16, color: colors.darkBrown, lineHeight: 24 }}
						>
							{summaryParts.map((part, index) => (
								<Text
									key={index}
									style={{
										fontWeight: part.bold ? "bold" : "normal",
									}}
								>
									{part.text}
								</Text>
							))}
						</Text>
					</ScrollView>
				</Pressable>
			</Pressable>
		</Modal>
	)
}
