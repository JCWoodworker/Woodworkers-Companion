import ToolScreen from "../../src/components/ToolScreen"
import { getToolById } from "../../src/constants/tools"

export default function FinishMixingCalculatorScreen() {
	const tool = getToolById(4)!

	return (
		<ToolScreen
			toolName={tool.name}
			inDevelopment={tool.inDevelopment}
			summary={tool.summary}
		/>
	)
}
