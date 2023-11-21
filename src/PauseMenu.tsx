import { useState } from 'react';

export default function PauseMenu() {
  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // Assuming the average color we calculated is used here for the gradient
  const backgroundColor = 'rgb(83, 79, 95)'; // Replace with dynamic values if needed

  return (
    <>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <h3
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Pause Menu
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Your game is paused. What would you like to do?
              </p>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Resume Game
              </button>
              {/* ...other buttons */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
