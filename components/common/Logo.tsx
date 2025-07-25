"use client";

export default function Logo({clickLogoHandler}:any) {
  return (
    <a className="overflow-hidden">
      <h1 className="text-black whitespace-nowrap">
        <span className="cursor-pointer" onClick={clickLogoHandler}>
          Sky Archive
        </span>
      </h1>
    </a>
  );
}
