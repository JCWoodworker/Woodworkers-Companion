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
  let inDevelopment: Bool

  // Add or remove tools from this array to grow/shrink the grid
  static let allTools: [Tool] = [
    Tool(id: 1, name: "Board Foot Calculator", inDevelopment: false),
    Tool(id: 2, name: "Cut List Optimizer", inDevelopment: true),
    Tool(id: 3, name: "Project Pricing Engine", inDevelopment: true),
    Tool(id: 4, name: "Finish Mixing Calculator", inDevelopment: true),
    Tool(id: 5, name: "Project Management", inDevelopment: true),
    Tool(id: 6, name: "Quoting & Invoicing", inDevelopment: true),
    Tool(id: 7, name: "Inventory Management", inDevelopment: true),
    Tool(id: 8, name: "Digital Sketchpad", inDevelopment: true),
    Tool(id: 9, name: "Reference Libraries", inDevelopment: true),
  ]
}
