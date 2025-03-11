export default function Input({ type, name, onChange, value }) {
  return (
    <div className="w-full">
      <label htmlFor={name}>{name}</label>
      <input
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
        id={name}
        name={name}
        className="bg-white p-2 rounded-md border-1 border-black w-full"
        type={type}
      />
    </div>
  );
}
