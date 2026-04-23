export function HistoryViewer({ item, onClose }: any) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      
      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onClose} className="text-sm text-[#4A90E2]">
            ← Back
          </button>
        </div>

        {/* CHAT VIEW */}
        {item.type === "chat" ? (
          <div className="space-y-4">
            {item.conversation.map((msg: any, i: number) => (
              <div key={i} className="space-y-2">
                
                {msg.user && (
                  <div className="flex justify-end">
                    <div className="bg-[#4A90E2] text-white px-4 py-2 rounded-xl max-w-xs">
                      {msg.user}
                    </div>
                  </div>
                )}

                {msg.ai && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-2 rounded-xl max-w-xs">
                      {msg.ai}
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        ) : (
          /* MEDICINE VIEW */
          <div className="space-y-4">

            <h2 className="text-xl font-semibold">{item.medicine}</h2>

            <p>
              Status:{" "}
              <span
                className={
                  item.status === "authentic"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {item.status}
              </span>
            </p>

            <p>Confidence: {item.confidence}%</p>
            <p>Expiry: {item.expiry}</p>
            <p>Price: {item.price}</p>

            {item.image && (
              <img
                src={item.image}
                className="w-full rounded-xl"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}