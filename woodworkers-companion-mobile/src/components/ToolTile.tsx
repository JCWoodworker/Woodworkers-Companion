import { useState, useRef } from "react"
import {
	View,
	Text,
	Pressable,
	useWindowDimensions,
	Animated,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Link } from "expo-router"
import { Tool } from "../types"
import { colors, shadows } from "../constants/theme"

interface ToolTileProps {
	tool: Tool
	columnCount: number
}

export default function ToolTile({ tool, columnCount }: ToolTileProps) {
	const [isPressed, setIsPressed] = useState(false)
	const { width } = useWindowDimensions()
	const scaleAnim = useRef(new Animated.Value(1)).current

	// Calculate responsive font size based on tile width
	const maxWidth = Math.min(width, 700)
	const horizontalPadding = 24
	const spacing = 16
	const tileSize =
		(maxWidth - horizontalPadding * 2 - spacing * (columnCount - 1)) /
		columnCount

	// Font size as percentage of tile width
	const fontSize = tileSize * (columnCount === 2 ? 0.128 : 0.11)

	const handlePressIn = () => {
		setIsPressed(true)
		Animated.spring(scaleAnim, {
			toValue: 0.97,
			useNativeDriver: true,
			damping: 10,
			stiffness: 100,
		}).start()
	}

	const handlePressOut = () => {
		setIsPressed(false)
		Animated.spring(scaleAnim, {
			toValue: 1,
			useNativeDriver: true,
			damping: 10,
			stiffness: 100,
		}).start()
	}

	const getToolRoute = (id: number): string => {
		const routes: { [key: number]: string } = {
			1: "/tools/board-foot-calculator",
			2: "/tools/cut-list-optimizer",
			3: "/tools/project-pricing-engine",
			4: "/tools/finish-mixing-calculator",
			5: "/tools/project-management",
			6: "/tools/quoting-invoicing",
			7: "/tools/inventory-management",
			8: "/tools/digital-sketchpad",
			9: "/tools/reference-libraries",
		}
		return routes[id] || "/"
	}

	return (
		<Link href={getToolRoute(tool.id)} asChild>
			<Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
				<Animated.View
					style={[{ aspectRatio: 1 }, { transform: [{ scale: scaleAnim }] }]}
				>
					<LinearGradient
						colors={[
							isPressed ? `${colors.woodSecondary}B3` : colors.woodSecondary,
							isPressed ? `${colors.woodPrimary}CC` : colors.woodPrimary,
						]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={{
							flex: 1,
							borderRadius: 12,
							justifyContent: "center",
							alignItems: "center",
							padding: 12,
							...(isPressed ? shadows.tilePressed : shadows.tile),
						}}
					>
						<Text
							style={{
								fontSize,
								fontWeight: "bold",
								color: "white",
								textAlign: "center",
								textShadowColor: "rgba(0, 0, 0, 0.3)",
								textShadowOffset: { width: 0, height: 1 },
								textShadowRadius: 2,
								lineHeight: fontSize * 1.3,
							}}
							numberOfLines={3}
						>
							{tool.name}
						</Text>
					</LinearGradient>
				</Animated.View>
			</Pressable>
		</Link>
	)
}
