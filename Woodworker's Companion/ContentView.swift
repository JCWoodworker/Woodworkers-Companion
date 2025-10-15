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
  let number: Int
  @State private var isPressed = false

  var body: some View {
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

      // Tile label
      Text("Tool \(number)")
        .font(.title2)
        .fontWeight(.bold)
        .foregroundColor(.white)
        .shadow(color: Color.black.opacity(0.3), radius: 2, x: 0, y: 1)
    }
    .aspectRatio(1.0, contentMode: .fit)
    .scaleEffect(isPressed ? 0.97 : 1.0)
    .animation(.spring(response: 0.3, dampingFraction: 0.6), value: isPressed)
    .gesture(
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
}

// MARK: - Main Content View
struct ContentView: View {
  // Adaptive grid columns
  let columns = [
    GridItem(.adaptive(minimum: 150, maximum: 200), spacing: 16)
  ]

  var body: some View {
    ScrollView {
      VStack(spacing: 30) {
        // Logo
        Image("AppIcon")
          .resizable()
          .aspectRatio(contentMode: .fit)
          .frame(width: 100, height: 100)
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

        // Tool Grid
        LazyVGrid(columns: columns, spacing: 16) {
          ForEach(1...9, id: \.self) { number in
            ToolTile(number: number)
          }
        }
        .padding(.horizontal, 20)
        .padding(.bottom, 40)
      }
    }
    .background(Color.creamBackground.ignoresSafeArea())
  }
}

// MARK: - Preview
#Preview {
  ContentView()
}
