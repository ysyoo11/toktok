export default function validateFileSize(file: File, maximumSize: number) {
  return file.size < maximumSize * 1000 * 1000;
}
