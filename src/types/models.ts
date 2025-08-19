// Interfaces for the transportation management system

export interface Driver {
  id: string
  name: string
  license: string
  phone: string
  email: string
  status: 'available' | 'on-delivery' | 'off-duty' | 'suspended'
  currentVehicle?: string
  rating: number
  totalDeliveries: number
  onTimeDeliveries: number
}

export interface Vehicle {
  id: string
  licensePlate: string
  model: string
  brand: string
  year: number
  type: 'truck' | 'van' | 'trailer' | 'pickup'
  capacity: number
  fuelType: 'diesel' | 'gasoline' | 'electric' | 'hybrid'
  status: 'available' | 'in-use' | 'maintenance' | 'offline'
  mileage: number
  lastMaintenance: string
  nextMaintenance: string
  registrationExpiry: string
  insuranceExpiry: string
  currentDriverId?: string
  gpsEnabled: boolean
}

export interface Shipment {
  id: string
  trackingNumber: string
  origin: Address
  destination: Address
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled' | 'delayed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  createdAt: string
  scheduledPickup: string
  actualPickup?: string
  estimatedDelivery: string
  actualDelivery?: string
  weight: number
  volume: number
  value: number
  currency: string
  goods: CargoItem[]
  driverId?: string
  vehicleId?: string
  customer: Customer
  route: {
    distance: number
    estimatedTime: number
  }
  notes: string[]
  // Additional route details for complex routing
  routePoints?: RoutePoint[]
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

export interface CargoItem {
  id: string
  description: string
  quantity: number
  unit: string
  weight: number
  value: number
  category: string
  fragile: boolean
  hazardous: boolean
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  address: Address
  accountType: 'individual' | 'business'
}

export interface RoutePoint {
  id: string
  address: Address
  sequence: number
  type: 'pickup' | 'delivery' | 'waypoint'
  estimatedArrival: string
  actualArrival?: string
  status: 'pending' | 'completed' | 'skipped'
}

// Application state interfaces
export interface DashboardStats {
  totalShipments: number
  activeShipments: number
  deliveredShipments: number
  pendingShipments: number
  totalRevenue: number
  activeVehicles: number
  availableDrivers: number
  maintenanceVehicles: number
}

export interface FilterOptions {
  status?: string[]
  priority?: string[]
  dateRange?: {
    start: string
    end: string
  }
  searchTerm?: string
}

// API response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message: string
  total?: number
  page?: number
  pageSize?: number
}
