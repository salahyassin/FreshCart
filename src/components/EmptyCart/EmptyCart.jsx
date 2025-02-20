import { Link } from "react-router-dom";
import { Button } from '@heroui/react'

export default function EmptyCart() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        <div className="flex flex-col items-center space-y-6">
          {/* Cart Symbol */}
          <div className="text-gray-300 text-7xl">
            🛒
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/">
            <Button
              color="primary"
              size="lg"
              className="gap-2"
            >
              Continue Shopping
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}