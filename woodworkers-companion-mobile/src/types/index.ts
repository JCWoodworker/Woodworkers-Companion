export interface Tool {
	id: number
	name: string
	inDevelopment: boolean
	summary: string
}

export type MeasurementUnit = "imperial" | "metric"
export type LengthUnit = "feet" | "inches"
export type PricingType = "perBoardFoot" | "linear"

export interface BoardEntry {
	id: string
	thickness: number | null
	width: number | null
	length: number
	quantity: number
	unit: MeasurementUnit
	lengthUnit: LengthUnit | null
	price: number | null
	pricingType: PricingType
	woodSpecies: string | null
}

export interface SavedOrder {
	id: string
	orderName: string
	boards: BoardEntry[]
	createdAt: Date
}

export interface WoodSpecies {
	name: string
	category: "hardwood" | "softwood"
}
