import { View, Text, Pressable } from "react-native"
import { BoardEntry } from "../../types"
import { colors } from "../../constants/theme"
import {
	calculateBoardFeet,
	calculateCost,
	getDisplayString,
} from "../../utils/boardFootCalculations"

interface BoardListItemProps {
	board: BoardEntry
	onDelete: () => void
	onEdit: () => void
}

export default function BoardListItem({
	board,
	onDelete,
	onEdit,
}: BoardListItemProps) {
	const boardFeet = calculateBoardFeet(board)
	const cost = calculateCost(board)
	const displayString = getDisplayString(board)

	return (
		<Pressable
			onPress={onEdit}
			style={{
				flexDirection: "row",
				padding: 12,
				backgroundColor: "white",
				borderRadius: 10,
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 1 },
				shadowOpacity: 0.1,
				shadowRadius: 2,
				elevation: 2,
				gap: 12,
			}}
		>
			<View style={{ flex: 1, gap: 4 }}>
				<Text
					style={{
						fontSize: 14,
						fontWeight: "500",
						color: colors.darkBrown,
					}}
				>
					{displayString}
				</Text>

				{board.pricingType === "perBoardFoot" && boardFeet > 0 && (
					<Text
						style={{
							fontSize: 12,
							color: colors.darkBrown,
							opacity: 0.7,
						}}
					>
						{boardFeet.toFixed(2)} bf
					</Text>
				)}

				{board.price !== null && (
					<Text
						style={{
							fontSize: 12,
							color: colors.darkBrown,
							opacity: 0.7,
						}}
					>
						{board.pricingType === "perBoardFoot" ? "Per Board Foot" : "Linear"}
						: ${board.price.toFixed(2)}
					</Text>
				)}

				{cost > 0 && (
					<Text
						style={{
							fontSize: 12,
							color: colors.forestGreen,
							fontWeight: "600",
						}}
					>
						Cost: ${cost.toFixed(2)}
					</Text>
				)}
			</View>

			<Pressable
				onPress={onDelete}
				style={{
					width: 36,
					height: 36,
					borderRadius: 18,
					backgroundColor: "white",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={{ fontSize: 18, color: "rgba(255, 0, 0, 0.7)" }}>🗑️</Text>
			</Pressable>
		</Pressable>
	)
}
