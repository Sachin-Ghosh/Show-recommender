import Link from 'next/link';

export default function ShowCard({ show }) {
  return (
    <Link href={`/show/${show.id}`} passHref>
      <div className="rounded overflow-hidden shadow-lg cursor-pointer">
        <div className="flex items-center justify-center">
            <img className="object-contain" src={show.image.medium} alt={show.name} />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{show.name}</div>
        </div>
      </div>
    </Link>
  );
}
