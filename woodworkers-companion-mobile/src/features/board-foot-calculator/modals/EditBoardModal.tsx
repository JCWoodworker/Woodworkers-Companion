import { useState } from "react"
import {
	Modal,
	View,
	Text,
	ScrollView,
	Pressable,
	SafeAreaView,
} from "react-native"
import { BoardEntry, PricingType, LengthUnit } from "../../../types"
import { colors } from "../../../constants/theme"
import DimensionInput from "../../../components/shared/DimensionInput"
import ThicknessQuartersInput from "../../../components/shared/ThicknessQuartersInput"
import LengthInputWithToggle from "../../../components/shared/LengthInputWithToggle"
import WoodSpeciesPicker from "../../../components/shared/WoodSpeciesPicker"

interface EditBoardModalProps {
	visible: boolean
	board: BoardEntry | null
	onSave: (board: BoardEntry) => void
	onCancel: () => void
}

export default function EditBoardModal({
	visible,
	board,
	onSave,
	onCancel,
}: EditBoardModalProps) {
	const [thickness, setThickness] = useState(board?.thickness?.toString() || "")
	const [width, setWidth] = useState(board?.width?.toString() || "")
	const [length, setLength] = useState(board?.length.toString() || "")
	const [quantity, setQuantity] = useState(board?.quantity.toString() || "1")
	const [price, setPrice] = useState(board?.price?.toString() || "")
	const [pricingType, setPricingType] = useState<PricingType>(
		board?.pricingType || "perBoardFoot"
	)
	const [lengthUnit, setLengthUnit] = useState<LengthUnit>(
		board?.lengthUnit || "feet"
	)
	const [woodSpecies, setWoodSpecies] = useState(board?.woodSpecies || "")

	// Reset state when board changes
	if (board && visible) {
		const currentId = board.id
		// This is a simple way to detect if it's a new board
		if (
			length &&
			board.length.toString() !== length &&
			board.id !== currentId
		) {
			setThickness(board.thickness?.toString() || "")
			setWidth(board.width?.toString() || "")
			setLength(board.length.toString())
			setQuantity(board.quantity.toString())
			setPrice(board.price?.toString() || "")
			setPricingType(board.pricingType)
			setLengthUnit(board.lengthUnit || "feet")
			setWoodSpecies(board.woodSpecies || "")
		}
	}

	const canSave = (): boolean => {
		if (pricingType === "linear") {
			const l = parseFloat(length)
			const q = parseInt(quantity, 10)
			return l > 0 && q > 0
		}

		const t = parseFloat(thickness)
		const w = parseFloat(width)
		const l = parseFloat(length)
		const q = parseInt(quantity, 10)
		return t > 0 && w > 0 && l > 0 && q > 0
	}

	const handleSave = () => {
		if (!board || !canSave()) return

		const l = parseFloat(length)
		const q = parseInt(quantity, 10)
		const priceValue = price ? parseFloat(price) : null
		const speciesValue = woodSpecies.trim() || null

		if (pricingType === "linear") {
			const updatedBoard: BoardEntry = {
				...board,
				thickness: null,
				width: null,
				length: l,
				quantity: q,
				lengthUnit: board.unit === "imperial" ? lengthUnit : null,
				price: priceValue,
				pricingType,
				woodSpecies: speciesValue,
			}
			onSave(updatedBoard)
		} else {
			const t = parseFloat(thickness)
			const w = parseFloat(width)

			if (isNaN(t) || isNaN(w)) return

			const updatedBoard: BoardEntry = {
				...board,
				thickness: t,
				width: w,
				length: l,
				quantity: q,
				lengthUnit: board.unit === "imperial" ? lengthUnit : null,
				price: priceValue,
				pricingType,
				woodSpecies: speciesValue,
			}
			onSave(updatedBoard)
		}
	}

	if (!board) return null

	const dimensionLabels =
		board.unit === "imperial"
			? {
					thickness: "Thickness",
					width: "Width (inches)",
					length: "Length",
			  }
			: {
					thickness: "Thickness (cm)",
					width: "Width (cm)",
					length: "Length (cm)",
			  }

	return (
		<Modal
			visible={visible}
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
					<Pressable onPress={onCancel}>
						<Text
							style={{
								fontSize: 16,
								color: colors.darkBrown,
							}}
						>
							Cancel
						</Text>
					</Pressable>

					<Text
						style={{
							fontSize: 18,
							fontWeight: "bold",
							color: colors.darkBrown,
						}}
					>
						Edit Board
					</Text>

					<Pressable onPress={handleSave} disabled={!canSave()}>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "600",
								color: canSave() ? colors.forestGreen : colors.darkBrown,
								opacity: canSave() ? 1 : 0.3,
							}}
						>
							Save
						</Text>
					</Pressable>
				</View>

				<ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
					<View style={{ gap: 20 }}>
						{/* Pricing Type Toggle */}
						<View style={{ gap: 8 }}>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "600",
									color: colors.darkBrown,
								}}
							>
								Pricing Type
							</Text>
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
										onPress={() => setPricingType(type)}
										style={{
											flex: 1,
											paddingVertical: 10,
											backgroundColor:
												pricingType === type
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
													pricingType === type ? "white" : colors.darkBrown,
											}}
										>
											{type === "perBoardFoot" ? "Per Board Foot" : "Linear"}
										</Text>
									</Pressable>
								))}
							</View>
						</View>

						{/* Dimensions Section */}
						<View
							style={{
								backgroundColor: "rgba(255, 255, 255, 0.6)",
								padding: 16,
								borderRadius: 12,
								gap: 12,
							}}
						>
							{/* Thickness and Width (only for board foot pricing) */}
							{pricingType === "perBoardFoot" && (
								<>
									{board.unit === "imperial" ? (
										<ThicknessQuartersInput
											label={dimensionLabels.thickness}
											value={thickness}
											onChangeText={setThickness}
										/>
									) : (
										<DimensionInput
											label={dimensionLabels.thickness}
											value={thickness}
											onChangeText={setThickness}
										/>
									)}

									<DimensionInput
										label={dimensionLabels.width}
										value={width}
										onChangeText={setWidth}
									/>
								</>
							)}

							{/* Length */}
							{board.unit === "imperial" ? (
								<LengthInputWithToggle
									label={dimensionLabels.length}
									value={length}
									onChangeText={setLength}
									lengthUnit={lengthUnit}
									onLengthUnitChange={setLengthUnit}
								/>
							) : (
								<DimensionInput
									label={dimensionLabels.length}
									value={length}
									onChangeText={setLength}
								/>
							)}

							{/* Quantity */}
							<DimensionInput
								label="Quantity"
								value={quantity}
								onChangeText={setQuantity}
							/>

							{/* Wood Species */}
							<WoodSpeciesPicker
								value={woodSpecies}
								onChangeText={setWoodSpecies}
							/>

							{/* Price */}
							<DimensionInput
								label="Price ($)"
								value={price}
								onChangeText={setPrice}
								placeholder="0.00"
							/>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</Modal>
	)
}
