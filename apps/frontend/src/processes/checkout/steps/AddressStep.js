import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/shared/ui/Input';
export const AddressStep = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-medium text-gray-900 mb-6", children: "Shipping Information" }), _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [_jsx(Input, { label: "First Name", name: "firstName", value: formData.firstName, onChange: handleChange, required: true }), _jsx(Input, { label: "Last Name", name: "lastName", value: formData.lastName, onChange: handleChange, required: true }), _jsx(Input, { label: "Address", name: "address", value: formData.address, onChange: handleChange, required: true, className: "sm:col-span-2" }), _jsx(Input, { label: "City", name: "city", value: formData.city, onChange: handleChange, required: true }), _jsx(Input, { label: "State/Province", name: "state", value: formData.state, onChange: handleChange, required: true }), _jsx(Input, { label: "ZIP/Postal Code", name: "zipCode", value: formData.zipCode, onChange: handleChange, required: true }), _jsx(Input, { label: "Country", name: "country", value: formData.country, onChange: handleChange, required: true, className: "sm:col-span-2" })] })] }));
};
//# sourceMappingURL=AddressStep.js.map