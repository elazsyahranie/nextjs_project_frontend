import Image from "next/image";

export default function Page404() {
  return (
    <div>
      <div>
        <Image src="/404.gif" width={550} height={500} />
      </div>
      <button className="btn btn-light">Back to Home</button>
    </div>
  );
}
