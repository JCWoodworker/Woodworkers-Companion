import ToolScreen from "../../src/components/ToolScreen"
import { getToolById } from "../../src/constants/tools"

export default function QuotingInvoicingScreen() {
	const tool = getToolById(6)!

	return (
		<ToolScreen
			toolName={tool.name}
			inDevelopment={tool.inDevelopment}
			summary={tool.summary}
		/>
	)
}
