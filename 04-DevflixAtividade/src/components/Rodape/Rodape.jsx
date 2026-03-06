import React from "react";
import "./Rodape.module.css";

const Rodape = ({ children, link, language }) => {
  return (
    <footer>
      <p>
        {language === "pt"
          ? "Feito com ❤️ por "
          : "Made with ❤️ by "}
        
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      </p>
    </footer>
  );
};

export default Rodape;