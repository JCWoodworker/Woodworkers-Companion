import { View, Text, TextInput, Pressable } from "react-native"
import { LengthUnit } from "../../types"
import { colors } from "../../constants/theme"

interface LengthInputWithToggleProps {
	label: string
	value: string
	onChangeText: (text: string) => void
	lengthUnit: LengthUnit
	onLengthUnitChange: (unit: LengthUnit) => void
}

export default function LengthInputWithToggle({
	label,
	value,
	onChangeText,
	lengthUnit,
	onLengthUnitChange,
}: LengthInputWithToggleProps) {
	const units: LengthUnit[] = ["feet", "inches"]

	return (
		<View style={{ gap: 6 }}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						fontSize: 14,
						color: colors.darkBrown,
						opacity: 0.8,
					}}
				>
					{label}
				</Text>

				{/* Length unit toggle */}
				<View
					style={{
						flexDirection: "row",
						borderRadius: 6,
						borderWidth: 1,
						borderColor: colors.woodPrimary,
						overflow: "hidden",
					}}
				>
					{units.map((unit) => (
						<Pressable
							key={unit}
							onPress={() => onLengthUnitChange(unit)}
							style={{
								paddingHorizontal: 12,
								paddingVertical: 6,
								backgroundColor:
									lengthUnit === unit
										? colors.woodPrimary
										: "rgba(255, 255, 255, 0.5)",
							}}
						>
							<Text
								style={{
									fontSize: 12,
									fontWeight: "500",
									color: lengthUnit === unit ? "white" : colors.darkBrown,
								}}
							>
								{unit === "feet" ? "ft" : "in"}
							</Text>
						</Pressable>
					))}
				</View>
			</View>

			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder="0"
				keyboardType="decimal-pad"
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
		</View>
	)
}
