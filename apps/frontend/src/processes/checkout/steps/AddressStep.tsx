import { useState } from 'react'
import { Input } from '@/shared/ui/Input'

export const AddressStep = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping Information</h2>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="sm:col-span-2"
        />
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <Input
          label="State/Province"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />
        <Input
          label="ZIP/Postal Code"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />
        <Input
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          className="sm:col-span-2"
        />
      </div>
    </div>
  )
}