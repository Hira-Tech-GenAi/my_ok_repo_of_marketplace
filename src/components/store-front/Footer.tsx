import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="mt-16 mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center">
          <div className="flex space-x-6">
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 text-lg"
            >
              <FaFacebook />
            </Link>
            <Link
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-400 text-lg"
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-pink-600 text-lg"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-700 text-lg"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>

        <p className="mt-8 text-xs leading-5 text-gray-700 text-center">
          &copy; 2025 Hira Khalid. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
