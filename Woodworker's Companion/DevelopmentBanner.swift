//
//  DevelopmentBanner.swift
//  Woodworker's Companion
//
//  Created by James Corey on 10/16/25.
//

import SwiftUI

struct DevelopmentBanner: View {
  var body: some View {
    HStack(spacing: 8) {
      Image(systemName: "hammer.fill")
        .font(.system(size: 14))
        .foregroundColor(.white)

      Text("In Development")
        .font(.system(size: 14, weight: .semibold))
        .foregroundColor(.white)
    }
    .padding(.horizontal, 16)
    .padding(.vertical, 8)
    .background(
      RoundedRectangle(cornerRadius: 8)
        .fill(Color.orange.opacity(0.85))
        .shadow(
          color: Color.black.opacity(0.2),
          radius: 4,
          x: 0,
          y: 2
        )
    )
  }
}

#Preview {
  ZStack {
    Color.creamBackground.ignoresSafeArea()
    DevelopmentBanner()
  }
}
