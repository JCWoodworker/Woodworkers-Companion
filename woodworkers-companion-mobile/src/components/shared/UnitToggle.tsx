import { View, Text, Pressable } from "react-native"
import { colors } from "../../constants/theme"

interface UnitToggleProps<T extends string> {
	options: readonly T[]
	selected: T
	onSelect: (value: T) => void
	labels?: { [K in T]?: string }
}

export default function UnitToggle<T extends string>({
	options,
	selected,
	onSelect,
	labels,
}: UnitToggleProps<T>) {
	return (
		<View
			style={{
				flexDirection: "row",
				borderRadius: 10,
				borderWidth: 1,
				borderColor: colors.woodPrimary,
				overflow: "hidden",
				maxWidth: 300,
				alignSelf: "center",
			}}
		>
			{options.map((option, index) => (
				<Pressable
					key={option}
					onPress={() => onSelect(option)}
					style={{
						flex: 1,
						paddingVertical: 12,
						backgroundColor:
							selected === option
								? colors.woodPrimary
								: "rgba(255, 255, 255, 0.5)",
					}}
				>
					<Text
						style={{
							textAlign: "center",
							fontWeight: "500",
							fontSize: 14,
							color: selected === option ? "white" : colors.darkBrown,
						}}
					>
						{labels?.[option] || option}
					</Text>
				</Pressable>
			))}
		</View>
	)
}
