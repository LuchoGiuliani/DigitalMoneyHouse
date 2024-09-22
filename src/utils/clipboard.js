export const handleCopy = (text, toast) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard:", text);
        toast.success("Copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
        toast.error("Failed to copy!");
      });
  };