
import React, { useEffect, useState } from "react";

const YourComponent: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    // Fetch the HTML file and set its content in state
    fetch("/./../README.md")
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default YourComponent;
