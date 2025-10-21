import { View, Text, TextInput } from "react-native"
import { colors } from "../../constants/theme"

interface ThicknessQuartersInputProps {
	label: string
	value: string
	onChangeText: (text: string) => void
}

export default function ThicknessQuartersInput({
	label,
	value,
	onChangeText,
}: ThicknessQuartersInputProps) {
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
			<View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
				<TextInput
					value={value}
					onChangeText={onChangeText}
					placeholder="0"
					keyboardType="number-pad"
					style={{
						fontSize: 16,
						color: colors.darkBrown,
						padding: 12,
						backgroundColor: "white",
						borderRadius: 8,
						borderWidth: 1,
						borderColor: `${colors.woodPrimary}4D`,
						width: 80,
					}}
				/>
				<Text
					style={{
						fontSize: 16,
						fontWeight: "500",
						color: colors.darkBrown,
					}}
				>
					/4
				</Text>
			</View>
		</View>
	)
}
