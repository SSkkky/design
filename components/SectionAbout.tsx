export default function SectionAbout() {
  return (
    <section
      className="
        grid w-screen
        grid-cols-2       /* 기본: 2열 (md 포함) */
        grid-rows-auto
        xl:grid-cols-4    /* xl 이상에서 4열로 */
      "
    >
      <div className="h-[50vw] xl:h-[50vh] col-span-2 xl:col-span-2 bg-red-300">1-2</div>
      <div className="h-[50vw] xl:h-[50vh] bg-green-300">3</div>
      <div className="h-[50vw] xl:h-[50vh] bg-blue-300">4</div>
      <div className="h-[50vw] xl:h-[50vh] bg-yellow-300">5</div>
      <div className="h-[50vw] xl:h-[50vh] bg-pink-300">6</div>
      <div className="h-[50vw] xl:h-[50vh] col-span-2 xl:col-span-2 bg-cyan-300">7-8</div>
    </section>
  );
}
