import { useState } from "react"
import {
	View,
	Text,
	TextInput,
	Pressable,
	Modal,
	ScrollView,
	SafeAreaView,
} from "react-native"
import { colors } from "../../constants/theme"
import { COMMON_HARDWOODS } from "../../constants/woodSpecies"

interface WoodSpeciesPickerProps {
	value: string
	onChangeText: (text: string) => void
}

export default function WoodSpeciesPicker({
	value,
	onChangeText,
}: WoodSpeciesPickerProps) {
	const [showPicker, setShowPicker] = useState(false)

	const selectSpecies = (species: string) => {
		onChangeText(species)
		setShowPicker(false)
	}

	return (
		<>
			<View style={{ gap: 6 }}>
				<Text
					style={{
						fontSize: 14,
						color: colors.darkBrown,
						opacity: 0.8,
					}}
				>
					Wood Species (Optional)
				</Text>
				<View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
					<TextInput
						value={value}
						onChangeText={onChangeText}
						placeholder="Type or select"
						style={{
							flex: 1,
							fontSize: 16,
							color: colors.darkBrown,
							padding: 12,
							backgroundColor: "white",
							borderRadius: 8,
							borderWidth: 1,
							borderColor: `${colors.woodPrimary}4D`,
						}}
					/>
					<Pressable onPress={() => setShowPicker(true)}>
						<Text style={{ fontSize: 24, color: colors.woodPrimary }}>▼</Text>
					</Pressable>
				</View>
			</View>

			{/* Species Picker Modal */}
			<Modal
				visible={showPicker}
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
						<Text
							style={{
								fontSize: 18,
								fontWeight: "bold",
								color: colors.darkBrown,
							}}
						>
							Select Wood Species
						</Text>
						<Pressable onPress={() => setShowPicker(false)}>
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

					{/* Species List */}
					<ScrollView style={{ flex: 1 }}>
						{COMMON_HARDWOODS.map((species) => (
							<Pressable
								key={species}
								onPress={() => selectSpecies(species)}
								style={{
									padding: 16,
									backgroundColor: "white",
									borderBottomWidth: 1,
									borderBottomColor: "#f0f0f0",
								}}
							>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<Text
										style={{
											fontSize: 16,
											color: colors.darkBrown,
										}}
									>
										{species}
									</Text>
									{value === species && (
										<Text
											style={{
												fontSize: 18,
												color: colors.forestGreen,
												fontWeight: "600",
											}}
										>
											✓
										</Text>
									)}
								</View>
							</Pressable>
						))}
					</ScrollView>
				</SafeAreaView>
			</Modal>
		</>
	)
}
