const readImage = (file: File, cb: (s: string) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const image = reader.result as string;
    cb(image);
  };
};
export default readImage;
