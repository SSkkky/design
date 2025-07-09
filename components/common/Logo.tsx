"use client";

export default function Logo({clickLogoHandler}:any) {
  return (
    <a className="flex-1">
      <h1 className="p-3 md:p-4 text-black ">
        <span className="cursor-pointer" onClick={clickLogoHandler}>
          Sky Archive
        </span>
      </h1>
    </a>
  );
}
