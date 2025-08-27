import { Order } from '@/types'

interface OrderCardProps {
  order: Order
}

export default function OrderCard({ order }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'placed':
        return 'bg-blue-100 text-blue-800'
      case 'confirmed':
        return 'bg-yellow-100 text-yellow-800'
      case 'preparing':
        return 'bg-orange-100 text-orange-800'
      case 'ready':
        return 'bg-purple-100 text-purple-800'
      case 'out-for-delivery':
        return 'bg-indigo-100 text-indigo-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {order.metadata.order_number}
          </h3>
          <p className="text-sm text-gray-600">
            {formatDate(order.metadata.order_date)}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.metadata.status.key)}`}>
          {order.metadata.status.value}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-2">
          {order.metadata.restaurant.thumbnail && (
            <img
              src={`${order.metadata.restaurant.thumbnail}?w=60&h=60&fit=crop&auto=format,compress`}
              alt={order.metadata.restaurant.metadata.name}
              className="w-12 h-12 rounded-lg object-cover"
              width="48"
              height="48"
            />
          )}
          <div>
            <h4 className="font-medium text-gray-900">
              {order.metadata.restaurant.metadata.name}
            </h4>
            <p className="text-sm text-gray-600">
              {order.metadata.restaurant.metadata.address}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="font-medium text-gray-900 mb-2">Items ordered:</h5>
        <div className="space-y-1">
          {order.metadata.order_items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.quantity}x {item.item_name}
              </span>
              <span className="text-gray-900">
                ${item.subtotal.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <p>Customer: {order.metadata.customer_name}</p>
            <p>Phone: {order.metadata.customer_phone}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              ${order.metadata.total_amount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">
              Total (incl. tax & delivery)
            </p>
          </div>
        </div>
        
        {order.metadata.special_instructions && (
          <div className="mt-3 p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-700">
              <strong>Special instructions:</strong> {order.metadata.special_instructions}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}