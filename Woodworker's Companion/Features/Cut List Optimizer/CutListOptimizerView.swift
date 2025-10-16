//
//  CutListOptimizer.swift
//  Woodworker's Companion
//
//  Created by James Corey on 10/15/25.
//

import SwiftUI

struct CutListOptimizer: View {
  @Environment(\.dismiss) private var dismiss
  let inDevelopment: Bool
  let summary: String
  @State private var showingSummary = false

  var body: some View {
    ZStack {
      Color.creamBackground.ignoresSafeArea()

      VStack(spacing: 20) {
        // Development banner (if applicable)
        if inDevelopment {
          DevelopmentBanner()
            .padding(.top, 60)
        }

        // Centered tool title
        Text("Cut List Optimizer")
          .font(.largeTitle)
          .fontWeight(.bold)
          .foregroundColor(.darkBrown)
          .padding(.top, inDevelopment ? 0 : 60)

        // Show summary when in development
        if inDevelopment {
          ToolSummaryView(summary: summary)
            .padding(.top, 10)
        }

        Spacer()
      }

      // Home button (and info button if not in development) in top left
      VStack {
        HStack {
          Button(action: {
            dismiss()
          }) {
            Image(systemName: "house.fill")
              .resizable()
              .aspectRatio(contentMode: .fit)
              .frame(width: 25, height: 25)
              .foregroundColor(.darkBrown)
          }

          if !inDevelopment {
            Button(action: {
              showingSummary = true
            }) {
              Image(systemName: "info.circle.fill")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 25, height: 25)
                .foregroundColor(.darkBrown)
            }
          }

          Spacer()
        }
        .padding(.leading, 20)
        .padding(.top, 20)

        Spacer()
      }
    }
    .toolbar(.hidden, for: .navigationBar)
    .overlay {
      if showingSummary {
        ToolSummaryModal(
          toolName: "Cut List Optimizer",
          summary: summary,
          isPresented: $showingSummary
        )
        .transition(.opacity)
        .zIndex(1000)
      }
    }
  }
}

#Preview {
  CutListOptimizer(inDevelopment: true, summary: ToolSummaries.cutListOptimizer)
}
