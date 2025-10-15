# Woodworker's Companion

A collection of tools for woodworkers, built with SwiftUI for iOS.

## Overview

This app provides a suite of woodworking tools in a clean, intuitive interface. Each tool functions as a mini-app within the main application, making it easy to develop and maintain features independently.

## Design

The app features an earthy color scheme inspired by woodworking:
- **Primary Brown** (`#8B6F47`): Rich wood tone
- **Secondary Brown** (`#D4A574`): Light wood
- **Forest Green** (`#6B8E23`): Olive drab accent
- **Cream Background** (`#F5F5DC`): Beige/cream
- **Dark Brown** (`#3E2723`): Text color

The UI includes 3D-styled tiles with press animations, giving a tactile feel to the interface.

## Architecture

### 1. Folder Structure

The app uses a feature-based organization for easy development and scalability:

```
Woodworker's Companion/
├── Features/
│   ├── BoardFootCalculator/
│   │   ├── BoardFootCalculatorView.swift
│   │   ├── BoardFootModels.swift
│   │   └── BoardFootViewModel.swift
│   ├── Tool2/
│   │   └── Tool2View.swift
│   ├── Tool3/
│   │   └── Tool3View.swift
│   ├── Tool4/
│   │   └── Tool4View.swift
│   ├── Tool5/
│   │   └── Tool5View.swift
│   ├── Tool6/
│   │   └── Tool6View.swift
│   ├── Tool7/
│   │   └── Tool7View.swift
│   ├── Tool8/
│   │   └── Tool8View.swift
│   └── Tool9/
│       └── Tool9View.swift
├── ContentView.swift
├── Tool.swift
└── Woodworker_s_CompanionApp.swift
```

Each tool has its own dedicated folder and view file, allowing for isolated development of features.

### 2. Tool Model (`Tool.swift`)

The `Tool` struct provides a centralized data structure to manage all tools in the app:

```swift
struct Tool: Identifiable {
  let id: Int
  let name: String
  
  static let allTools: [Tool] = [
    Tool(id: 1, name: "Tool 1"),
    Tool(id: 2, name: "Tool 2"),
    // ... etc
  ]
}
```

**Key Features:**
- Conforms to `Identifiable` for SwiftUI list/grid support
- Central `allTools` array manages which tools appear in the grid
- Easy to add or remove tools by modifying the array

### 3. Navigation System

The app uses SwiftUI's `NavigationStack` for seamless navigation:

- **Main Page**: Wrapped in `NavigationStack` in `ContentView`
- **Tile Links**: Each `ToolTile` is a `NavigationLink` that navigates to its tool page
- **Press Animation**: Maintained during navigation using `simultaneousGesture`
- **Navigation Bar**: Hidden on main page for clean appearance

### 4. Individual Tool Pages

Each tool has its own dedicated view with a consistent layout:

**Features:**
- **Home Button**: 25x25 house icon (`house.fill` SF Symbol) in top left corner
- **Tool Identifier**: Tool number centered horizontally and vertically
- **Background**: Consistent earthy cream background matching the main page
- **Navigation**: Uses `@Environment(\.dismiss)` for clean back navigation

**Example Structure:**
```swift
struct Tool1View: View {
  @Environment(\.dismiss) private var dismiss
  
  var body: some View {
    ZStack {
      Color.creamBackground.ignoresSafeArea()
      Text("Tool 1") // Centered
      // Home button in top left
    }
    .navigationBarHidden(true)
  }
}
```

### 5. Dynamic Grid

The main page grid automatically adjusts based on the tools array:

**Configuration:**
- **Maximum Columns**: 3 per row (fixed)
- **Dynamic Content**: Only displays tools present in `Tool.allTools`
- **Scrollable**: Automatically scrollable when tools exceed screen space
- **Responsive**: Tile size calculated based on available screen width
- **Centered**: Content centered with max width of 700pt on larger devices

## How to Add/Remove Tools

### Adding a New Tool

1. **Create the folder and view:**
   ```bash
   mkdir "Woodworker's Companion/Features/MyNewTool"
   ```

2. **Create the view file** (`MyNewToolView.swift`):
   ```swift
   struct MyNewToolView: View {
     @Environment(\.dismiss) private var dismiss
     
     var body: some View {
       ZStack {
         Color.creamBackground.ignoresSafeArea()
         Text("My New Tool")
           .font(.largeTitle)
           .fontWeight(.bold)
           .foregroundColor(.darkBrown)
         
         VStack {
           HStack {
             Button(action: { dismiss() }) {
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
   ```

3. **Add to Tool model** in `Tool.swift`:
   ```swift
   static let allTools: [Tool] = [
     // ... existing tools
     Tool(id: 10, name: "My New Tool"),
   ]
   ```

