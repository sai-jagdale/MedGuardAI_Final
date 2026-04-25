export function HistoryViewer({ item, onClose }: any) {
  if (!item || item.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onClose} className="text-sm text-[#4A90E2]">
            ← Back
          </button>
        </div>

        {/* CHAT UI */}
        <div className="space-y-4">
          {item.map((msg: any, i: number) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs ${
                  msg.role === "user"
                    ? "bg-[#4A90E2] text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}