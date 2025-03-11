export default function Modal({ showModal, setShowModal }) {
  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>
            <h3 className="text-lg font-semibold text-red-600">
              Erro no Login
            </h3>
            <p className="text-gray-700 mt-2">Usuário ou senha incorretos!</p>
            <button
              className="mt-4 w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              onClick={() => setShowModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
