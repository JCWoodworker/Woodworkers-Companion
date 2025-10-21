import { BoardEntry, MeasurementUnit, PricingType } from "../types"

/**
 * Calculate board feet for a board entry
 */
export function calculateBoardFeet(board: BoardEntry): number {
	// Linear pricing doesn't use board feet
	if (board.pricingType === "linear") {
		return 0
	}

	if (board.thickness === null || board.width === null) {
		return 0
	}

	switch (board.unit) {
		case "imperial":
			// For Imperial, thickness is in quarters, so convert to inches first
			// Board Feet = (Thickness in inches × Width in inches × Length in feet) / 12 × Quantity
			const thicknessInInches = board.thickness / 4.0

			// Convert length to feet if it's in inches
			const lengthInFeet =
				board.lengthUnit === "inches" ? board.length / 12.0 : board.length

			return (
				((thicknessInInches * board.width * lengthInFeet) / 12.0) *
				board.quantity
			)

		case "metric":
			// Convert to board feet: 1 board foot = 2359.737 cm³
			// Thickness (cm) × Width (cm) × Length (cm) / 2359.737 × Quantity
			return (
				((board.thickness * board.width * board.length) / 2359.737) *
				board.quantity
			)
	}
}

/**
 * Calculate cost for a board entry
 */
export function calculateCost(board: BoardEntry): number {
	if (board.price === null) {
		return 0
	}

	switch (board.pricingType) {
		case "perBoardFoot":
			return calculateBoardFeet(board) * board.price

		case "linear":
			// For linear, just multiply length by price and quantity
			return board.length * board.price * board.quantity
	}
}

/**
 * Get formatted display string for a board entry
 */
export function getDisplayString(
	board: BoardEntry,
	includeSpecies: boolean = true
): string {
	const quantityStr = board.quantity > 1 ? `${board.quantity} × ` : ""
	const speciesStr =
		includeSpecies && board.woodSpecies ? ` - ${board.woodSpecies}` : ""

	if (board.pricingType === "linear") {
		// Linear only shows length
		switch (board.unit) {
			case "imperial":
				const lengthSymbol = board.lengthUnit === "inches" ? '"' : "'"
				return `${quantityStr}${board.length}${lengthSymbol}${speciesStr}`

			case "metric":
				return `${quantityStr}${board.length}cm${speciesStr}`
		}
	}

	if (board.thickness === null || board.width === null) {
		return ""
	}

	switch (board.unit) {
		case "imperial":
			// Show thickness in quarters format
			const thicknessInt = Math.floor(board.thickness)
			const lengthSymbol = board.lengthUnit === "inches" ? '"' : "'"
			return `${quantityStr}${thicknessInt}/4" × ${board.width}" × ${board.length}${lengthSymbol}${speciesStr}`

		case "metric":
			return `${quantityStr}${board.thickness}cm × ${board.width}cm × ${board.length}cm${speciesStr}`
	}
}

/**
 * Generate export text for all boards
 */
export function generateExportText(
	boards: BoardEntry[],
	unit: MeasurementUnit
): string {
	const now = new Date()
	let output = `Board Foot Calculator - ${now.toLocaleDateString()} ${now.toLocaleTimeString()}\n`
	output += `Unit: ${unit === "imperial" ? "Imperial" : "Metric"}\n`
	output += "-".repeat(50) + "\n\n"

	boards.forEach((board, index) => {
		output += `Board ${index + 1}:\n`

		if (board.woodSpecies) {
			output += `  Species: ${board.woodSpecies}\n`
		}

		output += `  Dimensions: ${getDisplayString(board, false)}\n`

		if (board.pricingType === "perBoardFoot") {
			const bf = calculateBoardFeet(board)
			output += `  Board Feet: ${bf.toFixed(2)} bf\n`
		}

		if (board.price !== null) {
			const pricingTypeLabel =
				board.pricingType === "perBoardFoot" ? "Per Board Foot" : "Linear"
			output += `  Pricing: ${pricingTypeLabel} @ $${board.price.toFixed(2)}\n`
			const cost = calculateCost(board)
			output += `  Cost: $${cost.toFixed(2)}\n`
		}
		output += "\n"
	})

	output += "-".repeat(50) + "\n"

	// Calculate totals
	const totalBoardFeet = boards.reduce(
		(sum, b) => sum + calculateBoardFeet(b),
		0
	)
	const totalCost = boards.reduce((sum, b) => sum + calculateCost(b), 0)

	// Break down board feet by species
	if (totalBoardFeet > 0) {
		const speciesBreakdown: {
			[species: string]: { boardFeet: number; cost: number }
		} = {}

		boards.forEach((board) => {
			if (
				board.pricingType === "perBoardFoot" &&
				calculateBoardFeet(board) > 0
			) {
				const species = board.woodSpecies || "Misc"
				const current = speciesBreakdown[species] || {
					boardFeet: 0,
					cost: 0,
				}
				speciesBreakdown[species] = {
					boardFeet: current.boardFeet + calculateBoardFeet(board),
					cost: current.cost + calculateCost(board),
				}
			}
		})

		if (Object.keys(speciesBreakdown).length > 0) {
			output += "BOARD FEET BY SPECIES:\n"
			Object.entries(speciesBreakdown)
				.sort(([a], [b]) => a.localeCompare(b))
				.forEach(([species, data]) => {
					output += `  ${species}: ${data.boardFeet.toFixed(
						2
					)} bf - $${data.cost.toFixed(2)}\n`
				})
			output += "\n"
		}
	}

	if (totalCost > 0) {
		output += `TOTAL COST: $${totalCost.toFixed(2)}\n`
	}

	return output
}
