//
//  InventoryManagementView.swift
//  Woodworker's Companion
//
//  Created by James Corey on 10/15/25.
//

import SwiftUI

struct InventoryManagementView: View {
  @Environment(\.dismiss) private var dismiss
  let inDevelopment: Bool

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
        Text("Inventory Management")
          .font(.largeTitle)
          .fontWeight(.bold)
          .foregroundColor(.darkBrown)
          .padding(.top, inDevelopment ? 0 : 60)

        Spacer()
      }

      // Home button in top left
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
          .padding(.leading, 20)
          .padding(.top, 20)

          Spacer()
        }

        Spacer()
      }
    }
    .toolbar(.hidden, for: .navigationBar)
  }
}

#Preview {
  InventoryManagementView(inDevelopment: true)
}
