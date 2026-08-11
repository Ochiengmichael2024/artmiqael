import React, { useEffect, useRef, useState, useMemo } from "react";
import { cx } from "@/utils/cx";
import { useNavigate } from "react-router-dom";

const dummyData = [
  "React",
  "Vue",
  "Svelte",
  "Next.js",
  "Napier88",
  "Gatsby",
  "NewtonScript",
  "Angular",
  "Scala",
  "Groovy",
  "Haskell",
  "Lua",
  "R",
];

function GooeyFilter() {
  return (
    <svg aria-hidden="true" className="hidden">
      <defs>
        <filter id="goo-effect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -15"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

const LoadingIcon: React.FC = () => (
  <svg className="loading-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-label="Loading" role="status">
    <rect width="256" height="256" fill="none" />
    <line x1="128" y1="32" x2="128" y2="64" fill="none" stroke="#dddddd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <line x1="195.88" y1="60.12" x2="173.25" y2="82.75" fill="none" stroke="#dddddd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <line x1="224" y1="128" x2="192" y2="128" fill="none" stroke="#dddddd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
  </svg>
);

const InfoIcon: React.FC<{ index: number }> = () => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.2832 19.9316" className="info-icon w-4 h-4 mr-2" aria-hidden="true" fill="none">
    <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
  </svg>
);

// simple non-framer fallback variants removed

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

export const isUnsupportedBrowser = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent.toLowerCase();
  const isSafari = ua.includes("safari") && !ua.includes("chrome") && !ua.includes("chromium") && !ua.includes("android") && !ua.includes("firefox");
  const isChromeOniOS = ua.includes("crios");
  return isSafari || isChromeOniOS;
};

const getResultItemVariants = (index: number, isUnsupported: boolean) => ({
  initial: { y: 0, scale: 0.3, filter: isUnsupported ? "none" : "blur(10px)" },
  animate: { y: (index + 1) * 50, scale: 1, filter: "blur(0px)" },
  exit: { y: isUnsupported ? 0 : -4, scale: 0.8, color: "#000000" },
});

const getResultItemTransition = (index: number) => ({
  duration: 0.75,
  delay: index * 0.12,
  type: "spring",
  bounce: 0.35,
  exit: { duration: index * 0.1 },
  filter: { ease: "easeInOut" },
});

export const GooeySearchBar: React.FC<{ onSearch?: (term: string) => void; className?: string }> = ({ onSearch, className }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState({ step: 1, searchData: [] as string[], searchText: "", isLoading: false });
  const debouncedSearchText = useDebounce(state.searchText, 500);
  const isUnsupported = useMemo(() => isUnsupportedBrowser(), []);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.step === 2) inputRef.current?.focus();
    else setState((prev) => ({ ...prev, searchText: "", searchData: [], isLoading: false }));
  }, [state.step]);

  useEffect(() => {
    let isCancelled = false;
    if (debouncedSearchText) {
      setState((prev) => ({ ...prev, isLoading: true }));
      const fetchData = async () => {
        await new Promise((r) => setTimeout(r, 400));
        const filtered = dummyData.filter((it) => it.toLowerCase().includes(debouncedSearchText.trim().toLowerCase()));
        if (!isCancelled) setState((prev) => ({ ...prev, searchData: filtered, isLoading: false }));
      };
      fetchData();
    } else {
      setState((prev) => ({ ...prev, searchData: [], isLoading: false }));
    }
    return () => {
      isCancelled = true;
    };
  }, [debouncedSearchText]);

  function handleButtonClick() {
    setState((prev) => ({ ...prev, step: 2 }));
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState((prev) => ({ ...prev, searchText: e.target.value }));
  }

  function doSearch(term: string) {
    onSearch?.(term);
    navigate(`/shop?search=${encodeURIComponent(term)}`);
    setState({ step: 1, searchData: [], searchText: "", isLoading: false });
  }

  return (
    <div className={cx("wrapper", className)}>
      <GooeyFilter />
      <div className="button-content w-full">
        <div className="button-content-inner w-full flex items-center">
          <div className="search-results w-full" role="listbox" aria-label="Search results">
            {state.searchData.map((item, index) => (
              <div key={item} className="search-result p-2 cursor-pointer" role="option" onClick={() => doSearch(item)}>
                <div className="search-result-title flex items-center">
                  <InfoIcon index={index} />
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>

          <div onClick={handleButtonClick} className="search-btn ml-3 bg-[color:var(--accent)] text-white rounded-full px-4 py-2 flex items-center gap-3">
            {state.step === 1 ? (
              <span className="search-text">Search</span>
            ) : (
              <input ref={inputRef} type="text" className="search-input px-2 py-1 rounded text-black" placeholder="Type R..." aria-label="Search input" onKeyDown={(e) => e.key === "Enter" && doSearch(state.searchText)} onChange={handleSearchChange} value={state.searchText} />
            )}
          </div>

          {state.step === 2 && (
            <div className="separate-element ml-2">
              {!state.isLoading ? (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="white"/></svg>
              ) : (
                <LoadingIcon />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GooeySearchBar;
