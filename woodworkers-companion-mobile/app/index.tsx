import { ScrollView, View, Image, useWindowDimensions } from "react-native"
import { TOOLS } from "../src/constants/tools"
import ToolTile from "../src/components/ToolTile"
import { colors } from "../src/constants/theme"

export default function HomeScreen() {
	const { width } = useWindowDimensions()

	// Determine number of columns based on screen width
	// Phone (< 768px): 2 columns
	// Tablet (>= 768px): 3 columns
	const columnCount = width >= 768 ? 3 : 2

	// Calculate layout dimensions
	const maxWidth = Math.min(width, 700)
	const horizontalPadding = 24
	const availableWidth = maxWidth - horizontalPadding * 2
	const spacing = 16
	const tileSize = (availableWidth - spacing * (columnCount - 1)) / columnCount

	return (
		<View style={{ flex: 1, backgroundColor: colors.creamBackground }}>
			<ScrollView
				contentContainerStyle={{
					alignItems: "center",
					paddingBottom: 40,
				}}
			>
				{/* Banner Logo */}
				<Image
					source={require("../assets/images/WWC-Banner.png")}
					style={{
						width: maxWidth - 40,
						height: ((maxWidth - 40) * 400) / 1024, // Maintain aspect ratio
						marginTop: 40,
						marginHorizontal: 20,
						borderRadius: 12,
					}}
					resizeMode="contain"
				/>

				{/* Tool Grid */}
				<View
					style={{
						marginTop: 30,
						maxWidth: 700,
						width: "100%",
						paddingHorizontal: horizontalPadding,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							flexWrap: "wrap",
							gap: spacing,
						}}
					>
						{TOOLS.map((tool) => (
							<View key={tool.id} style={{ width: tileSize }}>
								<ToolTile tool={tool} columnCount={columnCount} />
							</View>
						))}
					</View>
				</View>
			</ScrollView>
		</View>
	)
}
