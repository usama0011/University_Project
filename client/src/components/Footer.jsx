import React from "react";
import "../styles/Footer.css"
const Footer = () => {
  return (
    <footer>
      <div class="footer-container">
        <div class="footer-left">
          <p>&copy; 2023 My Website</p>
        </div>
        <div class="footer-right">
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms and Conditions</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
