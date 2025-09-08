import { useState } from 'react'
import { Input } from '@/shared/ui/Input'

export const PaymentStep = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Information</h2>
      
      <div className="space-y-4">
        <Input
          label="Card Number"
          name="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={formData.cardNumber}
          onChange={handleChange}
          required
        />
        <Input
          label="Name on Card"
          name="cardName"
          placeholder="John Doe"
          value={formData.cardName}
          onChange={handleChange}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiry Date"
            name="expiryDate"
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
          <Input
            label="CVV"
            name="cvv"
            placeholder="123"
            value={formData.cvv}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  )
}