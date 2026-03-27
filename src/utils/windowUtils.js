export const openInNewWindow = (url) => {
    //const url = '/some/path'; // Use relative path for internal app route
    // Prepend the base URL for absolute paths if needed
    // const absoluteUrl = `${window.location.origin}${url}`; 
    
    // Open the URL in a new tab/window
    window.open(url, '_blank', 'noopener,noreferrer'); 
  };