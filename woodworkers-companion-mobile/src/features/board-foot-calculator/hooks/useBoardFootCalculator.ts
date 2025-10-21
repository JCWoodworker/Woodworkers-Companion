import { useState, useEffect, useCallback } from "react"
import {
	BoardEntry,
	MeasurementUnit,
	LengthUnit,
	PricingType,
} from "../../../types"
import {
	calculateBoardFeet,
	calculateCost,
	getDisplayString,
	generateExportText,
} from "../../../utils/boardFootCalculations"
import {
	saveWorkInProgress,
	loadWorkInProgress,
	clearWorkInProgress,
} from "../storage"

export default function useBoardFootCalculator() {
	// Unit selection
	const [selectedUnit, setSelectedUnit] = useState<MeasurementUnit>("imperial")
	const [lengthUnit, setLengthUnit] = useState<LengthUnit>("feet")

	// Input fields
	const [thickness, setThickness] = useState("")
	const [width, setWidth] = useState("")
	const [length, setLength] = useState("")
	const [quantity, setQuantity] = useState("1")
	const [woodSpecies, setWoodSpecies] = useState("")

	// Pricing
	const [pricingType, setPricingType] = useState<PricingType>("perBoardFoot")
	const [price, setPrice] = useState("")

	// Board list
	const [boards, setBoards] = useState<BoardEntry[]>([])

	// Computed values
	const totalBoardFeet = boards.reduce(
		(sum, board) => sum + calculateBoardFeet(board),
		0
	)
	const totalCost = boards.reduce((sum, board) => sum + calculateCost(board), 0)

	// Can add board validation
	const canAddBoard = (): boolean => {
		// For linear pricing, only need length
		if (pricingType === "linear") {
			const l = parseFloat(length)
			const q = parseInt(quantity, 10)
			return l > 0 && q > 0
		}

		// For board foot pricing, need all dimensions
		const t = parseFloat(thickness)
		const w = parseFloat(width)
		const l = parseFloat(length)
		const q = parseInt(quantity, 10)
		return t > 0 && w > 0 && l > 0 && q > 0
	}

	// Add board
	const addBoard = useCallback(() => {
		const l = parseFloat(length)
		const q = parseInt(quantity, 10)

		if (isNaN(l) || isNaN(q)) return

		const priceValue = price ? parseFloat(price) : null
		const speciesValue = woodSpecies.trim() || null

		// For linear pricing
		if (pricingType === "linear") {
			const board: BoardEntry = {
				id: Date.now().toString() + Math.random().toString(36),
				thickness: null,
				width: null,
				length: l,
				quantity: q,
				unit: selectedUnit,
				lengthUnit: selectedUnit === "imperial" ? lengthUnit : null,
				price: priceValue,
				pricingType,
				woodSpecies: speciesValue,
			}
			setBoards((prev) => [...prev, board])
			// Clear dimension fields
			setThickness("")
			setWidth("")
			setLength("")
			setQuantity("1")
			return
		}

		// For board foot pricing
		const t = parseFloat(thickness)
		const w = parseFloat(width)

		if (isNaN(t) || isNaN(w)) return

		const board: BoardEntry = {
			id: Date.now().toString() + Math.random().toString(36),
			thickness: t,
			width: w,
			length: l,
			quantity: q,
			unit: selectedUnit,
			lengthUnit: selectedUnit === "imperial" ? lengthUnit : null,
			price: priceValue,
			pricingType,
			woodSpecies: speciesValue,
		}

		setBoards((prev) => [...prev, board])
		// Clear dimension fields (keep price and species)
		setThickness("")
		setWidth("")
		setLength("")
		setQuantity("1")
	}, [
		thickness,
		width,
		length,
		quantity,
		price,
		woodSpecies,
		selectedUnit,
		lengthUnit,
		pricingType,
	])

	// Remove board
	const removeBoard = useCallback((boardId: string) => {
		setBoards((prev) => prev.filter((b) => b.id !== boardId))
	}, [])

	// Update board
	const updateBoard = useCallback((updatedBoard: BoardEntry) => {
		setBoards((prev) =>
			prev.map((b) => (b.id === updatedBoard.id ? updatedBoard : b))
		)
	}, [])

	// Clear all
	const clearAll = useCallback(() => {
		setBoards([])
		setThickness("")
		setWidth("")
		setLength("")
		setQuantity("1")
		setPrice("")
		setWoodSpecies("")
	}, [])

	// Export data
	const exportData = useCallback(() => {
		return generateExportText(boards, selectedUnit)
	}, [boards, selectedUnit])

	// Load work in progress on mount
	useEffect(() => {
		loadWorkInProgress().then((savedBoards) => {
			if (savedBoards) {
				setBoards(savedBoards)
			}
		})
	}, [])

	// Auto-save work in progress when boards change
	useEffect(() => {
		saveWorkInProgress(boards)
	}, [boards])

	// Helper to get board with calculated values
	const getBoardWithCalculations = useCallback(
		(board: BoardEntry) => ({
			...board,
			boardFeet: calculateBoardFeet(board),
			cost: calculateCost(board),
			displayString: getDisplayString(board),
		}),
		[]
	)

	return {
		// State
		selectedUnit,
		setSelectedUnit,
		lengthUnit,
		setLengthUnit,
		thickness,
		setThickness,
		width,
		setWidth,
		length,
		setLength,
		quantity,
		setQuantity,
		woodSpecies,
		setWoodSpecies,
		pricingType,
		setPricingType,
		price,
		setPrice,
		boards,
		setBoards,
		// Computed
		totalBoardFeet,
		totalCost,
		canAddBoard: canAddBoard(),
		// Actions
		addBoard,
		removeBoard,
		updateBoard,
		clearAll,
		exportData,
		getBoardWithCalculations,
		// Utilities
		calculateBoardFeet,
		calculateCost,
		getDisplayString,
		clearWorkInProgress,
	}
}
