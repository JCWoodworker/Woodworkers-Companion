//
//  ToolSummaryView.swift
//  Woodworker's Companion
//
//  Created by James Corey on 10/16/25.
//

import SwiftUI

struct ToolSummaryView: View {
  let summary: String

  var body: some View {
    ScrollView {
      Text(parseMarkdown(summary))
        .font(.body)
        .foregroundColor(.darkBrown)
        .padding(20)
        .frame(maxWidth: .infinity, alignment: .leading)
    }
    .background(Color.white.opacity(0.6))
    .clipShape(RoundedRectangle(cornerRadius: 12))
    .padding(.horizontal, 20)
  }

  // Helper function to parse markdown-style formatting
  private func parseMarkdown(_ text: String) -> AttributedString {
    var attributedString = AttributedString(text)

    // Find and format bold text (**text**)
    let boldPattern = "\\*\\*([^*]+)\\*\\*"
    if let regex = try? NSRegularExpression(pattern: boldPattern, options: []) {
      let nsString = text as NSString
      let matches = regex.matches(
        in: text, options: [], range: NSRange(location: 0, length: nsString.length))

      // Process matches in reverse to maintain correct indices
      for match in matches.reversed() {
        if let range = Range(match.range, in: text) {
          let boldText = String(text[range]).replacingOccurrences(of: "**", with: "")

          if let attrRange = Range(match.range, in: attributedString) {
            attributedString.replaceSubrange(attrRange, with: AttributedString(boldText))
            if let boldRange = attributedString.range(of: boldText) {
              attributedString[boldRange].font = .body.bold()
            }
          }
        }
      }
    }

    return attributedString
  }
}

#Preview {
  ToolSummaryView(summary: ToolSummaries.boardFootCalculator)
}
