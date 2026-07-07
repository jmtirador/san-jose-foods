// Print registration / crop marks — the signature "this is a real trade
// document" device. Drop inside a `relative` container.
export function CropMarks() {
  return (
    <>
      <span className="crop-mark crop-tl" aria-hidden />
      <span className="crop-mark crop-tr" aria-hidden />
      <span className="crop-mark crop-bl" aria-hidden />
      <span className="crop-mark crop-br" aria-hidden />
    </>
  )
}
