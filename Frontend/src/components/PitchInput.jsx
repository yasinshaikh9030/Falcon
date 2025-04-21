// src/components/PitchInput.jsx
import { useState } from 'react';
import './Pich_input.css';
import axios from 'axios';

function PitchInput() {
    const [formData, setFormData] = useState({
        startupName: '',
        type: '',
        briefInfo: '',
        fundingStatus: '',
        valuation: '',
        videoLink: '',
        infrastructureCost: '',
        location: '',
        mode: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://falcon-backend-ochre.vercel.app/api/pitches', formData);

            if (response.status === 201) {
                alert('Pitch submitted successfully!');
                setFormData({
                    startupName: '',
                    type: '',
                    briefInfo: '',
                    fundingStatus: '',
                    valuation: '',
                    videoLink: '',
                    infrastructureCost: '',
                    location: '',
                    mode: '',
                });
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error('Error submitting pitch:', error);
            alert('Submission failed!');
        }
    };

    return (
        <div className="form-container">
            <h2>Submit Your Startup Pitch</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="startupName" placeholder="Name of Startup" value={formData.startupName} onChange={handleChange} required />

                <label>Type:</label>
                <select name="type" value={formData.type} onChange={handleChange} required>
                    <option value="">-- Select Type --</option>
                    <option value="Product-based">Product-based</option>
                    <option value="Service-based">Service-based</option>
                </select>

                <textarea name="briefInfo" placeholder="Brief info about the startup" value={formData.briefInfo} onChange={handleChange} required />

                <input type="number" name="infrastructureCost" placeholder="Ask" value={formData.infrastructureCost} onChange={handleChange} required />

                <label>Status of Funding:</label>
                <select name="fundingStatus" value={formData.fundingStatus} onChange={handleChange} required>
                    <option value="">-- Select Funding Status --</option>
                    <option value="Seed Funding">Seed Funding</option>
                    <option value="Series A Funding">Series A Funding</option>
                    <option value="Series B Funding">Series B Funding</option>
                    <option value="Series C Funding">Series C Funding</option>
                    <option value="Beyond">Beyond</option>
                </select>

                {formData.fundingStatus && formData.fundingStatus !== 'Seed Funding' && (
                    <input type="number" name="valuation" placeholder="Startup Valuation" value={formData.valuation} onChange={handleChange} required />
                )}

                <input type="url" name="videoLink" placeholder="Video demo link" value={formData.videoLink} onChange={handleChange} />

                <input type="text" name="location" placeholder="Startup Location" value={formData.location} onChange={handleChange} required />

                <div className="mode-group">
                    <label>Mode:</label>
                    <label>
                        <input type="radio" name="mode" value="Online" checked={formData.mode === 'Online'} onChange={handleChange} /> Online
                    </label>
                    <label>
                        <input type="radio" name="mode" value="Offline" checked={formData.mode === 'Offline'} onChange={handleChange} /> Offline
                    </label>
                </div>

                <button type="submit">Submit Pitch</button>
            </form>
        </div>
    );
}

export default PitchInput;
