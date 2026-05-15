function Input({ label, type = 'text', value, onChange, placeholder }) {
    return (
        <div className="input-wrapper">
            {label && <label className="input-label">{label}</label>}
            {type === 'textarea' ? (
                <textarea
                    className="input-field"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            ) : (
                <input
                    type={type}
                    className="input-field"
                    value={type === 'file' ? undefined : value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            )}
        </div>
    )
}
export default Input