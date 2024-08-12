import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-slate-100 shadow-lg hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>

      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://cdn.corporatefinanceinstitute.com/assets/real-estate.jpeg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />

        <div className='p-3 flex flex-col gap-2 w-full'>

          <p className='truncate text-lg font-semibold text-black'>
            {listing.name}
          </p>

          <div className='flex items-center gap-1'>

            <MdLocationOn className='h-4 w-4 text-black' />

            <p className='text-sm text-black truncate w-full'>
              {listing.address}
            </p>

          </div>

          <p className='text-sm text-black line-clamp-2'>
            {listing.description}
          </p>

          <p className='text-black mt-2 font-semibold '>
            <span className='mr-1'>INR</span>
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>

          <div className='text-black flex gap-4'>

            <div className='font-bold text-xs'>

              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>

            <div className='font-bold text-xs'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>

          </div>

        </div>

      </Link>

    </div>
  );
}