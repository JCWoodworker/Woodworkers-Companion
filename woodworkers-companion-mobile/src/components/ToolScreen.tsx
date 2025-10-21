import { useState } from "react"
import { View, Text, ScrollView, Pressable } from "react-native"
import { useRouter } from "expo-router"
import { colors } from "../constants/theme"
import DevelopmentBanner from "./DevelopmentBanner"
import ToolSummaryModal from "./ToolSummaryModal"

interface ToolScreenProps {
	toolName: string
	inDevelopment: boolean
	summary: string
}

export default function ToolScreen({
	toolName,
	inDevelopment,
	summary,
}: ToolScreenProps) {
	const router = useRouter()
	const [showSummary, setShowSummary] = useState(false)

	return (
		<View style={{ flex: 1, backgroundColor: colors.creamBackground }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={{ paddingTop: 60, paddingBottom: 40 }}>
					{/* Development Banner */}
					{inDevelopment && (
						<>
							<DevelopmentBanner />
							<View style={{ height: 20 }} />
						</>
					)}

					{/* Tool Title */}
					<Text
						style={{
							fontSize: 32,
							fontWeight: "bold",
							color: colors.darkBrown,
							textAlign: "center",
							paddingHorizontal: 20,
						}}
					>
						{toolName}
					</Text>

					{/* Summary (when in development) */}
					{inDevelopment && (
						<View style={{ marginTop: 20, paddingHorizontal: 20 }}>
							<ScrollView
								style={{
									backgroundColor: "rgba(255, 255, 255, 0.6)",
									borderRadius: 12,
									maxHeight: 500,
								}}
								contentContainerStyle={{ padding: 20 }}
							>
								<Text
									style={{
										fontSize: 16,
										color: colors.darkBrown,
										lineHeight: 24,
									}}
								>
									{summary.split("**").map((part, index) => (
										<Text
											key={index}
											style={{
												fontWeight: index % 2 === 1 ? "bold" : "normal",
											}}
										>
											{part}
										</Text>
									))}
								</Text>
							</ScrollView>
						</View>
					)}
				</View>
			</ScrollView>

			{/* Home Button (and Info Button if not in development) */}
			<View
				style={{
					position: "absolute",
					top: 20,
					left: 20,
					flexDirection: "row",
					gap: 12,
				}}
			>
				{/* Home Button */}
				<Pressable
					onPress={() => router.back()}
					style={{
						width: 44,
						height: 44,
						borderRadius: 22,
						backgroundColor: "rgba(255, 255, 255, 0.9)",
						justifyContent: "center",
						alignItems: "center",
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.3,
						shadowRadius: 4,
						elevation: 4,
					}}
				>
					<Text style={{ fontSize: 24 }}>🏠</Text>
				</Pressable>

				{/* Info Button (only when NOT in development) */}
				{!inDevelopment && (
					<Pressable
						onPress={() => setShowSummary(true)}
						style={{
							width: 44,
							height: 44,
							borderRadius: 22,
							backgroundColor: "rgba(255, 255, 255, 0.9)",
							justifyContent: "center",
							alignItems: "center",
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.3,
							shadowRadius: 4,
							elevation: 4,
						}}
					>
						<Text style={{ fontSize: 24, fontWeight: "bold" }}>ℹ️</Text>
					</Pressable>
				)}
			</View>

			{/* Summary Modal */}
			<ToolSummaryModal
				visible={showSummary}
				toolName={toolName}
				summary={summary}
				onClose={() => setShowSummary(false)}
			/>
		</View>
	)
}
