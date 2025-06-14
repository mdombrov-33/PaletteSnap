function ImageUploader() {
  return (
    <div className="max-w-md w-full p-8 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl shadow-xl flex flex-col items-center justify-center">
      <label
        htmlFor="image-upload"
        className="cursor-pointer px-6 py-3 text-white text-lg font-semibold hover:bg-white/20 transition rounded"
      >
        Upload Image
        <input type="file" id="image-upload" accept="image/*" className="hidden" />
      </label>
    </div>
  )
}

export default ImageUploader
