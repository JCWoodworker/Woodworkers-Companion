import ToolScreen from "../../src/components/ToolScreen"
import { getToolById } from "../../src/constants/tools"

export default function InventoryManagementScreen() {
	const tool = getToolById(7)!

	return (
		<ToolScreen
			toolName={tool.name}
			inDevelopment={tool.inDevelopment}
			summary={tool.summary}
		/>
	)
}
