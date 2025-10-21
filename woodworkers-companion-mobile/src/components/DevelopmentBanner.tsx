import { View, Text } from "react-native"
import { colors } from "../constants/theme"

export default function DevelopmentBanner() {
	return (
		<View
			style={{
				backgroundColor: colors.forestGreen,
				paddingVertical: 8,
				paddingHorizontal: 16,
				borderRadius: 8,
				marginHorizontal: 20,
			}}
		>
			<Text
				style={{
					color: "white",
					fontSize: 14,
					fontWeight: "600",
					textAlign: "center",
				}}
			>
				🚧 IN DEVELOPMENT
			</Text>
		</View>
	)
}
