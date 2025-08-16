import { useEffect, useState } from "react";
import apiInstance from "../assets/utils/axiosInstance";
import { API_MODELS, USER_MODALS } from "../assets/utils/defaultValues";

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const LocationSearch = ({
  activeField,
  fieldValue,
  setFieldValue,
  activeModal,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedInput = useDebounce(fieldValue, 400);

  useEffect(() => {
    // Only fetch if modal is open and input is valid
    if (
      activeModal === USER_MODALS.LOCATION &&
      debouncedInput &&
      debouncedInput.length > 2
    ) {
      setLoading(true);
      apiInstance
        .get(
          `/${API_MODELS.MAPS}/get-suggestions?input=${encodeURIComponent(
            debouncedInput
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "UBER_USER_TOKEN"
              )}`,
            },
          }
        )
        .then((res) => setSuggestions(res.data.data))
        .catch(() => setSuggestions([]))
        .finally(() => setLoading(false));
    } else {
      setSuggestions([]);
      setLoading(false);
    }
  }, [debouncedInput, activeModal]);

  const handleSuggestionClick = (suggestion) => {
    setFieldValue(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="py-[24px] px-[12px]">
      {activeModal === USER_MODALS.LOCATION && (
        <>
          <h4 className="mb-2 font-semibold">
            Suggestions for {activeField === "from" ? "Pick-up" : "Drop-off"}
          </h4>
          {loading ? (
            <div className="text-gray-400">Loading suggestions...</div>
          ) : suggestions.length > 0 ? (
            <div>
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center border-2 rounded-xl p-3 border-gray-100 active:border-black my-2 justify-start gap-4 cursor-pointer"
                  onClick={() => handleSuggestionClick(item.description)}
                >
                  <h2 className="bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full flex-none">
                    <i className="ri-map-pin-fill" />
                  </h2>
                  <h3 className="font-medium flex-1">{item.description}</h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400">No suggestions found.</div>
          )}
        </>
      )}
    </div>
  );
};

export default LocationSearch;