4. **Add navigation case** in `ContentView.swift` `ToolTile` component:
   ```swift
   private func destinationView(for toolId: Int) -> some View {
     switch toolId {
       // ... existing cases
       case 10: MyNewToolView()
       default: Text("Tool not found")
     }
   }
   ```

### Removing a Tool

1. **Remove from Tool model** in `Tool.swift`:
   - Delete the tool entry from `Tool.allTools` array

2. **Optional cleanup**:
   - Delete the tool's folder and view file
   - Remove the case from the switch statement in `ToolTile`

The grid will automatically adjust to show only the tools in the array.

## Development Workflow

Each tool is designed to function as an independent mini-app within the main application:

1. **Navigate to the tool's folder** (`Features/ToolX/`)
2. **Develop the tool's features** in its view file
3. **Add additional files** to the tool's folder as needed (models, helpers, etc.)
4. **Test independently** using SwiftUI previews

## Tools

### Board Foot Calculator

A comprehensive calculator for woodworkers to calculate board feet for lumber projects.

**Features:**
- **Dual Unit Support**: Toggle between Imperial (inches/feet) and Metric (cm) measurements
- **Quarters System**: Imperial thickness uses industry-standard quarters (4/4, 8/4, etc.)
- **Length Flexibility**: Toggle between feet and inches for Imperial length measurements
- **Flexible Pricing Options**:
  - **Per Board Foot**: Calculate based on volume (thickness × width × length)
  - **Linear**: Calculate based on length only (great for trim, molding, etc.)
- **Individual Board Pricing**: Each board can have its own price and pricing type
- **Price Persistence**: Price persists across board entries until changed
- **Multiple Board Management**: Add different boards with different prices to calculate total project cost
- **Running Totals**: Automatically calculates total board feet and total cost
- **Order History**: Save and manage multiple orders with full history
  - Auto-save on export
  - Manual save buttons (only appears when boards are added)
  - Work-in-progress persistence (survives app restarts)
  - Optional custom order names
  - Responsive layout:
    - **Table view** on larger iPads (order name, date, time, total cost)
    - **Card view** on iPhones and iPad mini (beautifully designed cards)
  - Swipe actions on each order:
    - Delete individual order
    - Edit (loads order back into calculator)
    - Share order details
  - Delete All button to clear entire history (with confirmation)
  - View, share, print, or delete saved orders
  - Form resets completely after saving an order
- **Export/Share**: Export calculations as formatted text for sharing or saving

**How to Use:**
1. Select your preferred unit system (Imperial or Metric)
2. Choose pricing type:
   - **Per Board Foot**: For dimensioned lumber (shows thickness and width inputs)
   - **Linear**: For linear materials like trim (hides thickness and width inputs)
3. Enter board dimensions:
   - Thickness (only for Per Board Foot pricing; quarters for Imperial, cm for Metric)
   - Width (only for Per Board Foot pricing; inches for Imperial, cm for Metric)
   - Length (feet or inches for Imperial using the toggle; cm for Metric)
   - Quantity
4. Enter price (optional - persists for subsequent boards until changed)
5. Tap "Add Board" to add to your list
6. View individual board costs and totals in the summary section
7. **Save your order**:
   - Tap "Save Order" button (appears above inputs and at top of board list)
   - Optionally name your order or skip to auto-generate
   - Order is automatically saved when you export
   - Work is automatically saved if you close the app
8. **View History**:
   - Tap "History" button in top right corner
   - View all saved orders (table on iPad, cards on iPhone)
   - **Tap** any order to view full details
   - **Swipe left** on any order for quick actions:
     - Delete this order
     - Edit (loads order back into calculator)
     - Share
   - Use "Delete All" button to clear entire history
   - Share, print, or delete orders from detail view
9. Export or share your calculations when done

**Files:**
- `BoardFootCalculatorView.swift` - Main UI
- `BoardFootModels.swift` - Data models and calculation logic
- `BoardFootViewModel.swift` - State management
- `SavedOrderModels.swift` - Order history models and persistence
- `SaveOrderView.swift` - Order naming popup
- `HistoryView.swift` - Order history (responsive table/card view)
- `OrderDetailView.swift` - Individual order detail with share/print

## Color Extensions

Custom colors are defined as `Color` extensions in `ContentView.swift`:

```swift
extension Color {
  static let woodPrimary = Color(hex: "8B6F47")
  static let woodSecondary = Color(hex: "D4A574")
  static let forestGreen = Color(hex: "6B8E23")
  static let creamBackground = Color(hex: "F5F5DC")
  static let darkBrown = Color(hex: "3E2723")
}
```

Use these colors throughout the app for consistency.

## Requirements

- iOS 16.0+
- Xcode 15.0+
- Swift 5.9+

## License

Copyright © 2025 RI Local Woodworks. All rights reserved.

