//
//  HistoryView.swift
//  Woodworker's Companion
//
//  Created by James Corey on 10/15/25.
//

import SwiftUI

struct HistoryView: View {
  @Environment(\.dismiss) private var dismiss
  @State private var savedOrders: [SavedOrder] = []
  @State private var selectedOrder: SavedOrder? = nil
  @State private var showingOrderDetail = false

  var body: some View {
    ZStack(alignment: .topLeading) {
      Color.creamBackground.ignoresSafeArea()

      VStack(spacing: 20) {
        // Title - always centered
        Text("Order History")
          .font(.title)
          .fontWeight(.bold)
          .foregroundColor(.darkBrown)
          .padding(.top, 60)
          .frame(maxWidth: .infinity, alignment: .center)

        if savedOrders.isEmpty {
          // Centered empty state
          Spacer()

          VStack(spacing: 12) {
            Image(systemName: "tray")
              .font(.system(size: 60))
              .foregroundColor(.darkBrown.opacity(0.3))

            Text("No saved orders yet")
              .font(.title3)
              .foregroundColor(.darkBrown.opacity(0.6))
          }
          .frame(maxWidth: .infinity)

          Spacer()
        } else {
          // Table Header
          HStack(spacing: 8) {
            Text("Order Name")
              .font(.caption)
              .fontWeight(.semibold)
              .foregroundColor(.darkBrown)
              .frame(maxWidth: .infinity, alignment: .leading)

            Text("Date")
              .font(.caption)
              .fontWeight(.semibold)
              .foregroundColor(.darkBrown)
              .frame(width: 80, alignment: .leading)

            Text("Time")
              .font(.caption)
              .fontWeight(.semibold)
              .foregroundColor(.darkBrown)
              .frame(width: 70, alignment: .leading)

            Text("Total")
              .font(.caption)
              .fontWeight(.semibold)
              .foregroundColor(.darkBrown)
              .frame(width: 70, alignment: .trailing)
          }
          .padding(.horizontal, 16)
          .padding(.vertical, 12)
          .background(Color.woodPrimary.opacity(0.2))
          .clipShape(RoundedRectangle(cornerRadius: 8))
          .padding(.horizontal, 20)

          // Orders List
          ScrollView {
            VStack(spacing: 8) {
              ForEach(savedOrders) { order in
                OrderRow(order: order)
                  .onTapGesture {
                    selectedOrder = order
                    showingOrderDetail = true
                  }
              }
            }
            .padding(.horizontal, 20)
            .padding(.bottom, 20)
          }
        }
      }

      // Back button in top left
      Button(action: {
        dismiss()
      }) {
        HStack(spacing: 6) {
          Image(systemName: "arrow.left")
            .font(.system(size: 16, weight: .semibold))
          Text("Back to Board Foot Calculator")
            .font(.subheadline)
            .fontWeight(.semibold)
        }
        .foregroundColor(.white)
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .background(Color.woodPrimary)
        .clipShape(RoundedRectangle(cornerRadius: 8))
        .shadow(color: .black.opacity(0.3), radius: 4, x: 0, y: 2)
      }
      .padding(.leading, 20)
      .padding(.top, 20)
      .zIndex(100)
    }
    .toolbar(.hidden, for: .navigationBar)
    .onAppear {
      loadOrders()
    }
    .sheet(isPresented: $showingOrderDetail) {
      if let order = selectedOrder {
        OrderDetailView(
          order: order,
          onDelete: {
            deleteOrder(order)
            showingOrderDetail = false
          })
      }
    }
  }

  private func loadOrders() {
    savedOrders = OrderPersistenceManager.shared.loadOrders()
  }

  private func deleteOrder(_ order: SavedOrder) {
    OrderPersistenceManager.shared.deleteOrder(order)
    loadOrders()
  }
}

// MARK: - Order Row
struct OrderRow: View {
  let order: SavedOrder

  var body: some View {
    HStack(spacing: 8) {
      Text(order.orderName)
        .font(.subheadline)
        .fontWeight(.medium)
        .foregroundColor(.darkBrown)
        .frame(maxWidth: .infinity, alignment: .leading)
        .lineLimit(1)

      Text(order.dateSaved.formatted(date: .numeric, time: .omitted))
        .font(.caption)
        .foregroundColor(.darkBrown.opacity(0.7))
        .frame(width: 80, alignment: .leading)

      Text(order.dateSaved.formatted(date: .omitted, time: .shortened))
        .font(.caption)
        .foregroundColor(.darkBrown.opacity(0.7))
        .frame(width: 70, alignment: .leading)

      Text("$\(String(format: "%.2f", order.totalCost))")
        .font(.subheadline)
        .fontWeight(.semibold)
        .foregroundColor(.forestGreen)
        .frame(width: 70, alignment: .trailing)
    }
    .padding(.horizontal, 16)
    .padding(.vertical, 12)
    .background(Color.white.opacity(0.7))
    .clipShape(RoundedRectangle(cornerRadius: 8))
    .shadow(color: .black.opacity(0.1), radius: 2, x: 0, y: 1)
  }
}

#Preview {
  HistoryView()
}
