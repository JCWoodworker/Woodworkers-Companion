//
//  Tool7View.swift
//  Woodworker's Companion
//
//  Created by James Corey on 10/15/25.
//

import SwiftUI

struct Tool7View: View {
  @Environment(\.dismiss) private var dismiss

  var body: some View {
    ZStack {
      Color.creamBackground.ignoresSafeArea()

      // Centered tool number
      Text("Tool 7")
        .font(.largeTitle)
        .fontWeight(.bold)
        .foregroundColor(.darkBrown)

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
    .navigationBarHidden(true)
  }
}

#Preview {
  Tool7View()
}
