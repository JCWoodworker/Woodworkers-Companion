import { useState } from "react"
import { ScrollView, View, Text, Pressable } from "react-native"
import { useRouter } from "expo-router"
import { BoardEntry } from "../../types"
import { colors } from "../../constants/theme"
import useBoardFootCalculator from "./hooks/useBoardFootCalculator"
import UnitToggle from "../../components/shared/UnitToggle"
import DimensionInput from "../../components/shared/DimensionInput"
import ThicknessQuartersInput from "../../components/shared/ThicknessQuartersInput"
import LengthInputWithToggle from "../../components/shared/LengthInputWithToggle"
import WoodSpeciesPicker from "../../components/shared/WoodSpeciesPicker"
import BoardListItem from "../../components/shared/BoardListItem"
import EditBoardModal from "./modals/EditBoardModal"
import SaveOrderModal from "./modals/SaveOrderModal"
import HistoryModal from "./modals/HistoryModal"
import ExportModal from "./modals/ExportModal"
import ToolSummaryModal from "../../components/ToolSummaryModal"
import { LinearGradient } from "expo-linear-gradient"
import { getToolById } from "../../constants/tools"
import { clearWorkInProgress } from "./storage"

export default function BoardFootCalculatorScreen() {
	const router = useRouter()
	const calculator = useBoardFootCalculator()
	const tool = getToolById(1)!

	// Modal states
	const [showEditBoard, setShowEditBoard] = useState(false)
	const [boardToEdit, setBoardToEdit] = useState<BoardEntry | null>(null)
	const [showSaveOrder, setShowSaveOrder] = useState(false)
	const [showHistory, setShowHistory] = useState(false)
	const [showExport, setShowExport] = useState(false)
	const [showSummary, setShowSummary] = useState(false)

	const handleEditBoard = (board: BoardEntry) => {
		setBoardToEdit(board)
		setShowEditBoard(true)
	}

	const handleSaveEdit = (updatedBoard: BoardEntry) => {
		calculator.updateBoard(updatedBoard)
		setShowEditBoard(false)
		setBoardToEdit(null)
	}

	const handleCancelEdit = () => {
		setShowEditBoard(false)
		setBoardToEdit(null)
	}

	const handleSaveOrder = async () => {
		calculator.clearAll()
		await clearWorkInProgress()
		setShowSaveOrder(false)
	}

	const handleLoadOrder = (order: any) => {
		calculator.setBoards(order.boards)
	}

	return (
		<View style={{ flex: 1, backgroundColor: colors.creamBackground }}>
			<ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
				<View style={{ paddingHorizontal: 20 }}>
					{/* Title */}
					<Text
						style={{
							fontSize: 24,
							fontWeight: "bold",
							color: colors.darkBrown,
							marginTop: 60,
							marginBottom: 24,
							textAlign: "center",
						}}
					>
						Board Foot Calculator
					</Text>

					{/* Unit Toggle */}
					<View style={{ marginBottom: 24 }}>
						<UnitToggle
							options={["imperial", "metric"] as const}
							selected={calculator.selectedUnit}
							onSelect={calculator.setSelectedUnit}
							labels={{ imperial: "Imperial", metric: "Metric" }}
						/>
					</View>

					{/* Input Section */}
					<View
						style={{
							backgroundColor: "rgba(255, 255, 255, 0.6)",
							padding: 16,
							borderRadius: 12,
							gap: 16,
						}}
					>
						<Text
							style={{
								fontSize: 18,
								fontWeight: "600",
								color: colors.darkBrown,
							}}
						>
							Dimensions
						</Text>

						{/* Pricing Type Toggle */}
						<View
							style={{
								flexDirection: "row",
								borderRadius: 8,
								borderWidth: 1,
								borderColor: colors.woodPrimary,
								overflow: "hidden",
							}}
						>
							{(["perBoardFoot", "linear"] as const).map((type) => (
								<Pressable
									key={type}
									onPress={() => calculator.setPricingType(type)}
									style={{
										flex: 1,
										paddingVertical: 10,
										backgroundColor:
											calculator.pricingType === type
												? colors.woodPrimary
												: "rgba(255, 255, 255, 0.5)",
									}}
								>
									<Text
										style={{
											textAlign: "center",
											fontSize: 12,
											fontWeight: "500",
											color:
												calculator.pricingType === type
													? "white"
													: colors.darkBrown,
										}}
									>
										{type === "perBoardFoot" ? "Per Board Foot" : "Linear"}
									</Text>
								</Pressable>
							))}
						</View>

						{/* Thickness and Width (only for board foot pricing) */}
						{calculator.pricingType === "perBoardFoot" && (
							<>
								{calculator.selectedUnit === "imperial" ? (
									<ThicknessQuartersInput
										label="Thickness"
										value={calculator.thickness}
										onChangeText={calculator.setThickness}
									/>
								) : (
									<DimensionInput
										label="Thickness (cm)"
										value={calculator.thickness}
										onChangeText={calculator.setThickness}
									/>
								)}

								<DimensionInput
									label={
										calculator.selectedUnit === "imperial"
											? "Width (inches)"
											: "Width (cm)"
									}
									value={calculator.width}
									onChangeText={calculator.setWidth}
								/>
							</>
						)}

						{/* Length */}
						{calculator.selectedUnit === "imperial" ? (
							<LengthInputWithToggle
								label="Length"
								value={calculator.length}
								onChangeText={calculator.setLength}
								lengthUnit={calculator.lengthUnit}
								onLengthUnitChange={calculator.setLengthUnit}
							/>
						) : (
							<DimensionInput
								label="Length (cm)"
								value={calculator.length}
								onChangeText={calculator.setLength}
							/>
						)}

						{/* Quantity */}
						<DimensionInput
							label="Quantity"
							value={calculator.quantity}
							onChangeText={calculator.setQuantity}
						/>

						{/* Wood Species */}
						<WoodSpeciesPicker
							value={calculator.woodSpecies}
							onChangeText={calculator.setWoodSpecies}
						/>

						{/* Price */}
						<DimensionInput
							label="Price ($)"
							value={calculator.price}
							onChangeText={calculator.setPrice}
							placeholder="0.00"
						/>

						{/* Add Board Button */}
						<Pressable
							onPress={calculator.addBoard}
							disabled={!calculator.canAddBoard}
							style={{
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								gap: 8,
								paddingVertical: 14,
								borderRadius: 10,
								backgroundColor: calculator.canAddBoard
									? colors.forestGreen
									: "rgba(0, 0, 0, 0.2)",
								shadowColor: "#000",
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.2,
								shadowRadius: 4,
								elevation: 4,
							}}
						>
							<Text style={{ fontSize: 18 }}>➕</Text>
							<Text
								style={{
									color: "white",
									fontSize: 16,
									fontWeight: "600",
								}}
							>
								Add Board
							</Text>
						</Pressable>
					</View>

					{/* Save Order Button (only shows when boards exist) */}
					{calculator.boards.length > 0 && (
						<Pressable
							onPress={() => setShowSaveOrder(true)}
							style={{
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								gap: 8,
								paddingVertical: 12,
								borderRadius: 10,
								backgroundColor: colors.woodPrimary,
								marginTop: 24,
								shadowColor: "#000",
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.2,
								shadowRadius: 4,
								elevation: 4,
							}}
						>
							<Text style={{ fontSize: 18 }}>💾</Text>
							<Text
								style={{
									color: "white",
									fontSize: 16,
									fontWeight: "600",
								}}
							>
								Save Order
							</Text>
						</Pressable>
					)}

					{/* Board List */}
					{calculator.boards.length > 0 && (
						<View style={{ marginTop: 24, gap: 12 }}>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "600",
									color: colors.darkBrown,
								}}
							>
								Added Boards
							</Text>

							<View
								style={{
									backgroundColor: "rgba(255, 255, 255, 0.6)",
									padding: 16,
									borderRadius: 12,
									gap: 8,
								}}
							>
								{calculator.boards.map((board) => (
									<BoardListItem
										key={board.id}
										board={board}
										onDelete={() => calculator.removeBoard(board.id)}
										onEdit={() => handleEditBoard(board)}
									/>
								))}
							</View>
						</View>
					)}

					{/* Summary Section */}
					{calculator.boards.length > 0 && (
						<LinearGradient
							colors={[`${colors.woodSecondary}4D`, `${colors.woodPrimary}33`]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={{
								marginTop: 24,
								padding: 16,
								borderRadius: 12,
								borderWidth: 2,
								borderColor: `${colors.woodPrimary}80`,
							}}
						>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "600",
									color: colors.darkBrown,
									marginBottom: 16,
								}}
							>
								Summary
							</Text>

							<View
								style={{
									backgroundColor: "white",
									padding: 16,
									borderRadius: 10,
									gap: 12,
								}}
							>
								{calculator.totalBoardFeet > 0 && (
									<View
										style={{
											flexDirection: "row",
											justifyContent: "space-between",
										}}
									>
										<Text
											style={{
												fontSize: 16,
												fontWeight: "500",
												color: colors.darkBrown,
											}}
										>
											Total Board Feet:
										</Text>
										<Text
											style={{
												fontSize: 20,
												fontWeight: "bold",
												color: colors.woodPrimary,
											}}
										>
											{calculator.totalBoardFeet.toFixed(2)} bf
										</Text>
									</View>
								)}

								{calculator.totalCost > 0 && (
									<>
										{calculator.totalBoardFeet > 0 && (
											<View
												style={{
													height: 1,
													backgroundColor: "#e0e0e0",
												}}
											/>
										)}
										<View
											style={{
												flexDirection: "row",
												justifyContent: "space-between",
											}}
										>
											<Text
												style={{
													fontSize: 16,
													fontWeight: "500",
													color: colors.darkBrown,
												}}
											>
												Total Cost:
											</Text>
											<Text
												style={{
													fontSize: 24,
													fontWeight: "bold",
													color: colors.forestGreen,
												}}
											>
												${calculator.totalCost.toFixed(2)}
											</Text>
										</View>
									</>
								)}
							</View>
						</LinearGradient>
					)}

					{/* Action Buttons */}
					{calculator.boards.length > 0 && (
						<View
							style={{
								flexDirection: "row",
								gap: 12,
								marginTop: 24,
							}}
						>
							<Pressable
								onPress={() => setShowExport(true)}
								style={{
									flex: 1,
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									gap: 8,
									paddingVertical: 14,
									borderRadius: 10,
									backgroundColor: colors.woodPrimary,
									shadowColor: "#000",
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: 0.2,
									shadowRadius: 4,
									elevation: 4,
								}}
							>
								<Text style={{ fontSize: 18 }}>📤</Text>
								<Text
									style={{
										color: "white",
										fontSize: 16,
										fontWeight: "600",
									}}
								>
									Export
								</Text>
							</Pressable>

							<Pressable
								onPress={calculator.clearAll}
								style={{
									flex: 1,
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									gap: 8,
									paddingVertical: 14,
									borderRadius: 10,
									backgroundColor: "rgba(255, 0, 0, 0.7)",
									shadowColor: "#000",
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: 0.2,
									shadowRadius: 4,
									elevation: 4,
								}}
							>
								<Text style={{ fontSize: 18 }}>🗑️</Text>
								<Text
									style={{
										color: "white",
										fontSize: 16,
										fontWeight: "600",
									}}
								>
									Clear All
								</Text>
							</Pressable>
						</View>
					)}
				</View>
			</ScrollView>

			{/* Home button */}
			<View
				style={{
					position: "absolute",
					top: 20,
					left: 20,
					flexDirection: "row",
					gap: 12,
				}}
			>
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

				{/* Info button (Board Foot Calculator is not in development) */}
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
			</View>

			{/* History button (top right) */}
			<View
				style={{
					position: "absolute",
					top: 20,
					right: 20,
				}}
			>
				<Pressable
					onPress={() => setShowHistory(true)}
					style={{
						paddingHorizontal: 16,
						paddingVertical: 8,
						borderRadius: 8,
						backgroundColor: colors.woodPrimary,
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.3,
						shadowRadius: 4,
						elevation: 4,
					}}
				>
					<Text
						style={{
							color: "white",
							fontSize: 14,
							fontWeight: "600",
						}}
					>
						History
					</Text>
				</Pressable>
			</View>

			{/* Modals */}
			<EditBoardModal
				visible={showEditBoard}
				board={boardToEdit}
				onSave={handleSaveEdit}
				onCancel={handleCancelEdit}
			/>

			<SaveOrderModal
				visible={showSaveOrder}
				boards={calculator.boards}
				onSave={handleSaveOrder}
				onCancel={() => setShowSaveOrder(false)}
			/>

			<HistoryModal
				visible={showHistory}
				onClose={() => setShowHistory(false)}
				onLoadOrder={handleLoadOrder}
			/>

			<ExportModal
				visible={showExport}
				exportText={calculator.exportData()}
				onClose={() => setShowExport(false)}
			/>

			<ToolSummaryModal
				visible={showSummary}
				toolName={tool.name}
				summary={tool.summary}
				onClose={() => setShowSummary(false)}
			/>
		</View>
	)
}
