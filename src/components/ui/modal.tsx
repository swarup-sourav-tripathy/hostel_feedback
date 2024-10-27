import React from "react";


interface AgreementModalProps {
  isOpen: boolean;
  ToggleAgreement: () => void;
}

export const AgreementModal = ({
  isOpen,
  ToggleAgreement,
}: AgreementModalProps): JSX.Element => {
  return (
    <>
      {isOpen && (
        <div
          id="agreement-modal"
          tabIndex={-1}
          aria-hidden={!isOpen}
          className="fixed inset-0 z-50 justify-center items-center w-full h-full max-h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 flex"
          onClick={ToggleAgreement}
        >
          <div
            className="relative w-full max-w-screen-md box-content max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative shadow-lg overflow-hidden bg-white">
              <button
                type="button"
                onClick={ToggleAgreement}
                className="absolute top-4 right-4 bg-white text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-2 focus:outline-none z-50"
                aria-label="Close modal"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="src/components/Screenshot 2024-10-25 024926.png"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
              <div className="h-[80vh] p-4">
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
