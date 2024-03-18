import Link from "next/link";

const NotFoundPage = () => {
  return (
    <section className="flex items-center h-full l:h-full p-16 mt-28 s:mt-48 l:mt-28">
      <div className="container flex flex-col items-center ">
        <div className="flex flex-col gap-6 max-w-[520px] text-center ">
          <h2 className="font-semibold text-xl xs:text-3xl xm:text-5xl">404</h2>
          <p className="text-xs xs:text-xl xm:text-2xl ">
            This page could not be found.
          </p>

          <div className="mt-1 s:mt-4">
            <Link
              href={"/"}
              className=" px-4 py-2 xs:px-6 xs:py-3 text-sm xs:text-xl rounded border-primary border-[1px] "
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
