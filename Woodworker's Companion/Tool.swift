//
//  Tool.swift
//  Woodworker's Companion
//
//  Created by James Corey on 10/15/25.
//

import Foundation

struct Tool: Identifiable {
  let id: Int
  let name: String

  // Add or remove tools from this array to grow/shrink the grid
  static let allTools: [Tool] = [
    Tool(id: 1, name: "Board Foot Calculator"),
    Tool(id: 2, name: "Tool 2"),
    Tool(id: 3, name: "Tool 3"),
    Tool(id: 4, name: "Tool 4"),
    Tool(id: 5, name: "Tool 5"),
    Tool(id: 6, name: "Tool 6"),
    Tool(id: 7, name: "Tool 7"),
    Tool(id: 8, name: "Tool 8"),
    Tool(id: 9, name: "Tool 9"),
  ]
}
