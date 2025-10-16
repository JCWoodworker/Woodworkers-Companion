//
//  ToolSummaryModal.swift
//  Woodworker's Companion
//
//  Created by James Corey on 10/16/25.
//

import SwiftUI

struct ToolSummaryModal: View {
  let toolName: String
  let summary: String
  @Binding var isPresented: Bool

  var body: some View {
    ZStack {
      // Semi-transparent background
      Color.black.opacity(0.4)
        .ignoresSafeArea()
        .onTapGesture {
          withAnimation {
            isPresented = false
          }
        }

      // Modal content
      VStack(spacing: 0) {
        // Header with title and close button
        HStack {
          Text(toolName)
            .font(.title2)
            .fontWeight(.bold)
            .foregroundColor(.darkBrown)

          Spacer()

          Button(action: {
            withAnimation {
              isPresented = false
            }
          }) {
            Image(systemName: "xmark.circle.fill")
              .font(.title2)
              .foregroundColor(.darkBrown)
          }
        }
        .padding()
        .background(Color.woodSecondary)

        // Scrollable summary content
        ScrollView {
          Text(parseMarkdown(summary))
            .font(.body)
            .foregroundColor(.darkBrown)
            .padding()
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .background(Color.creamBackground)
      }
      .frame(maxWidth: .infinity, maxHeight: .infinity)
      .frame(height: UIScreen.main.bounds.height * 0.9)  // 90% of screen height
      .background(Color.creamBackground)
      .clipShape(RoundedRectangle(cornerRadius: 20))
      .shadow(color: .black.opacity(0.4), radius: 20, x: 0, y: 10)
      .padding(.horizontal, 20)
      .padding(.vertical, 40)
    }
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
  @Previewable @State var isPresented = true

  ToolSummaryModal(
    toolName: "Board Foot Calculator",
    summary: ToolSummaries.boardFootCalculator,
    isPresented: $isPresented
  )
}
