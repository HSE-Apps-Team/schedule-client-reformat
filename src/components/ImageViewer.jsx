import React, { useEffect, useState } from 'react';

/**
 * ImageViewer component
 * Props:
 *   - base64: string (required) - the base64 image data (no data:... prefix)
 *   - mimeType: string (optional) - e.g. 'image/png', defaults to 'image/png'
 *   - alt: string (optional) - alt text for the image
 *   - ...rest: any other props for <img>
 */
const ImageViewer = ({ base64, mimeType = 'image/png', alt = '', ...rest }) => {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    if (!base64) return;
    // Convert base64 to Blob
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const url = URL.createObjectURL(blob);
    setImgUrl(url);
    // Cleanup
    return () => URL.revokeObjectURL(url);
  }, [base64, mimeType]);

  if (!base64) return null;
  return <img src={imgUrl} alt={alt} {...rest} />;
};

export default ImageViewer;
