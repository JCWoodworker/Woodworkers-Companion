import { View, Text, TextInput } from "react-native"
import { colors } from "../../constants/theme"

interface DimensionInputProps {
	label: string
	value: string
	onChangeText: (text: string) => void
	placeholder?: string
}

export default function DimensionInput({
	label,
	value,
	onChangeText,
	placeholder = "0",
}: DimensionInputProps) {
	return (
		<View style={{ gap: 6 }}>
			<Text
				style={{
					fontSize: 14,
					color: colors.darkBrown,
					opacity: 0.8,
				}}
			>
				{label}
			</Text>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
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
