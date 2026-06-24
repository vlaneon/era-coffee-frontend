import { useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Regpage = () => {
    const navigate = useNavigate()
    const [error, setErrors] = useState('')
    const [formData, setFormData] = useState ({
        username: '',
        email: '',
        phone: '',
        password: '',
        full_name: '',
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch('123../register/', {
                method = 'POST',
                headers: {
                    'Content-Type':'application/json'
                },

                body: JSON.stringify({
                    full_name = formData.full_namename,
                    username = formData.username,
                    phone = formData.phone,
                    email = formData.email,
                    password = formData.password,
                })
            })
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error)
            }else{
                const data = await response.json()
                localStorage.setItem('token', data.token)
                navigate('/login')
            }
        }catch(error) {
            setErrors(error-message)
        }
    }
  return (
    <div>
        <div>
            <form action="form" onSubmit={handleSubmit}>
                <input type="text" name='full_name' 
                placeholder='full name' required 
                onChange={handleChange} 
                value={formData.full_name} />
            </form>
            <button type='submit' onClick={()=>navigate('/login')}>Зарегаться</button>
        </div>
    </div>
  )
}

export default Regpage