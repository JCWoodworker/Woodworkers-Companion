import ToolScreen from "../../src/components/ToolScreen"
import { getToolById } from "../../src/constants/tools"

export default function DigitalSketchpadScreen() {
	const tool = getToolById(8)!

	return (
		<ToolScreen
			toolName={tool.name}
			inDevelopment={tool.inDevelopment}
			summary={tool.summary}
		/>
	)
}
