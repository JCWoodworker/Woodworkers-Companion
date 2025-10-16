//
//  ContentView.swift
//  Woodworker's Companion
//
//  Created by James Corey on 10/15/25.
//

import SwiftUI

// MARK: - Color Theme Extension
extension Color {
  static let woodPrimary = Color(hex: "8B6F47")  // Rich wood tone
  static let woodSecondary = Color(hex: "D4A574")  // Light wood
  static let forestGreen = Color(hex: "6B8E23")  // Olive drab
  static let creamBackground = Color(hex: "F5F5DC")  // Beige/cream
  static let darkBrown = Color(hex: "3E2723")  // Dark brown text

  // Helper to initialize Color from hex string
  init(hex: String) {
    let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
    var int: UInt64 = 0
    Scanner(string: hex).scanHexInt64(&int)
    let a: UInt64
    let r: UInt64
    let g: UInt64
    let b: UInt64
    switch hex.count {
    case 3:  // RGB (12-bit)
      (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
    case 6:  // RGB (24-bit)
      (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
    case 8:  // ARGB (32-bit)
      (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
    default:
      (a, r, g, b) = (1, 1, 1, 0)
    }

    self.init(
      .sRGB,
      red: Double(r) / 255,
      green: Double(g) / 255,
      blue: Double(b) / 255,
      opacity: Double(a) / 255
    )
  }
}

// MARK: - Tool Tile Component
struct ToolTile: View {
  let tool: Tool
  @State private var isPressed = false

  var body: some View {
    NavigationLink(destination: destinationView(for: tool.id)) {
      ZStack {
        // Tile background with gradient
        RoundedRectangle(cornerRadius: 12)
          .fill(
            LinearGradient(
              gradient: Gradient(colors: [
                Color.woodSecondary.opacity(isPressed ? 0.7 : 1.0),
                Color.woodPrimary.opacity(isPressed ? 0.8 : 1.0),
              ]),
              startPoint: .topLeading,
              endPoint: .bottomTrailing
            )
          )
          .shadow(
            color: isPressed ? Color.black.opacity(0.1) : Color.black.opacity(0.3),
            radius: isPressed ? 2 : 6,
            x: 0,
            y: isPressed ? 1 : 4
          )

        // Inner shadow effect when pressed
        if isPressed {
          RoundedRectangle(cornerRadius: 12)
            .stroke(Color.black.opacity(0.2), lineWidth: 1)
            .blur(radius: 2)
            .offset(x: 0, y: 1)
        }

        // Tile label - fixed size for consistency
        GeometryReader { geo in
          Text(tool.name)
            .font(.system(size: geo.size.width * 0.16))  // 16% of tile width
            .fontWeight(.bold)
            .foregroundColor(.white)
            .shadow(color: Color.black.opacity(0.3), radius: 2, x: 0, y: 1)
            .multilineTextAlignment(.center)
            .lineLimit(3)
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
        }
      }
      .aspectRatio(1.0, contentMode: .fit)
      .scaleEffect(isPressed ? 0.97 : 1.0)
      .animation(.spring(response: 0.3, dampingFraction: 0.6), value: isPressed)
    }
    .simultaneousGesture(
      DragGesture(minimumDistance: 0)
        .onChanged { _ in
          if !isPressed {
            isPressed = true
          }
        }
        .onEnded { _ in
          isPressed = false
        }
    )
  }

  @ViewBuilder
  private func destinationView(for toolId: Int) -> some View {
    switch toolId {
    case 1: BoardFootCalculatorView()
    case 2: Tool2View()
    case 3: Tool3View()
    case 4: Tool4View()
    case 5: Tool5View()
    case 6: Tool6View()
    case 7: Tool7View()
    case 8: Tool8View()
    case 9: Tool9View()
    default: Text("Tool not found")
    }
  }
}

// MARK: - Main Content View
struct ContentView: View {
  // Get all tools dynamically - add/remove from Tool.allTools to grow/shrink grid
  let tools = Tool.allTools

  // Detect device type
  @Environment(\.horizontalSizeClass) var horizontalSizeClass

  // Dynamic columns based on device type
  var columns: [GridItem] {
    // Use 2 columns for iPhone (compact), 3 for iPad (regular)
    let columnCount = horizontalSizeClass == .compact ? 2 : 3
    return Array(repeating: GridItem(.flexible(), spacing: 16), count: columnCount)
  }

  // Calculate column count for tile size
  var columnCount: Int {
    horizontalSizeClass == .compact ? 2 : 3
  }

  var body: some View {
    NavigationStack {
      GeometryReader { geometry in
        let maxWidth: CGFloat = min(geometry.size.width, 700)
        let horizontalPadding: CGFloat = 24
        let availableWidth = maxWidth - (horizontalPadding * 2)
        let spacing: CGFloat = 16
        let tileSize =
          (availableWidth - (spacing * CGFloat(columnCount - 1))) / CGFloat(columnCount)

        ScrollView {
          VStack(spacing: 30) {
            // Logo - same size as tiles
            Image("Logo")
              .resizable()
              .aspectRatio(contentMode: .fit)
              .frame(width: tileSize, height: tileSize)
              .clipShape(RoundedRectangle(cornerRadius: 20))
              .shadow(color: Color.black.opacity(0.2), radius: 8, x: 0, y: 4)
              .padding(.top, 40)

            // Caption
            Text("A collection of tools for woodworkers")
              .font(.title3)
              .fontWeight(.medium)
              .foregroundColor(.darkBrown)
              .multilineTextAlignment(.center)
              .kerning(1.0)
              .padding(.horizontal, 20)

            // Tool Grid - centered with padding, dynamically sized
            LazyVGrid(columns: columns, spacing: 16) {
              ForEach(tools) { tool in
                ToolTile(tool: tool)
              }
            }
            .padding(.horizontal, 24)
            .padding(.bottom, 40)
            .frame(maxWidth: 700)  // Reasonable max width for larger devices
          }
          .frame(maxWidth: .infinity)  // Center the content
        }
        .background(Color.creamBackground.ignoresSafeArea())
      }
      .toolbar(.hidden, for: .navigationBar)
    }
  }
}

// MARK: - Preview
#Preview {
  ContentView()
}
